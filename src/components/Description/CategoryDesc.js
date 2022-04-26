import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategory, deleteCategory, editCategory } from "../../store/categories/action";
import { getCategories } from "../../store/categories/action";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import styled from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";
import { Popconfirm, Button, Checkbox } from "antd";
import CoreForm from "../ModalFrom/CoreForm";
import TableBox from "../TableBox/TableBox";
import Search from "../Search/Search";

const Styles = styled.div`
  .title-child-categories {
    text-align: center;
    font-size: 36px;
    margin-top: 30px;
  }
`;
const CategoryDesc = ({
  getCategory,
  deleteCategory,
  editCategory,
  getCategories,
  category: { createdAt, updatedAt, name, id, child, categoryId, breadcrumbs, color, status, ...category },
  history,
  match: { params },
}) => {
  const inputData = [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Colour", name: "color", type: "text", required: true },
    { label: "Price per", name: "pricePer", type: "text", required: false },
    { label: "Measurement Unit", name: "measurementUnit", type: "text", required: false },
  ];

  const selectData = [
    {
      name: "categoryId",
      value: "id",
      option: "name",
      action: getCategories,
      store: "categories",
      lable: "Parent Category",
      required: false,
      mode: false,
      categorySelect: true,
    },
  ];
  const switchData = [{ label: "Subscription", name: "subscription", default: status?.subscription, required: false }];

  const initialValue = {
    name,
    color,
    categoryId,
    subscription: status?.subscription,
    pricePer: category.pricePer,
    measurementUnit: category.measurementUnit,
  };

  const divStyle = {
    color: color,
  };

  const setColor = (color) => {
    return { backgroundColor: color, padding: "10px", border: "1px solid green" };
  };

  const sortParams = [
    { label: "Category", value: "category" },
    { label: "Id", value: "id" },
    { label: "Date", value: "createdAt" },
  ];

  const [queryParams, setQueryParams] = useState(qs.parse(params.param));

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/category/${params.id}/${queryString}`);
  }, [queryParams, history, params.id]);

  useEffect(() => {
    getCategory(params.id);
  }, [getCategory, params.id]);

  const handleDelete = (id) => {
    deleteCategory(id).then(() => history.push("/categories/page=0&perPage=10"));
  };

  const onSendForm = (values) => {
    const data = { ...values, status: { subscription: values.subscription } };
    delete data["subscription"];
    editCategory(data, id);
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

  const tableHeader = () => (
    <div className="item-box header">
      <div className="item-link category">Category</div>
      <div className="item-id">Colour</div>
      <div className="item-id">ID</div>
      <div className="item-date">Created At</div>
    </div>
  );

  const tableData = (item) => (
    <>
      <Link className="item-link category" to={`/category/${[item.id]}/page=0&perPage=10`}>
        {breadcrumbs.length ? breadcrumbs.map((crumb) => crumb) : null}
        {`${breadcrumbs.length ? ` / ${name} / ` : `${name} / `} `}
        {[item.name]}
      </Link>
      <div className="item-id">
        <span style={setColor(item.color)}></span>
      </div>
      <div className="item-id">{[item.id]}</div>
      <div className="item-date">{moment(item.createdAt).format("MMMM Do YYYY, h:mm")}</div>
    </>
  );

  return (
    <Styles>
      <Button type="primary" onClick={() => history.goBack()}>
        Go Back
      </Button>
      <div className="item-title">Category Details</div>
      <div className="item-wrapper">
        <div className="description-box category-details">
          {/* createdAt */}
          <div className="title-item-desc">Created At:</div>
          <div>{moment(createdAt).format("MMMM Do YYYY, h:mm")}</div>
          {/* updatedAt */}
          <div className="title-item-desc">Updated At:</div>
          <div>{moment(updatedAt).format("MMMM Do YYYY, h:mm")}</div>
          {/* name */}
          <div className="title-item-desc">Name:</div>
          <div>{name}</div>
          {/* color */}
          <div className="title-item-desc">Colour:</div>
          <div style={divStyle}>{color}</div>
          {/* pricePer */}
          <div className="title-item-desc">Price per:</div>
          <div>{category.pricePer || "-"}</div>
          {/* measurementUnit */}
          <div className="title-item-desc">Measurement Unit:</div>
          <div>{category.measurementUnit || "-"}</div>
          {/* status.subscription */}
          <div className="title-item-desc">Subscription:</div>
          <div>
            <Checkbox onChange={() => {}} checked={status?.subscription}></Checkbox>
          </div>
        </div>
        <div className="controls-box">
          <Popconfirm
            onConfirm={() => handleDelete(id)}
            title={`Are you sure you want to delete category ${name}？`}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
          <CoreForm
            title={"Edits Category"}
            // categorySelect={true}
            initialValue={initialValue}
            inputData={inputData}
            selectData={selectData}
            switchData={switchData}
            onSendForm={onSendForm}
          />
        </div>
      </div>
      {child && child.length ? (
        <>
          <div className="title-child-categories">Child Categories</div>
          <Search />
          <TableBox
            data={child}
            tableHeader={tableHeader}
            tableData={tableData}
            titleParam={"name"}
            sortParams={sortParams}
            page={Number(queryParams.page)}
            perPage={Number(queryParams.perPage)}
            setPage={setPage}
            setPerPage={setPerPage}
          />
        </>
      ) : null}
    </Styles>
  );
};

export default connect(
  (state) => ({
    category: state.categories.category,
  }),
  { getCategory, deleteCategory, editCategory, getCategories }
)(withRouter(CategoryDesc));
