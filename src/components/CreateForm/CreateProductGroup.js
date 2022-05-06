import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Input, Pagination, Popover, Checkbox, Button, Empty, DatePicker, Switch } from "antd";
import moment from "moment";
import { HexColorPicker } from "react-colorful";
import SelectBox from "../ModalFrom/Select";
import Multiselect from "../ModalFrom/Multiselect";
import Loader from "../Loader/Loader";
import { ClearOutlined } from "@ant-design/icons";
import { useGetAllManufacturers } from "../../Requests/ManufacturerRequest";
import { useGetAllBrands } from "../../Requests/BrandRequest";
import { useGetAllCategories } from "../../Requests/CategoryRequest";
import {
  useGetAllCustomGroups,
  useGetSingleCustomGroups,
  useCreateCustomGroup,
  useAddCoreProductsCustomGroup,
} from "../../Requests/CustomGroupRequest";
import { useGetAllCompanies } from "../../Requests/CompanyRequest";
import { useGetAllUsers } from "../../Requests/UsersRequest";
import { useGetAllCoreProducts } from "../../Requests/CoreProductRequest";
const CreateProductGroup = (props) => {
  const { RangePicker } = DatePicker;

  const {
    history,
    match: { params },
  } = props;
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
  const { isLoading: brandsIsLoading, data: brandsData } = useGetAllBrands();
  const { isLoading: categoriesIsLoading, data: categoriesData } = useGetAllCategories();
  const { isLoading: manufacturerIsLoading, data: manufacturerData } = useGetAllManufacturers();
  const { isLoading: customGroupsIsLoading, data: customGroupsData } = useGetAllCustomGroups();
  const { isLoading: singleCustomGroupsIsLoading, data: singleCustomGroupsData, refetch } = useGetSingleCustomGroups(params.id);
  const { mutate: createCustomGroup, status: customGroupCreateStatus } = useCreateCustomGroup();
  const { mutate: updateCoreProducts, status: addCoreProductsStatus } = useAddCoreProductsCustomGroup();

  const { isLoading: companiesIsLoading, data: companiesData } = useGetAllCompanies();
  const { isLoading: usersIsLoading, data: usersData } = useGetAllUsers();
  const { isLoading: coreProductsIsLoading, data: coreProductsData } = useGetAllCoreProducts(coreParams);
  const [isCreateProduct, setIsCreateProduct] = useState(true);
  console.log(companiesData);
  console.log(usersData);
  const [queryParams, setQueryParams] = useState({
    name: "",
    color: "#ffffff",
    userId: null,
    companyId: null,
    coreProducts: [],
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [clearSelect, setClearSelect] = useState({});
  const [dateInterval, setDateInterval] = useState([]);
  const [visibleColors, setVisibleColors] = useState(false);
  const [selectData, setSelectData] = useState(null);
  useEffect(() => {
    if (!brandsIsLoading && !categoriesIsLoading && !manufacturerIsLoading && !customGroupsIsLoading) {
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
          name: "productGroup",
          value: "id",
          option: "name",
          store: customGroupsData?.productGroups,
          lable: "Product Group",
          placeholder: "Product Group",
          initialValue: queryParams.productGroup,
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
  }, [
    brandsIsLoading,
    categoriesIsLoading,
    manufacturerIsLoading,
    customGroupsIsLoading,
    brandsData,
    manufacturerData,
    categoriesData,
    customGroupsData,
    queryParams,
  ]);
  const [selects, setSelects] = useState(null);

  useEffect(() => {
    if (!companiesIsLoading && !usersIsLoading) {
      setSelects([
        {
          param: "company",
          initialValue: queryParams.company,
          // selectData: { selectValueSet },
          placeholder: "Select Company",
          actionParam: "company",
          value: "name",
          option: "name",
          // initialId={item.initial}
          lable: "Company",
          store: companiesData?.companies,
          clearSelect: { clearSelect },
        },
        {
          param: "userId",
          initialValue: queryParams.userId,
          placeholder: "Select User",
          actionParam: "userId",
          value: "id",
          option: "email",
          lable: "User",
          store: usersData?.users,
          clearSelect: { clearSelect },
        },
      ]);
    }
  }, [queryParams, companiesData, companiesIsLoading, clearSelect, usersData, usersIsLoading]);

  useEffect(() => {
    if (Number(params.id) !== 0) {
      setIsCreateProduct(false);
      refetch();
    }
  }, [params, refetch]);

  useEffect(() => {
    if (
      !singleCustomGroupsIsLoading &&
      singleCustomGroupsData &&
      singleCustomGroupsData?.productGroup?.coreProduct.length &&
      Number(params.id) !== 0
    ) {
      const selectProducts = singleCustomGroupsData?.productGroup?.coreProduct.map((product) => ({ title: product.title, id: product.id }));
      setSelectedProducts(selectProducts);
      const selectProductsQuery = singleCustomGroupsData?.productGroup?.coreProduct.map((product) => product.id);
      setQueryParams((queryParams) => {
        return {
          ...queryParams,
          coreProducts: selectProductsQuery,
        };
      });
    }
  }, [singleCustomGroupsIsLoading, singleCustomGroupsData, params]);

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
  useEffect(() => {
    if (customGroupCreateStatus === "success") {
      history.push("/product-groups/page=0&perPage=10");
    }
  }, [customGroupCreateStatus, history]);

  useEffect(() => {
    if (addCoreProductsStatus === "success") {
      history.push("/product-groups/page=0&perPage=10");
    }
  }, [addCoreProductsStatus, history]);
  const handleSubmit = () => {
    if (isCreateProduct) {
      createCustomGroup(queryParams);
    } else {
      updateCoreProducts({ values: { coreProducts: queryParams.coreProducts }, id: params.id });
      // .then(() =>
      //     props.history.push(`/product-group/${params.id}`)
      //   );
    }
    // if (isCreateProduct) {
    //   createProductGroup(queryParams).then(() => props.history.push("/product-groups/page=0&perPage=10"));
    // } else {
    //   addProductGroupCores({ coreProducts: queryParams.coreProducts }, params.id).then(() =>
    //     props.history.push(`/product-group/${params.id}`)
    //   );
    // }
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
        {isCreateProduct && !companiesIsLoading && !usersIsLoading && selects ? (
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

            {!companiesIsLoading &&
              !usersIsLoading &&
              selects &&
              selects.map((item, index) => (
                <div key={index} className="select-filter-categoty">
                  <SelectBox
                    initialValue={item.initialValue}
                    selectData={handleSetSelect}
                    placeholder={item.placeholder}
                    actionParam={item.param}
                    value={item.value}
                    option={item.option}
                    initialId={item.initial}
                    lable={item.lable}
                    store={item.store}
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

        {!brandsIsLoading &&
        !categoriesIsLoading &&
        !manufacturerIsLoading &&
        !customGroupsIsLoading &&
        !coreProductsIsLoading &&
        selectData ? (
          <>
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
                <div className="all-products">
                  <div className="products-list">
                    {coreProductsData?.cores?.rows.length ? (
                      coreProductsData?.cores?.rows.map((product, index) => (
                        <div key={index} className="core-product-item">
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

              <div style={{ width: "50%" }}>
                <div className="title-products">Selected core products: {selectedProducts.length}</div>
                <div className="selected-products">
                  <div className="products-list">
                    {selectedProducts.length ? (
                      selectedProducts.map((product, index) => (
                        <div key={index} className="core-product-item">
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
          </>
        ) : (
          <Loader />
        )}

        {coreProductsData && (
          <>
            <Pagination
              className="pagination-controls"
              total={coreProductsData?.cores?.count * coreParams.perPage}
              pageSize={coreParams.perPage}
              current={coreParams.page}
              onChange={onChangePage}
              onShowSizeChange={onChangePerPage}
            />
          </>
        )}
      </div>

      <Button type="primary" onClick={handleSubmit}>
        {isCreateProduct ? "Create" : "Update"}
      </Button>
    </div>
  );
};

export default withRouter(CreateProductGroup);
