import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import { getCategories, createCategory, editCategory } from "../../store/categories/action";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import CoreForm from "../ModalFrom/CoreForm";
import { STATE_STATUSES } from "../../utils/app";
import { notification } from "antd";
import CategoryTable from "components/Tables/CategoryTable";

const CategoriesList = (props) => {
  const {
    match: { params },
    history,
  } = props;

  const { categories, status, searchValue } = useSelector((state) => {
    return {
      categories: state.categories.categories,
      status: state.categories.status,
      searchValue: state.filters.searchValue,
    };
  });
  const dispatch = useDispatch();

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
      lable: "Parent category",
      required: false,
      mode: false,
      categorySelect: true,
    },
  ];
  const switchData = [{ label: "Subscription", name: "subscription", default: true, required: false }];

  const initialValue = {
    subscription: true,
  };

  const [queryParams, setQueryParams] = useState(qs.parse(params.param));

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/categories/${queryString}`);
  }, [queryParams, history]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const onSendForm = (values) => {
    const data = { ...values, status: { subscription: values.subscription } };
    delete data["subscription"];
    dispatch(createCategory(data)).catch(() => openNotification("error"));
  };

  const openNotification = (type) => {
    notification[type]({
      message: "Error",
      description: "This category already exists.",
    });
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

  const searchedData = useMemo(() => {
    const search = new RegExp(searchValue, "gi");
    return categories.filter((item) => item.name.match(search));
  }, [searchValue, categories]);

  const changeSubscription = (item) => {
    const {
      id,
      categoryId,
      color,
      name,
      status: { subscription },
    } = item[0];
    console.log(id, categoryId, color, name, subscription);
    const data = {
      categoryId,
      color,
      name,
      status: {
        subscription: !subscription,
      },
    };
    dispatch(editCategory(data, id)).then(() => dispatch(getCategories()));
  };

  return (
    <>
      <div className="item-title">Categories</div>
      <Search />
      <CoreForm
        initialValue={initialValue}
        title={"Create Category"}
        inputData={inputData}
        selectData={selectData}
        onSendForm={onSendForm}
        switchData={switchData}
      />
      {status !== STATE_STATUSES.PENDING ? (
        <CategoryTable
          data={searchedData}
          page={Number(queryParams.page)}
          perPage={Number(queryParams.perPage)}
          setPage={setPage}
          setPerPage={setPerPage}
          changeSubscription={changeSubscription}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default withRouter(CategoriesList);
