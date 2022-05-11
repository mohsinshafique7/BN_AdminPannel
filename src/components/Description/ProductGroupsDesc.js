import React, { useState, useEffect } from "react";
import { Popconfirm, Tooltip, Button, Input, Popover } from "antd";
import { HexColorPicker } from "react-colorful";
import Search from "../Search/Search";
import CoreForm from "../ModalFrom/CoreForm";
import Loader from "../Loader/Loader";
import { EditOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import ProductGroupCoreProduct from "components/Tables/ProductGroupCoreProduct";
import { useGetSingleCustomGroups, useUpdateCustomGroup, useDeleteCustomGroup } from "../../Requests/CustomGroupRequest";
import { useGetAllCompanies } from "../../Requests/CompanyRequest";
import { useGetAllUsers } from "../../Requests/UsersRequest";
import { CustomGroupEditInput } from "../../utils/FormInputs/CustomGroupFormInputs";
import { useParams, useHistory } from "react-router-dom";

const ProductGroupsDesc = () => {
  const { id: paramId } = useParams();
  const history = useHistory();
  const { isLoading: singleCustomGroupsIsLoading, data: singleCustomGroupsData, refetch } = useGetSingleCustomGroups(paramId);
  const { isLoading: companiesIsLoading, data: companiesData } = useGetAllCompanies();
  const { isLoading: usersIsLoading, data: usersData } = useGetAllUsers();

  const { mutate: updateCustomGroup } = useUpdateCustomGroup();
  const { mutate: deleteCustomGroup, status: deleteCustomGroupStatus } = useDeleteCustomGroup();

  // const { searchValue } = useSelector((state) => {
  //   return {
  //     searchValue: state.filters.searchValue,
  //   };
  // });
  useEffect(() => {
    refetch();
  }, [refetch]);
  const [inputs, setInputs] = useState(null);
  useEffect(() => {
    if (!companiesIsLoading && !usersIsLoading) {
      setInputs(CustomGroupEditInput(usersData?.users, companiesData?.companies));
    }
  }, [companiesIsLoading, usersIsLoading, usersData, companiesData]);

  const [inintialColor, setInintialColor] = useState(singleCustomGroupsData?.productGroup?.color);
  const [editColor, setEditColor] = useState(false);
  const [visibleColors, setVisibleColors] = useState(false);

  useEffect(() => {
    if (!singleCustomGroupsIsLoading) {
      setInintialColor(singleCustomGroupsData?.productGroup?.color);
    }
  }, [singleCustomGroupsData, singleCustomGroupsIsLoading]);

  const initialValue = {
    id: paramId,
    name: singleCustomGroupsData?.productGroup?.name,
    userId: singleCustomGroupsData?.productGroup?.user?.id,
    companyId: singleCustomGroupsData?.productGroup?.company?.id,
  };

  const handleColorPicker = (color) => {
    setInintialColor(color);
  };

  const handleColorInput = (e) => {
    const { value } = e.target;
    setInintialColor(value);
  };
  const removeProductGroupCores = (values) => {
    console.log("Need to be fixed");
  };
  const handleEditColor = () => {
    updateCustomGroup({ values: { color: inintialColor }, id: paramId });
    setEditColor(false);
  };

  const handleDelete = () => {
    deleteCustomGroup(paramId);
  };
  useEffect(() => {
    if (deleteCustomGroupStatus === "success") {
      history.push("/product-groups/page=0&perPage=10");
    }
  }, [deleteCustomGroupStatus, history]);

  const onSendForm = (values) => {
    delete values["id"];
    updateCustomGroup({ values, id: paramId });
  };

  return (
    <>
      <Button type="primary" onClick={() => history.push("/product-groups/page=0&perPage=10")}>
        Go Back
      </Button>
      <div className="item-title">Product Groups Details</div>
      <div className="item-wrapper">
        {inputs && !singleCustomGroupsIsLoading ? (
          <>
            <div className="description-box">
              <div className="title-item-desc">
                Name: <span>{singleCustomGroupsData?.productGroup?.name}</span>
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
                User: <span>{singleCustomGroupsData?.productGroup?.user ? singleCustomGroupsData?.productGroup?.user.email : "-"}</span>
              </div>
              <div className="title-item-desc">
                Company:{" "}
                <span>{singleCustomGroupsData?.productGroup?.company ? singleCustomGroupsData?.productGroup?.company.name : "-"}</span>
              </div>

              <div className="title-item-desc">Core Products:</div>
              {singleCustomGroupsData?.productGroup?.coreProduct.length ? (
                <>
                  <Search />
                  <ProductGroupCoreProduct
                    data={singleCustomGroupsData?.productGroup?.coreProduct}
                    removeProductGroupCores={removeProductGroupCores}
                  />
                </>
              ) : (
                <Loader />
              )}
            </div>
            <div className="controls-box">
              <Popconfirm
                onConfirm={() => handleDelete(paramId)}
                title={`Are you sure you want to delete group product ${singleCustomGroupsData?.productGroup?.name}？`}
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
                inputData={inputs.inputData}
                selectData={inputs.selectData}
                onSendForm={onSendForm}
              />

              <Button type="primary" onClick={() => history.push(`/create-product-group/${paramId}`)}>
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

export default ProductGroupsDesc;
