import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getBrand, deleteBrand, editBrand, getManufacturers, getBrands } from "../../store/manufacturersBrands/action";
import { setSortedValue, setSearchValue } from "../../store/filters/action";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import moment from "moment";
import { Popconfirm, Button, Tabs } from "antd";
// import ModalFrom from '../ModalFrom/ModalFrom'
import styled from "styled-components";
import CoreForm from "../ModalFrom/CoreForm";

import BrandsTable from "../BrandTables/BrandsTable";
import ProductsTable from "../BrandTables/ProductsTable";

const Styles = styled.div`
  .check-item {
    display: inline-block;
    border-radius: 4px;
    margin: 4px 8px;
    border: 1px solid #ccc;
    padding: 4px 8px;
    font-size: 14px;
  }
  .title-core-product {
    text-align: center;
    font-size: 36px;
    margin-top: 30px;
  }
  .item-wrapper {
    margin-bottom: 25px;
  }
  .empty-item {
    margin-top: 25px;
  }
`;

const BrandDesc = ({
  getManufacturers,
  getBrands,
  getBrand,
  deleteBrand,
  editBrand,
  setSortedValue,
  setSearchValue,
  status,
  brand: { createdAt, updatedAt, name, id, checkList, coreProducts, manufacturerId, brandId, manufacture, child, color },
  history,
  match: { params },
}) => {
  const { TabPane } = Tabs;

  const inputData = [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Colour", name: "color", type: "text", required: true },
  ];

  const selectData = [
    {
      name: "manufacturerId",
      value: "id",
      option: "name",
      action: getManufacturers,
      store: "manufacturers",
      lable: "Change manufacturer",
      required: false,
      mode: false,
    },
    {
      name: "brandId",
      value: "id",
      option: "name",
      action: getBrands,
      store: "brands",
      lable: "Change brand",
      required: false,
      mode: false,
      brandSelect: true,
    },
  ];

  const initialValue = {
    name,
    manufacturerId,
    brandId,
    color,
  };

  const divStyle = {
    color: color,
  };

  const [queryParams, setQueryParams] = useState(qs.parse(params.param));

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/brand/${params.id}/${params.tab}/${queryString}`);
  }, [queryParams, history, params.id, params.tab]);

  useEffect(() => {
    getBrand(params.id);
  }, [getBrand, params.id]);

  const handleDelete = (id) => {
    deleteBrand(id)
      .then(() => history.push("/brands/page=0&perPage=10"))
      .catch((e) => console.log("error", e));
  };

  const onFinishEdit = (values) => {
    console.log(values);
    editBrand(values, id);
  };

  const setPage = (page) => {
    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        page,
      };
    });
  };

  const setPerPage = (perPage) => {
    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        perPage,
      };
    });
  };

  const callback = (key) => {
    history.replace(`/brand/${params.id}/${key}/page=0&perPage=10`);
    setSortedValue(key);
    setSearchValue("");

    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        page: 0,
      };
    });
  };

  return (
    <Styles>
      <Button type="primary" onClick={() => history.goBack()}>
        Go Back
      </Button>
      <div className="item-title">Brand Details</div>
      <div className="item-wrapper">
        <div className="description-box">
          <div className="title-item-desc">
            Created At: <span>{moment(createdAt).format("MMMM Do YYYY, h:mm")}</span>
          </div>
          <div className="title-item-desc">
            Updated At: <span>{moment(updatedAt).format("MMMM Do YYYY, h:mm")}</span>
          </div>
          <div className="title-item-desc">
            Colour: <span style={divStyle}>{color}</span>
          </div>
          <div className="title-item-desc">
            Name: <span>{name}</span>
          </div>
          {manufacture && (
            <div className="title-item-desc">
              Manufacture: <span>{manufacture.name}</span>
            </div>
          )}
          {/* { checkList && checkList.length ?
                        <div className="title-item-desc">
                            CheckList:
                            { checkList.map((item, index) =>
                                <span key={index} className="check-item">{item}</span>
                            )}
                        </div> : null } */}
        </div>
        <div className="controls-box">
          <Popconfirm
            onConfirm={() => handleDelete(id)}
            title={`Are you sure you want to delete brand ${name}？`}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>

          <CoreForm
            title={"Edit Brand"}
            initialValue={initialValue}
            selectData={selectData}
            inputData={inputData}
            brandSelect={true}
            onSendForm={onFinishEdit}
          />

          {/* <ModalFrom
                        text={"Edit Brand"}
                        name={"name"}
                        initialValue={name}
                        isSelect={true}
                        isDynamicForm={true}
                        postPatam={selectData}
                        initialId={manufacturerId}
                        checkList={checkList}
                        onFinish={onFinishEdit}
                    /> */}
        </div>
      </div>

      <Tabs defaultActiveKey={params.tab} onChange={callback}>
        <TabPane tab="Child Brands" key="brand" disabled={child && child.length === 0}>
          <BrandsTable
            status={status}
            dataTable={child}
            setPage={setPage}
            setPerPage={setPerPage}
            page={queryParams.page}
            perPage={queryParams.perPage}
          />
        </TabPane>
        <TabPane tab="Core Products" key="coreProduct" disabled={coreProducts && coreProducts.length === 0}>
          <ProductsTable
            status={status}
            dataTable={coreProducts}
            setPage={setPage}
            setPerPage={setPerPage}
            page={queryParams.page}
            perPage={queryParams.perPage}
          />
        </TabPane>
      </Tabs>
    </Styles>
  );
};

export default connect(
  (state) => ({
    brand: state.manufacturersBrands.brand,
    status: state.manufacturersBrands.status,
  }),
  { getBrands, getBrand, deleteBrand, editBrand, getManufacturers, setSortedValue, setSearchValue }
)(withRouter(BrandDesc));
