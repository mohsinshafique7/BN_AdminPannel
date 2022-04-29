import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import { getCategories } from "../../store/categories/action";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import CoreForm from "../ModalFrom/CoreForm";
import { notification } from "antd";
import CategoryTable from "components/Tables/CategoryTable";
import { useGetAllCategories, useCreateCategory, useUpdateCategory } from "../../Requests/CategoryRequest";
import { categoryCreateInput } from "../../utils/FormInputs";
const CategoriesList = (props) => {
  const {
    match: { params },
    history,
  } = props;
  const { isLoading: categoriesIsLoading, data: categoriesData } = useGetAllCategories();
  const { mutate: createCategory, isError: createCategoryIsError } = useCreateCategory();
  const { mutate: updateCategory, isError: updateCategoryIsError } = useUpdateCategory();

  const [formInputs, setFormInputs] = useState(null);
  useEffect(() => {
    if (!categoriesIsLoading) {
      setFormInputs(categoryCreateInput(categoriesData?.categories));
    }
  }, [categoriesIsLoading, categoriesData]);
  const { searchValue } = useSelector((state) => {
    return {
      searchValue: state.filters.searchValue,
    };
  });
  const dispatch = useDispatch();

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
    createCategory(data);
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
    return categoriesData?.categories.filter((item) => item.name.match(search));
  }, [searchValue, categoriesData]);

  const changeSubscription = (item) => {
    const {
      id,
      categoryId,
      color,
      name,
      status: { subscription },
    } = item[0];
    const data = {
      categoryId,
      color,
      name,
      status: {
        subscription: !subscription,
      },
    };
    updateCategory({ id, data });
  };
  function handleCategoryEdit(values) {
    const id = values.id;
    const data = { ...values, status: { subscription: values.subscription } };
    delete data["subscription"];
    delete data["id"];
    updateCategory({ id, data });
  }
  return (
    <>
      <div className="item-title">Categories</div>
      <Search />

      {!categoriesIsLoading && formInputs ? (
        <>
          <CoreForm
            initialValue={initialValue}
            title={"Create Category"}
            inputData={formInputs.inputData}
            selectData={formInputs.selectData}
            onSendForm={onSendForm}
            switchData={formInputs.switchData}
          />
          <CategoryTable
            data={searchedData}
            page={Number(queryParams.page)}
            perPage={Number(queryParams.perPage)}
            setPage={setPage}
            setPerPage={setPerPage}
            changeSubscription={changeSubscription}
            handleCategoryEdit={handleCategoryEdit}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default withRouter(CategoriesList);
