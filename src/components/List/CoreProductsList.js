import React, { useState, useEffect } from "react";
import moment from "moment";
import qs from "query-string";
import Loader from "../Loader/Loader";
import { Input, DatePicker, Switch, Radio, Checkbox, Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import { CoreListStyles } from "./style";
import Multiselect from "../ModalFrom/Multiselect";
import CoreProductsTable from "components/Tables/CoreProductsTable";
import { useGetAllCoreProducts, useUpdateCoreProduct } from "../../Requests/CoreProductRequest";
import { useGetAllBrands } from "../../Requests/BrandRequest";
import { useGetAllCategories } from "../../Requests/CategoryRequest";
import { useGetAllManufacturers } from "../../Requests/ManufacturerRequest";
import { useHistory } from "react-router-dom";

const CoreProductsList = (props) => {
  const { RangePicker } = DatePicker;
  const history = useHistory();
  // const isMerge = false;
  const [queryParams, setQueryParams] = useState(qs.parse(history.location.search));
  const [dateInterval, setDateInterval] = useState([]);
  const { isLoading: brandsIsLoading, data: brandsData } = useGetAllBrands();
  const { isLoading: categoriesIsLoading, data: categoriesData } = useGetAllCategories();
  const { isLoading: manufacturerIsLoading, data: manufacturerData } = useGetAllManufacturers();
  const [coreImage, setCoreImage] = useState("");
  const {
    isFetching: coreProductIsFetching,
    isLoading: coreProductsIsLoading,
    data: coreProductsData,
    status: coreProductsStatus,
  } = useGetAllCoreProducts(queryParams);

  const { mutate: updateCoreProduct } = useUpdateCoreProduct();
  const [selectData, setSelectData] = useState([]);
  const inputs = [
    { name: "title", type: "text", lable: "Title", placeholder: "Title" },
    { name: "ean", type: "text", lable: "EAN", placeholder: "EAN" },
  ];
  useEffect(() => {
    if (!brandsIsLoading && !categoriesIsLoading && !manufacturerIsLoading) {
      setSelectData([
        {
          name: "brand",
          value: "id",
          option: "name",
          store: brandsData?.brands,
          lable: "Brand",
          placeholder: "Brand",
          initialValue: queryParams.brand,
        },
        {
          name: "category",
          value: "id",
          option: "name",
          store: categoriesData?.categories,
          lable: "Category",
          placeholder: "Category",
          initialValue: queryParams.category,
        },
        {
          name: "manufacturer",
          value: "id",
          option: "name",
          store: manufacturerData?.manufacturers,
          lable: "Manufacturer",
          placeholder: "Manufacturer",
          initialValue: queryParams.manufacturer,
        },
      ]);
    }
  }, [brandsIsLoading, categoriesIsLoading, manufacturerIsLoading, brandsData, categoriesData, manufacturerData, queryParams]);

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/core-products?${queryString}`);
  }, [queryParams, history]);
  useEffect(() => {
    if (queryParams.createdStart) {
      setDateInterval([moment(queryParams.createdStart), moment(queryParams.createdEnd)]);
    } else if (!queryParams.createdStart) {
      setDateInterval([]);
    }
  }, [queryParams]);

  const onChangePage = (page, pageSize) => {
    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        page,
      };
    });
  };

  const handlePage = (e) => {
    const { value } = e.target;

    let pageNumer = Number(value);

    if (pageNumer <= 0) pageNumer = 1;

    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        page: pageNumer,
      };
    });
  };

  const onChangePerPage = (page, perPage) => {
    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        perPage,
      };
    });
  };

  const setSelectList = (name, values) => {
    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        [name]: values,
        page: 1,
      };
    });
  };

  const handleSearch = (e) => {
    const { name, value } = e.target;

    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        [name]: value,
        page: 1,
      };
    });
  };

  const getSelectDate = (date, dateString) => {
    const createdStart = dateString[0];
    const createdEnd = dateString[1];

    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        createdStart,
        createdEnd,
        page: 1,
      };
    });
  };

  const onChangeSwitch = (checked, e) => {
    const { name } = e.target;

    if (name && name !== undefined) {
      setQueryParams((queryParams) => {
        return {
          ...queryParams,
          [name]: checked,
          page: 1,
        };
      });
    }
  };

  const handleReverseChange = (e) => {
    let direction = e.target.checked ? "DESC" : "ASC";

    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        direction,
      };
    });
  };

  const handleToggleOrder = (e) => {
    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        order: e.target.value,
      };
    });
  };

  const onSendForm = (values) => {
    const id = values.id;
    delete values["id"];
    delete values["ean"];
    if (coreImage.length) {
      Object.assign(values, { image: coreImage });
    }
    updateCoreProduct({ id, values });
  };

  return (
    <CoreListStyles>
      <div className="item-title">Core Products</div>

      <div className="sorted-box">
        <span className="title">Search:</span>
      </div>
      <Row>
        {inputs.map((item, index) => {
          return (
            <Col key={index} flex="auto" style={{ paddingRight: "8px" }}>
              <div className="wrapper-form-item">
                <div className="lable-item">{item.lable}</div>
                <Input
                  value={queryParams[item.name]}
                  name={item.name}
                  type={item.type}
                  placeholder={item.placeholder}
                  onChange={handleSearch}
                />
              </div>
            </Col>
          );
        })}
      </Row>
      <Row>
        {selectData.length > 0 ? (
          selectData.map((item, index) => (
            <Col key={index} flex="auto" style={{ paddingRight: "8px" }}>
              <Multiselect
                key={index}
                store={item.store}
                name={item.name}
                lable={item.lable}
                value={item.value}
                option={item.option}
                placeholder={item.placeholder}
                initialValue={item.initialValue}
                setSelectList={setSelectList}
              />
            </Col>
          ))
        ) : (
          <Loader />
        )}
      </Row>
      <Row>
        <Col span={12}>
          <div className="filter-wrapper">
            <div className="filter-box">
              <p>Filter:</p>
              <RangePicker value={dateInterval} onChange={(date, dateString) => getSelectDate(date, dateString)} />
            </div>

            <div className="filter-box">
              <p>No Category</p>
              <Switch checked={JSON.parse(queryParams.noCategory)} name="noCategory" onChange={onChangeSwitch} />
            </div>

            <div className="filter-box">
              <p>No Brand</p>
              <Switch checked={JSON.parse(queryParams.noBrand)} name="noBrand" onChange={onChangeSwitch} />
            </div>

            <div className="filter-box">
              <p>Invalid EAN</p>
              <Switch checked={JSON.parse(queryParams.issues)} name="issues" onChange={onChangeSwitch} />
            </div>

            <div className="filter-box">
              <p>Not reviewed</p>
              <Switch checked={JSON.parse(queryParams.notReviewed)} name="notReviewed" onChange={onChangeSwitch} />
            </div>

            <div className="filter-box">
              <p>Goto Page:</p>
              <Input value={Number(queryParams.page)} name="page" type="number" min="1" onChange={handlePage} />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="sorted-box">
            <span className="title">Sort:</span>
            <Radio.Group value={queryParams.order} onChange={handleToggleOrder}>
              <Radio.Button value="title">Title</Radio.Button>
              <Radio.Button value="category">Category</Radio.Button>
              <Radio.Button value="productBrand">Brand</Radio.Button>
              <Radio.Button value="createdAt">Date</Radio.Button>
            </Radio.Group>
            <Checkbox checked={queryParams.direction === "DESC"} onChange={handleReverseChange}>
              Reverse Order
            </Checkbox>
          </div>
        </Col>
      </Row>

      {coreProductsStatus === "success" && !coreProductsIsLoading && !coreProductIsFetching ? (
        <>
          <div className="table-wrapper-box">
            <CoreProductsTable
              data={coreProductsData?.cores?.rows}
              count={coreProductsData?.cores?.count}
              page={Number(queryParams.page)}
              perPage={Number(queryParams.perPage)}
              setPage={onChangePage}
              setPerPage={onChangePerPage}
              onSendForm={onSendForm}
              handleCoreProductEdit={onSendForm}
              setCoreImage={setCoreImage}
              // isMerge = {isMerge}
              // handleMergeProduct={handleMergeProduct}
            />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </CoreListStyles>
  );
};

export default withRouter(CoreProductsList);
