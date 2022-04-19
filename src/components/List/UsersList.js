import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import { getUsers, createUser } from "../../store/users/action";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import CoreForm from "../ModalFrom/CoreForm";
import { getCompanies } from "../../store/companies/action";
import { STATE_STATUSES } from "../../utils/app";
import SelectBox from "../ModalFrom/Select";
import { ClearOutlined } from "@ant-design/icons";
import { notification } from "antd";
import UsersTable from "components/Tables/UsersTable";

const UsersList = (props) => {
  const {
    // getUsers,
    // getCompanies,
    // createUser,
    // users,
    // searchValue,
    match: { params },
    history,
  } = props;
  const { users, status, searchValue } = useSelector((state) => {
    return {
      users: state.users.users,
      status: state.users.status,
      searchValue: state.filters.searchValue,
    };
  });
  const [filterUserData, setFilterUserData] = useState([]);
  const dispatch = useDispatch();

  const inputData = [
    { label: "First Name", name: "first_name", type: "text", required: true },
    { label: "Last Name", name: "last_name", type: "text", required: true },
    { label: "Email", name: "email", type: "email", required: true },
  ];
  const passwordData = [{ label: "Password", name: "password", type: "password", required: true }];

  const selectData = [
    {
      name: "companyId",
      value: "id",
      option: "name",
      action: getCompanies,
      store: "companies",
      lable: "Select company",
      required: true,
      mode: false,
    },
  ];

  const switchData = [
    { label: "Admin", name: "is_stuff", default: false, required: false },
    { label: "Send Email", name: "sendEmail", default: false, required: false },
  ];

  const [queryParams, setQueryParams] = useState(qs.parse(params.param));

  const [clearSelect, setClearSelect] = useState({});

  const selectDataSearch = [{ param: "company", value: "name", option: "name", lable: "Company", initialValue: queryParams.company }];

  const initialValue = {
    is_stuff: false,
    sendEmail: false,
  };

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/users/${queryString}`);
  }, [queryParams, history]);

  useEffect(() => {
    let filterData = users;
    if (queryParams["company"]) {
      filterData = filterData.filter((item) => item?.company?.name === queryParams.company);
    }
    // Object.keys(queryParams).forEach((itemPatam) => {
    //   if (queryParams[itemPatam] && itemPatam !== "page" && itemPatam !== "perPage") {
    //     filterData = filterData.filter((item) => item.company.name === queryParams.company);
    //   }
    // });

    setFilterUserData(filterData);
  }, [queryParams, users]);

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
    return filterUserData.filter((item) => item.email.match(search) || item.first_name.match(search) || item.last_name.match(search));
  }, [searchValue, filterUserData]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const onSendForm = (values) => {
    dispatch(createUser(values)).catch(() => openNotification("error"));
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

  return (
    <>
      <div className="item-title">Users</div>
      <Search />
      <CoreForm
        title={"Create User"}
        initialValue={initialValue}
        selectData={selectData}
        inputData={inputData}
        passwordData={passwordData}
        switchData={switchData}
        onSendForm={onSendForm}
      />
      {status !== STATE_STATUSES.PENDING ? (
        <>
          <div className="wrapper-filter-categoty">
            <div className="title">Filter By:</div>
            {selectDataSearch.map((item, index) => (
              <div key={index} className="select-filter-categoty">
                <SelectBox
                  initialValue={item.initialValue}
                  selectData={selectValueSet}
                  actionParam={item.param}
                  value={item.value}
                  option={item.option}
                  initialId={item.initial}
                  lable={item.lable}
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
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default withRouter(UsersList);
