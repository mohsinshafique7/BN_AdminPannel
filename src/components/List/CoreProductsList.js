import React, { useState, useEffect } from "react";

import moment from "moment";
import qs from "query-string";
import { getCoreProducts, editCoreProduct, mergeCoreProduct } from "../../store/coreProducts/action";
import Loader from "../Loader/Loader";
import { Input, DatePicker, Switch, Radio, Checkbox } from "antd";
import { withRouter } from "react-router-dom";
import { CoreListStyles } from "./style";
import { STATE_STATUSES } from "../../utils/app";
import Multiselect from "../ModalFrom/Multiselect";
import { useDispatch, useSelector } from "react-redux";
import { getProductGroups } from "../../store/productGroups/action";
import { getCategories } from "../../store/categories/action";
import { getBrands } from "../../store/manufacturersBrands/action";
import { getManufacturers } from "../../store/manufacturersBrands/action";
import CoreProductsTable from "components/Tables/CoreProductsTable";

const CoreProductsList = (props) => {
  const { RangePicker } = DatePicker;

  const {
    match: { params },
    history,
    pathParam,
  } = props;
  const isMerge = false;
  const { rows, count, status } = useSelector((state) => {
    return {
      rows: state.coreProducts.coreProducts.rows,
      count: state.coreProducts.coreProducts.count,
      status: state.coreProducts.status,
    };
  });
  const dispatch = useDispatch();
  const inputs = [
    { name: "title", type: "text", lable: "Title", placeholder: "Title" },
    { name: "ean", type: "text", lable: "EAN", placeholder: "EAN" },
  ];
  const [queryParams, setQueryParams] = useState(qs.parse(params.page));
  const [dateInterval, setDateInterval] = useState([]);

  const [selectCoreProduct, setSelectCoreProduct] = useState({});
  const [coreImage, setCoreImage] = useState("");

  const [selectData] = useState([
    {
      name: "brand",
      value: "id",
      option: "name",
      action: getBrands,
      store: "brands",
      lable: "Brand",
      placeholder: "Brand",
      initialValue: queryParams.brand,
    },
    {
      name: "category",
      value: "id",
      option: "name",
      action: getCategories,
      store: "categories",
      lable: "Category",
      placeholder: "Category",
      initialValue: queryParams.category,
    },
    {
      name: "productGroup",
      value: "id",
      option: "name",
      action: getProductGroups,
      store: "productGroups",
      lable: "Product Group",
      placeholder: "Product Group",
      initialValue: queryParams.productGroup,
    },
    {
      name: "manufacturer",
      value: "id",
      option: "name",
      action: getManufacturers,
      store: "manufacturers",
      lable: "Manufacturer",
      placeholder: "Manufacturer",
      initialValue: queryParams.manufacturer,
    },
  ]);

  const inputData = [
    { label: "Title", name: "title", type: "text", required: false },
    { label: "Size", name: "size", type: "number", required: false },
  ];

  const areaData = [
    { label: "Description", name: "description", required: false },
    { label: "Ingredients", name: "ingredients", required: false },
    { label: "Features", name: "features", required: false },
  ];

  const selectDataEdit = [
    {
      name: "brandId",
      value: "id",
      option: "name",
      action: getBrands,
      store: "brands",
      lable: "Change brand",
      required: false,
      mode: false,
    },

    {
      name: "categoryId",
      value: "id",
      option: "name",
      action: getCategories,
      store: "categories",
      lable: "Change category",
      required: false,
      mode: false,
    },

    {
      name: "productGroupId",
      value: "id",
      option: "name",
      action: getProductGroups,
      store: "productGroups",
      lable: "Change product group",
      required: false,
      mode: false,
    },
  ];

  const switchData = [
    {
      label: "Bundled",
      name: "bundled",
      default: Object.entries(selectCoreProduct).length !== 0 && selectCoreProduct.bundled,
      required: false,
    },
    {
      label: "SecondaryImages",
      name: "secondaryImages",
      default: Object.entries(selectCoreProduct).length !== 0 && selectCoreProduct.secondaryImages,
      required: false,
    },
    {
      label: "Reviewed",
      name: "reviewed",
      default: Object.entries(selectCoreProduct).length !== 0 && selectCoreProduct.reviewed,
      required: false,
    },
    {
      label: "Product Options",
      name: "productOptions",
      default: Object.entries(selectCoreProduct).length !== 0 && selectCoreProduct.productOptions,
      required: false,
    },
  ];

  const initialValue = {
    title: Object.entries(selectCoreProduct).length !== 0 && selectCoreProduct.title,
    size: Object.entries(selectCoreProduct).length !== 0 && selectCoreProduct.size,
    image: Object.entries(selectCoreProduct).length !== 0 && selectCoreProduct.image,
    secondaryImages: Object.entries(selectCoreProduct).length !== 0 && selectCoreProduct.secondaryImages,
    description: Object.entries(selectCoreProduct).length !== 0 && selectCoreProduct.description,
    features: Object.entries(selectCoreProduct).length !== 0 && selectCoreProduct.features,
    ingredients: Object.entries(selectCoreProduct).length !== 0 && selectCoreProduct.ingredients,
    bundled: Object.entries(selectCoreProduct).length !== 0 && selectCoreProduct.bundled,
    brandId: Object.entries(selectCoreProduct).length !== 0 && selectCoreProduct.brandId,
    categoryId: Object.entries(selectCoreProduct).length !== 0 && selectCoreProduct.categoryId,
    productGroupId: Object.entries(selectCoreProduct).length !== 0 && selectCoreProduct.productGroupId,
    reviewed: Object.entries(selectCoreProduct).length !== 0 && selectCoreProduct.reviewed,
  };

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/${pathParam}/${queryString}`);
  }, [queryParams, history]);

  useEffect(() => {
    if (queryParams.createdStart) {
      setDateInterval([moment(queryParams.createdStart), moment(queryParams.createdEnd)]);
    } else if (!queryParams.createdStart) {
      setDateInterval([]);
    }
  }, [queryParams]);

  useEffect(() => {
    // mergeCoreProduct,
    dispatch(getManufacturers());
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getProductGroups());
    dispatch(getCoreProducts(queryParams));
  }, [dispatch, queryParams]);
  //queryParams was dependency

  useEffect(() => {
    if (Object.entries(selectCoreProduct).length !== 0) {
      const selectProduct = rows.find((product) => product.id === selectCoreProduct.id);

      setSelectCoreProduct(selectProduct);
    }
  }, [rows, selectCoreProduct]);

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

  const handleEditProduct = (id) => {
    const selectProduct = rows.find((product) => product.id === id);

    setSelectCoreProduct(selectProduct);
  };

  const handleMergeProduct = (id) => {
    dispatch(
      mergeCoreProduct({
        baseId: Number(queryParams.productId),
        secondaryIds: id.toString(),
      })
    ).then(() => getCoreProducts(queryParams));
  };

  const onSendForm = (values) => {
    const data = values;
    if (coreImage.length) {
      Object.assign(data, { image: coreImage });
    }
    dispatch(editCoreProduct("EDIT_CORE_PRODUCT_LIST", selectCoreProduct.id, data)).then(() => setCoreImage(""));
  };

  return (
    <CoreListStyles>
      <div className="item-title">Core Products</div>

      <div className="sorted-box">
        <span className="title">Search:</span>
      </div>

      {inputs.map((item, index) => (
        <div key={index} className="wrapper-form-item">
          <div className="lable-item">{item.lable}</div>
          <Input value={queryParams[item.name]} name={item.name} type={item.type} placeholder={item.placeholder} onChange={handleSearch} />
        </div>
      ))}

      {selectData.map((item, index) => (
        <Multiselect
          key={index}
          action={item.action}
          store={item.store}
          name={item.name}
          lable={item.lable}
          value={item.value}
          option={item.option}
          placeholder={item.placeholder}
          initialValue={item.initialValue}
          setSelectList={setSelectList}
        />
      ))}

      <div className="sorted-box">
        <br />
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
      {rows.length > 0 && status === STATE_STATUSES.READY ? (
        <>
          <div className="table-wrapper-box">
            <CoreProductsTable
              data={rows}
              count={count}
              page={Number(queryParams.page)}
              perPage={Number(queryParams.perPage)}
              setPage={onChangePage}
              setPerPage={onChangePerPage}
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
