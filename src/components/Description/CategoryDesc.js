import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import Loader from "../../components/Loader/Loader";
import styled from "styled-components";
import moment from "moment";
import { Popconfirm, Button, Checkbox } from "antd";
import CoreForm from "../ModalFrom/CoreForm";
import Search from "../Search/Search";
import { categoryEditInput } from "../../utils/FormInputs/CategoryFormInputs";
import { useGetSingleCategories, useGetAllCategories, useDeleteCategory, useUpdateCategory } from "../../Requests/CategoryRequest";
const Styles = styled.div`
  .title-child-categories {
    text-align: center;
    font-size: 36px;
    margin-top: 30px;
  }
`;
const CategoryDesc = ({ history, match: { params } }) => {
  const { isLoading: categoryIsLoading, data: categoryData } = useGetSingleCategories(params.id);
  const { isLoading: categoriesIsLoading, data: categoriesData } = useGetAllCategories();
  const { mutate: updateCategory } = useUpdateCategory("categoryDes");
  const { mutate: deleteCategory } = useDeleteCategory(history);

  const [inputs, setInputs] = useState(null);
  useEffect(() => {
    if (!categoryIsLoading) {
      setInputs(categoryEditInput(categoriesData?.categories, categoriesData?.categories?.status?.subscription));
    }
  }, [categoryIsLoading, categoriesData]);

  const initialValue = {
    name: categoryData?.category?.name,
    color: categoryData?.category?.color,
    categoryId: categoryData?.category?.categoryId,
    subscription: categoryData?.category?.status?.subscription,
    pricePer: categoryData?.category?.pricePer,
    measurementUnit: categoryData?.category?.measurementUnit,
  };

  const divStyle = {
    color: categoryData?.category?.color,
  };

  const [queryParams] = useState(qs.parse(params.param));

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/category/${params.id}/${queryString}`);
  }, [queryParams, history, params.id]);

  const handleDelete = () => {
    deleteCategory(params.id);
  };

  const onSendForm = (values) => {
    const data = { ...values, status: { subscription: values.subscription } };
    delete data["subscription"];
    updateCategory({ id: params.id, data });
  };

  // const setPage = (page) => {
  //   setQueryParams((queryParams) => {
  //     return {
  //       ...queryParams,
  //       page,
  //     };
  //   });
  // };

  // const setPerPage = (perPage) => {
  //   setQueryParams((queryParams) => {
  //     return {
  //       ...queryParams,
  //       perPage,
  //     };
  //   });
  // };

  return (
    <Styles>
      <Button type="primary" onClick={() => history.goBack()}>
        Go Back
      </Button>
      <div className="item-title">Category Details</div>
      {inputs && !categoryIsLoading && !categoriesIsLoading ? (
        <>
          <div className="item-wrapper">
            <div className="description-box category-details">
              {/* createdAt */}
              <div className="title-item-desc">Created At:</div>
              <div>{moment(categoryData?.category?.createdAt).format("MMMM Do YYYY, h:mm")}</div>
              {/* updatedAt */}
              <div className="title-item-desc">Updated At:</div>
              <div>{moment(categoryData?.category?.updatedAt).format("MMMM Do YYYY, h:mm")}</div>
              {/* name */}
              <div className="title-item-desc">Name:</div>
              <div>{categoryData?.category?.name}</div>
              {/* color */}
              <div className="title-item-desc">Colour:</div>
              <div style={divStyle}>{categoryData?.category?.color}</div>
              {/* pricePer */}
              <div className="title-item-desc">Price per:</div>
              <div>{categoryData?.category?.pricePer || "-"}</div>
              {/* measurementUnit */}
              <div className="title-item-desc">Measurement Unit:</div>
              <div>{categoryData?.category?.measurementUnit || "-"}</div>
              {/* status.subscription */}
              <div className="title-item-desc">Subscription:</div>
              <div>
                <Checkbox onChange={() => {}} checked={categoryData?.category?.status?.subscription}></Checkbox>
              </div>
            </div>
            <div className="controls-box">
              <Popconfirm
                onConfirm={() => handleDelete(params.id)}
                title={`Are you sure you want to delete category ${categoryData?.category?.name}？`}
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
                inputData={inputs.inputData}
                selectData={inputs.selectData}
                switchData={inputs.switchData}
                onSendForm={onSendForm}
              />
            </div>
          </div>
          {categoryData?.category?.child && categoryData?.category?.child.length ? (
            <>
              <div className="title-child-categories">Child Categories</div>
              <Search />
              {/* <TableBox
                data={child}
                tableHeader={tableHeader}
                tableData={tableData}
                titleParam={"name"}
                sortParams={sortParams}
                page={Number(queryParams.page)}
                perPage={Number(queryParams.perPage)}
                setPage={setPage}
                setPerPage={setPerPage}
              /> */}
            </>
          ) : null}
        </>
      ) : (
        <Loader />
      )}
    </Styles>
  );
};

export default withRouter(CategoryDesc);
