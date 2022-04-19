import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Input, Pagination, Popover, Checkbox, Button, Empty, DatePicker, Switch } from "antd";
import moment from "moment";
import { HexColorPicker } from "react-colorful";

import { createProductGroup, addProductGroupCores } from "../../store/productGroups/action";
import { getCoreProducts } from "../../store/coreProducts/action";
// import { getUsers } from "../../store/users/action";
// import { getCompanies } from "../../store/companies/action";
import { getCategories } from "../../store/categories/action";
import { getBrands } from "../../store/manufacturersBrands/action";
import { getManufacturers } from "../../store/manufacturersBrands/action";
import { getProductGroups, getProductGroup } from "../../store/productGroups/action";

import SelectBox from "../ModalFrom/Select";
import Multiselect from "../ModalFrom/Multiselect";
import Loader from "../Loader/Loader";

import { STATE_STATUSES } from "../../utils/app";

import { ClearOutlined } from "@ant-design/icons";

const CreateProductGroup = (props) => {
  const { RangePicker } = DatePicker;

  const {
    createProductGroup,
    addProductGroupCores,
    getCoreProducts,
    getBrands,
    getCategories,
    getManufacturers,
    getProductGroups,
    getProductGroup,
    selectCoreProducts,
    rows,
    count,
    status,
    match: { params },
  } = props;

  const [isCreateProduct, setIsCreateProduct] = useState(true);
  const [queryParams, setQueryParams] = useState({
    name: "",
    color: "#ffffff",
    userId: null,
    companyId: null,
    coreProducts: [],
  });

  console.log("queryParams", queryParams);
  const [coreParams, setCoreParams] = useState({
    title: "",
    ean: "",
    page: 1,
    perPage: 10,
    noCategory: false,
    noBrand: false,
    issues: false,
    notReviewed: false,
  });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [clearSelect, setClearSelect] = useState({});

  const [dateInterval, setDateInterval] = useState([]);

  const [visibleColors, setVisibleColors] = useState(false);

  const [heightDiv, setHeightDiv] = useState(0);
  const ref = useRef(null);

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

  const selects = [
    { param: "companyId", value: "id", option: "name", lable: "Company", initialValue: queryParams.companyId },
    { param: "userId", value: "id", option: "email", lable: "User", initialValue: queryParams.userId },
  ];

  useEffect(() => {
    if (Number(params.id) !== 0) {
      setIsCreateProduct(false);
      getProductGroup(params.id);
    }
  }, [params]);

  useEffect(() => {
    if (selectCoreProducts.length && Number(params.id) !== 0) {
      const selectProducts = selectCoreProducts.map((product) => ({ title: product.title, id: product.id }));
      setSelectedProducts(selectProducts);

      const selectProductsQuery = selectCoreProducts.map((product) => product.id);
      setQueryParams((queryParams) => {
        return {
          ...queryParams,
          coreProducts: selectProductsQuery,
        };
      });
    }
  }, [selectCoreProducts, params]);

  useEffect(() => {
    setHeightDiv(ref.current.clientHeight);
  });

  useEffect(() => {
    getCoreProducts(coreParams);
  }, [coreParams]);

  useEffect(() => {
    if (queryParams.createdStart) {
      setDateInterval([moment(queryParams.createdStart), moment(queryParams.createdEnd)]);
    } else if (!queryParams.createdStart) {
      setDateInterval([]);
    }
  }, [queryParams]);

  const handleClearSelect = (name) => {
    setClearSelect([name]);

    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        [name]: null,
      };
    });
  };

  const handleSetSelect = (value) => {
    setQueryParams((queryParams) => Object.assign({}, queryParams, value));
  };

  const handleSetName = (e) => {
    const { value, name } = e.target;
    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        [name]: value,
      };
    });
  };

  const handleSeInput = (e) => {
    const { value, name } = e.target;
    setCoreParams((coreParams) => {
      return {
        ...coreParams,
        [name]: value,
        page: 1,
      };
    });
  };

  const onChangePerPage = (page, perPage) => {
    setCoreParams((coreParams) => {
      return {
        ...coreParams,
        perPage,
      };
    });
  };

  const onChangePage = (page, pageSize) => {
    setCoreParams((coreParams) => {
      return {
        ...coreParams,
        page,
      };
    });
  };

  const setSelectList = (name, values) => {
    setCoreParams((coreParams) => {
      return {
        ...coreParams,
        [name]: values,
        page: 1,
      };
    });
  };

  const onChangeSwitch = (checked, e) => {
    const { name } = e.target;

    if (name && name !== undefined) {
      setCoreParams((coreParams) => {
        return {
          ...coreParams,
          [name]: checked,
          page: 1,
        };
      });
    }
  };

  const handlePage = (e) => {
    const { value } = e.target;

    let pageNumer = Number(value);

    if (pageNumer <= 0) pageNumer = 1;

    setCoreParams((coreParams) => {
      return {
        ...coreParams,
        page: pageNumer,
      };
    });
  };

  const getSelectDate = (date, dateString) => {
    const createdStart = dateString[0];
    const createdEnd = dateString[1];

    setCoreParams((coreParams) => {
      return {
        ...coreParams,
        createdStart,
        createdEnd,
        page: 1,
      };
    });
  };

  const handleSelectProduct = (product) => {
    if (queryParams.coreProducts.includes(product.id)) {
      const products = queryParams.coreProducts.filter((id) => id !== product.id);
      setQueryParams((queryParams) => {
        return {
          ...queryParams,
          coreProducts: products,
        };
      });

      const selectProducts = selectedProducts.filter((id) => id.id !== product.id);
      setSelectedProducts(selectProducts);
    } else {
      setQueryParams((queryParams) => {
        return {
          ...queryParams,
          coreProducts: [...queryParams.coreProducts, product.id],
        };
      });
      setSelectedProducts((selectedProducts) => [...selectedProducts, { title: product.title, id: product.id }]);
    }
  };

  const handleColorPicker = (color) => {
    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        color,
      };
    });
  };

  const handleColorInput = (e) => {
    const { value } = e.target;
    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        color: value,
      };
    });
  };

  // const onVisibleChange = () => {
  //   setVisibleColors
  // };

  const handleSubmit = () => {
    if (isCreateProduct) {
      createProductGroup(queryParams).then(() => props.history.push("/product-groups/page=0&perPage=10"));
    } else {
      addProductGroupCores({ coreProducts: queryParams.coreProducts }, params.id).then(() =>
        props.history.push(`/product-group/${params.id}`)
      );
    }
  };

  const handleBack = () => {
    if (isCreateProduct) {
      props.history.push("/product-groups/page=0&perPage=10");
    } else {
      props.history.push(`/product-group/${params.id}`);
    }
  };

  return (
    <div className="product-group-wrapper">
      <Button type="primary" onClick={handleBack}>
        Go Back
      </Button>

      <div className="item-title">{isCreateProduct ? "Create product group" : "Edit core products"}</div>
      <div className="wrapper-filter-categoty">
        {isCreateProduct ? (
          <>
            <div className="wrapper-form-item">
              <div className="lable-item">Name</div>
              <Input value={queryParams.name} name={"name"} type={"text"} placeholder={"Enter name"} onChange={handleSetName} />
            </div>

            <div className="color-picker-wrapper">
              <div className="wrapper-form-item">
                <div className="lable-item">Color</div>
                <Input value={queryParams.color} name={"color"} type={"text"} placeholder={"Enter color"} onChange={handleColorInput} />
              </div>
              <Popover
                content={<HexColorPicker color={queryParams.color} onChange={handleColorPicker} />}
                trigger="click"
                visible={visibleColors}
                onVisibleChange={() => setVisibleColors(!visibleColors)}
              >
                <Button type="primary">Colors</Button>
              </Popover>
            </div>

            {selects.map((item, index) => (
              <div key={index} className="select-filter-categoty">
                <SelectBox
                  initialValue={item.initialValue}
                  selectData={handleSetSelect}
                  actionParam={item.param}
                  value={item.value}
                  option={item.option}
                  initialId={item.initial}
                  lable={item.lable}
                  clearSelect={clearSelect}
                />
                <ClearOutlined onClick={() => handleClearSelect(item.param)} />
              </div>
            ))}
          </>
        ) : null}

        <div className="title">Core Products</div>
        <div className="wrapper-form-item">
          <div className="lable-item">Title</div>
          <Input value={coreParams.title} name={"title"} type={"text"} placeholder={"Enter title"} onChange={handleSeInput} />
        </div>
        <div className="wrapper-form-item">
          <div className="lable-item">EAN</div>
          <Input value={coreParams.ean} name={"ean"} type={"text"} placeholder={"Enter EAN"} onChange={handleSeInput} />
        </div>

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

        <div className="filter-wrapper">
          <div className="filter-box">
            <p>Date:</p>
            <RangePicker value={dateInterval} onChange={(date, dateString) => getSelectDate(date, dateString)} />
          </div>

          <div className="filter-box">
            <p>No Category</p>
            <Switch checked={coreParams.noCategory} name="noCategory" onChange={onChangeSwitch} />
          </div>

          <div className="filter-box">
            <p>No Brand</p>
            <Switch checked={coreParams.noBrand} name="noBrand" onChange={onChangeSwitch} />
          </div>

          <div className="filter-box">
            <p>Invalid EAN</p>
            <Switch checked={coreParams.issues} name="issues" onChange={onChangeSwitch} />
          </div>

          <div className="filter-box">
            <p>Not reviewed</p>
            <Switch checked={coreParams.notReviewed} name="notReviewed" onChange={onChangeSwitch} />
          </div>

          <div className="filter-box">
            <p>Goto Page:</p>
            <Input value={coreParams.page} name="page" type="number" min="1" onChange={handlePage} />
          </div>
        </div>

        <div className="core-products-wrapper">
          <div style={{ width: "50%" }}>
            <div className="title-products">All core products</div>
            <div className="all-products" ref={ref}>
              <div className="products-list">
                {status === STATE_STATUSES.READY ? (
                  <>
                    {rows.length ? (
                      rows.map((product) => (
                        <div key={product.id} className="core-product-item">
                          <Checkbox checked={queryParams.coreProducts.includes(product.id)} onChange={() => handleSelectProduct(product)}>
                            {product.title}
                          </Checkbox>
                        </div>
                      ))
                    ) : (
                      <div className="wrapper-box">
                        <Empty />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="wrapper-box">
                    <Loader />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ width: "50%" }}>
            <div className="title-products">Selected core products: {selectedProducts.length}</div>
            <div style={{ height: `${heightDiv}px` }} className="selected-products">
              <div className="products-list">
                {selectedProducts.length ? (
                  selectedProducts.map((product) => (
                    <div key={product.id} className="core-product-item">
                      <Checkbox checked={queryParams.coreProducts.includes(product.id)} onChange={() => handleSelectProduct(product)}>
                        {product.title}
                      </Checkbox>
                    </div>
                  ))
                ) : (
                  <div className="wrapper-box">
                    <Empty />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Pagination
          className="pagination-controls"
          total={count * coreParams.perPage}
          pageSize={coreParams.perPage}
          current={coreParams.page}
          onChange={onChangePage}
          onShowSizeChange={onChangePerPage}
        />
      </div>

      <Button type="primary" onClick={handleSubmit}>
        {isCreateProduct ? "Create" : "Update"}
      </Button>
    </div>
  );
};

export default connect(
  (state) => ({
    rows: state.coreProducts.coreProducts.rows,
    count: state.coreProducts.coreProducts.count,
    status: state.coreProducts.status,
    selectCoreProducts: state.productGroups.productGroup.coreProduct,
  }),
  {
    getCoreProducts,
    createProductGroup,
    addProductGroupCores,
    getBrands,
    getProductGroup,
    getCategories,
    getProductGroups,
    getManufacturers,
  }
)(withRouter(CreateProductGroup));
