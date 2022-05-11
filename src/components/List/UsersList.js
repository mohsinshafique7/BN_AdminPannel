import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import qs from "query-string";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import CoreForm from "../ModalFrom/CoreForm";
import SelectBox from "../ModalFrom/Select";
import { ClearOutlined } from "@ant-design/icons";
import UsersTable from "components/Tables/UsersTable";
import { useGetAllUsers, useCreateUsers, useUpdateUsers } from "../../Requests/UsersRequest";
import { useGetAllCompanies } from "../../Requests/CompanyRequest";
import { usersCreateInputs, usersSelectors } from "../../utils/FormInputs/UsersFormInputs";
import { useHistory } from "react-router-dom";

const UsersList = () => {
  const history = useHistory();
  const [queryParams, setQueryParams] = useState(qs.parse(history.location.search));
  const [clearSelect, setClearSelect] = useState({});
  const [selectData, setSelectData] = useState([]);
  const [formInputs, setFormInputs] = useState(null);
  const { isLoading: companiesIsLoading, data: companiesData, status: companiesStatus } = useGetAllCompanies();
  const { isLoading: usersIsLoading, data: usersData, status: usersStatus } = useGetAllUsers();
  const { mutate: createUser } = useCreateUsers();
  const { mutate: updateUser } = useUpdateUsers("list");

  const { searchValue } = useSelector((state) => {
    return {
      searchValue: state.filters.searchValue,
    };
  });

  useEffect(() => {
    if (!companiesIsLoading && companiesStatus === "success") {
      setFormInputs(usersCreateInputs(companiesData?.companies));
    }
  }, [companiesIsLoading, companiesData, companiesStatus]);

  useEffect(() => {
    console.log(queryParams);
    const queryString = qs.stringify(queryParams);
    history.replace(`/users?${queryString}`);
  }, [queryParams, history]);

  const selectValueSet = (value) => {
    const { company } = value;
    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        company,
      };
    });
  };
  useEffect(() => {
    if (!companiesIsLoading) {
      setSelectData(usersSelectors(queryParams?.company, companiesData?.companies));
    }
  }, [companiesIsLoading, companiesData, queryParams]);

  const initialValue = {
    is_stuff: false,
    sendEmail: false,
  };

  const handleClearSelect = (name) => {
    setClearSelect([name]);
    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        company: "",
      };
    });
  };

  const searchedData = useMemo(() => {
    const search = new RegExp(searchValue, "gi");
    return usersData?.users
      .filter((item) => item.email.match(search) || item.first_name.match(search) || item.last_name.match(search))
      .filter((item) => {
        return queryParams?.company?.length > 0 ? item?.company?.name === queryParams.company : true;
      });
  }, [searchValue, usersData, queryParams]);

  const onSendForm = (values) => {
    createUser(values);
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

  const handleEditUser = async (values) => {
    const id = values.id;
    delete values["id"];
    updateUser({ id, values });
  };
  return (
    <>
      <div data-testid="pageTitle" className="item-title">
        Users
      </div>
      <Search />

      {usersStatus === "success" && formInputs && !usersIsLoading && !companiesIsLoading ? (
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
            {selectData.map((item, index) => (
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

export default UsersList;
