import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import CoreForm from "../ModalFrom/CoreForm";
import SelectBox from "../ModalFrom/Select";
import { ClearOutlined } from "@ant-design/icons";
import { notification } from "antd";
import UsersTable from "components/Tables/UsersTable";
import { useGetAllUsers, useCreateUsers, useUpdateUsers } from "../../Requests/UsersRequest";
import { useGetAllCompanies } from "../../Requests/CompanyRequest";
import { usersCreateInputs } from "../../utils/FormInputs";
const UsersList = (props) => {
  const {
    match: { params },
    history,
  } = props;

  const { isLoading: companiesIsLoading, data: companiesData } = useGetAllCompanies();
  const { isLoading: usersIsLoading, data: usersData } = useGetAllUsers();
  const { mutate: createUser, isError: createUserIsError } = useCreateUsers();
  const { mutate: updateUser, isError: updateUserIsError } = useUpdateUsers();

  const { searchValue } = useSelector((state) => {
    return {
      searchValue: state.filters.searchValue,
    };
  });
  const [queryParams, setQueryParams] = useState(qs.parse(params.param));
  const [clearSelect, setClearSelect] = useState({});
  const [selectData, setSelectData] = useState([]);
  const [formInputs, setFormInputs] = useState(null);
  useEffect(() => {
    if (!companiesIsLoading) {
      setFormInputs(usersCreateInputs(companiesData?.companies));
    }
  }, [companiesIsLoading, companiesData]);

  useEffect(() => {
    if (!companiesIsLoading) {
      setSelectData([
        {
          param: "company",
          initialValue: queryParams.company,
          selectData: { selectValueSet },
          placeholder: "Select Company",
          actionParam: "company",
          value: "name",
          option: "name",
          // initialId={item.initial}
          lable: "Company",
          store: companiesData?.companies,
          clearSelect: { clearSelect },
        },
      ]);
    }
  }, [companiesIsLoading, companiesData, queryParams, clearSelect]);
  const initialValue = {
    is_stuff: false,
    sendEmail: false,
  };

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/users/${queryString}`);
  }, [queryParams, history]);

  const selectValueSet = (value) => {
    setQueryParams((queryParams) => Object.assign({}, queryParams, value));
  };

  const handleClearSelect = (name) => {
    setClearSelect([name]);

    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        [name]: null,
      };
    });
  };

  const searchedData = useMemo(() => {
    const search = new RegExp(searchValue, "gi");
    return usersData?.users
      .filter((item) => item.email.match(search) || item.first_name.match(search) || item.last_name.match(search))
      .filter((item) => (queryParams["company"] ? item?.company?.name === queryParams.company : true));
  }, [searchValue, usersData, queryParams]);

  const onSendForm = (values) => {
    createUser(values);
    if (createUserIsError) {
      openNotification("error");
    }
  };

  const openNotification = (type) => {
    notification[type]({
      message: "Error",
      description: "User with this email already exists.",
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
  const handleEditUser = (values) => {
    const id = values.id;
    delete values["id"];
    updateUser({ id, values });
  };
  return (
    <>
      <div className="item-title">Users</div>
      <Search />

      {!usersIsLoading && formInputs ? (
        <>
          <CoreForm
            title={"Create User"}
            initialValue={initialValue}
            selectData={formInputs.selectData}
            inputData={formInputs.inputData}
            passwordData={formInputs.passwordData}
            switchData={formInputs.switchData}
            onSendForm={onSendForm}
          />
          <div className="wrapper-filter-categoty">
            <div className="title">Filter By:</div>
            {selectData.length > 0 &&
              selectData.map((item, index) => (
                <div key={index} className="select-filter-categoty">
                  <SelectBox
                    initialValue={item.initialValue}
                    selectData={selectValueSet}
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
          </div>
          <UsersTable
            data={searchedData}
            page={Number(queryParams.page)}
            perPage={Number(queryParams.perPage)}
            setPage={setPage}
            setPerPage={setPerPage}
            handleEditUser={handleEditUser}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default withRouter(UsersList);
