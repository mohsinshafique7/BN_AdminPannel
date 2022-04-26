import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Popconfirm, Tooltip, Button, Input, Popover } from "antd";
import { HexColorPicker } from "react-colorful";
import Search from "../Search/Search";
import {
  getProductGroup,
  deleteProductGroup,
  editProductGroup,
  removeProductGroupCores,
  addProductGroupCores,
} from "../../store/productGroups/action";
import { useSelector } from "react-redux";
import { getUsers } from "../../store/users/action";
import { getCompanies } from "../../store/companies/action";
import {
  getCoreProducts,
  // setSelectCoreProducts
} from "../../store/coreProducts/action";

import CoreForm from "../ModalFrom/CoreForm";
import Loader from "../Loader/Loader";

import { STATE_STATUSES } from "../../utils/app";
import { EditOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import ProductGroupCoreProduct from "components/Tables/ProductGroupCoreProduct";

const ProductGroupsDesc = ({
  removeProductGroupCores,
  getProductGroup,
  deleteProductGroup,
  editProductGroup,
  getCompanies,
  getUsers,
  // status,
  // productGroup: { name, id, coreProduct, user, company, color },
  history,
  match: { params },
}) => {
  const { productGroup, status, searchValue } = useSelector((state) => {
    return {
      searchValue: state.filters.searchValue,
      productGroup: state.productGroups.productGroup,
      status: state.productGroups.status,
    };
  });

  const { name, id, coreProduct, user, company, color } = productGroup;
  const inputData = [{ label: "Name", name: "name", type: "text", required: true }];

  const selectData = [
    { name: "userId", value: "id", option: "email", action: getUsers, store: "users", lable: "User", required: false, mode: false },
    {
      name: "companyId",
      value: "id",
      option: "name",
      action: getCompanies,
      store: "companies",
      lable: "Company",
      required: false,
      mode: false,
    },
  ];

  const [inintialColor, setInintialColor] = useState(color);
  const [editColor, setEditColor] = useState(false);
  const [visibleColors, setVisibleColors] = useState(false);

  useEffect(() => {
    setInintialColor(color);
  }, [color]);

  // const onSearch = (data) =>
  //   data.filter((item) => {
  //     if (searchValue) {
  //       return item["title"].toLowerCase().includes(searchValue.toLowerCase());
  //     }
  //     return item;
  //   });

  // const limit = page * perPage + perPage < onSearch(coreProduct).length ? page * perPage + perPage : onSearch(coreProduct).length;

  // const renderData = onSearch(coreProduct).slice(page * perPage, limit);

  // const onChangePage = (page, pageSize) => {
  //   setPage(page - 1);
  // };

  // const onChangePerPage = (page, pageSize) => {
  //   setPerPage(pageSize);
  // };

  const initialValueDefine = () => {
    if (name && user && company) {
      return { name, userId: user.id, companyId: company.id };
    } else if (id && user && !company) {
      return { name, userId: user.id };
    } else if (name && !user && company) {
      return { name, companyId: company.id };
    } else {
      return { name };
    }
  };

  const initialValue = initialValueDefine();

  useEffect(() => {
    getProductGroup(params.id);
  }, [getProductGroup, params.id]);

  const handleColorPicker = (color) => {
    setInintialColor(color);
  };

  const handleColorInput = (e) => {
    const { value } = e.target;
    setInintialColor(value);
  };

  const handleEditColor = () => {
    editProductGroup({ color: inintialColor }, id);
    setEditColor(false);
  };

  const handleDelete = (id) => {
    deleteProductGroup(id).then(() => history.push("/product-groups/page=0&perPage=10"));
  };

  const onSendForm = (values) => {
    editProductGroup(values, id);
  };

  return (
    <>
      <Button type="primary" onClick={() => history.push("/product-groups/page=0&perPage=10")}>
        Go Back
      </Button>
      <div className="item-title">Product Groups Details</div>
      <div className="item-wrapper">
        {status === STATE_STATUSES.READY ? (
          <>
            <div className="description-box">
              <div className="title-item-desc">
                Name: <span>{name}</span>
              </div>
              <div className="title-item-desc">
                Color:
                {editColor ? (
                  <div className="color-picker-wrapper desc">
                    <div className="wrapper-form-item">
                      <Input value={inintialColor} name={"color"} type={"text"} placeholder={"Enter color"} onChange={handleColorInput} />
                    </div>
                    <Popover
                      content={<HexColorPicker color={inintialColor} onChange={handleColorPicker} />}
                      trigger="click"
                      visible={visibleColors}
                      onVisibleChange={() => setVisibleColors(!visibleColors)}
                    >
                      <Button type="primary">Colors</Button>
                    </Popover>
                  </div>
                ) : (
                  <Tooltip placement="top" title={inintialColor}>
                    <div
                      style={{ width: "20px", height: "20px", marginLeft: "15px", marginRight: "15px", background: inintialColor }}
                    ></div>
                  </Tooltip>
                )}
                {editColor ? (
                  <div>
                    <CloseOutlined style={{ marginRight: "10px", marginLeft: "10px" }} onClick={() => setEditColor(false)} />
                    <CheckOutlined onClick={handleEditColor} />
                  </div>
                ) : (
                  <EditOutlined onClick={() => setEditColor(!editColor)} />
                )}
              </div>
              <div className="title-item-desc">
                User: <span>{user ? user.email : "-"}</span>
              </div>
              <div className="title-item-desc">
                Company: <span>{company ? company.name : "-"}</span>
              </div>

              <div className="title-item-desc">Core Products:</div>
              {coreProduct.length ? (
                <Search />
              ) : // <Input
              //   style={{ marginBottom: "15px" }}
              //   placeholder="Search"
              //   value={searchValue}
              //   onChange={(e) => setSearchValue(e.target.value)}
              // />
              null}
              <ProductGroupCoreProduct data={productGroup.coreProduct} removeProductGroupCores={removeProductGroupCores} />
              {/* {renderData && renderData.length ? (
                <>
                  <div className="desc-core-product">
                    {renderData.map((product) => (
                      <Popconfirm
                        key={product.id}
                        onConfirm={() => removeProductGroupCores({ coreProducts: [product.id] }, id)}
                        title={`Are you sure you want to delete core product ${product.title}？`}
                        okText="Yes"
                        cancelText="No"
                      >
                        <div className="item-core-product">
                          <DeleteOutlined />
                          <span>{product.title}</span>
                        </div>
                      </Popconfirm>
                    ))}
                  </div>
                  <Pagination
                    className="pagination-controls"
                    total={onSearch(coreProduct).length}
                    pageSize={perPage}
                    current={page + 1}
                    onChange={onChangePage}
                    onShowSizeChange={onChangePerPage}
                  />
                </>
              ) : (
                <Empty />
              )} */}
            </div>
            <div className="controls-box">
              <Popconfirm
                onConfirm={() => handleDelete(id)}
                title={`Are you sure you want to delete group product ${name}？`}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger>
                  Delete
                </Button>
              </Popconfirm>
              <CoreForm
                title={"Edit Product Groups"}
                initialValue={initialValue}
                inputData={inputData}
                selectData={selectData}
                onSendForm={onSendForm}
              />

              <Button type="primary" onClick={() => history.push(`/create-product-group/${params.id}`)}>
                Edit Core Product
              </Button>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default connect(null, {
  removeProductGroupCores,
  addProductGroupCores,
  getCoreProducts,
  getUsers,
  getCompanies,
  getProductGroup,
  deleteProductGroup,
  editProductGroup,
})(withRouter(ProductGroupsDesc));
