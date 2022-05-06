import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import CoreForm from "../ModalFrom/CoreForm";
import CategoryTable from "components/Tables/CategoryTable";
import { useGetAllCategories, useCreateCategory, useUpdateCategory } from "../../Requests/CategoryRequest";
import { categoryCreateInput } from "../../utils/FormInputs/CategoryFormInputs";
const CategoriesList = (props) => {
  const {
    match: { params },
    history,
  } = props;
  const { isLoading: categoriesIsLoading, data: categoriesData, status: categoriesStatus } = useGetAllCategories();
  const { mutate: createCategory } = useCreateCategory();
  const { mutate: updateCategory } = useUpdateCategory("list");

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

  const initialValue = {
    subscription: true,
  };

  const [queryParams, setQueryParams] = useState(qs.parse(params.param));

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/categories/${queryString}`);
  }, [queryParams, history]);

  const onSendForm = (values) => {
    const data = { ...values, status: { subscription: values.subscription } };
    delete data["subscription"];
    console.log(data);
    createCategory(data);
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

      {categoriesStatus === "success" && !categoriesIsLoading && formInputs ? (
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
