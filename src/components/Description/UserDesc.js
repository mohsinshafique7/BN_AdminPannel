import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, deleteUser, editUser, resetPassword, getUserHistory } from "../../store/users/action";
import { getSourceCategories, setSelectSourceCategories } from "../../store/sourceCategories/action";
import { getUserSourceCategories, deleteUserSourceCategory, createUserSourceCategory } from "../../store/userSourceCategories/action";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { Switch, Popconfirm, Button, Pagination, Empty } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CoreForm from "../ModalFrom/CoreForm";
import { getCompanies } from "../../store/companies/action";
import { CoreListStyles } from "../List/style";

const UserDesc = ({
  // getUser,
  // deleteUser,
  // getUserSourceCategories,
  // deleteUserSourceCategory,
  // getUserHistory,
  // createUserSourceCategory,
  // getCompanies,
  // editUser,
  // resetPassword,
  // getSourceCategories,
  // setSelectSourceCategories,
  // getUser,
  // deleteUser,
  // setSelectSourceCategories,
  // deleteUserSourceCategory,
  // createUserSourceCategory,
  // getUserSourceCategories,
  // userSourceCategories,
  // getCompanies,
  // resetPassword,
  // editUser,
  // getSourceCategories,
  // getUserHistory,
  // userHistory,
  // user: { createdAt, updatedAt, first_name, last_name, email, status, is_stuff, company, companyId, id },
  history,
  match: { params },
}) => {
  const { userSourceCategories, user, userHistory } = useSelector((state) => {
    return {
      userSourceCategories: state.userSourceCategories.userSourceCategories,
      user: state.users.user,
      userHistory: state.users.userHistory,
    };
  });
  const { createdAt, updatedAt, first_name, last_name, email, status, is_stuff, company, companyId, id } = user;
  const dispatch = useDispatch();
  const inputData = [
    { label: "First Name", name: "first_name", type: "text", required: true },
    { label: "Last Name", name: "last_name", type: "text", required: true },
    { label: "Email", name: "email", type: "email", required: true },
  ];

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
    { name: "status", value: "name", option: "name", store: "userStatus", lable: "Change status", required: true, mode: false },
  ];

  const switchData = [{ label: "Admin", name: "is_stuff", default: is_stuff, required: false }];

  const initialValue = { first_name, last_name, email, companyId, is_stuff, status };

  const passwordData = [{ label: "Password", name: "password", type: "password", required: true }];

  const sourceData = [
    {
      name: "sourceCategoryId",
      value: "id",
      option: "name",
      store: "selectSourceCategories",
      lable: "Select source category",
      required: true,
      mode: false,
    },
  ];

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [page2, setPage2] = useState(0);
  const [perPage2, setPerPage2] = useState(10);

  const [postParams, setPostParams] = useState({ page, perPage });

  const onChangePage2 = (page, pageSize) => {
    setPage2(page - 1);
  };

  const onChangePerPage2 = (page, pageSize) => {
    setPerPage2(pageSize);
  };

  useEffect(() => {
    dispatch(getSourceCategories()).then(() =>
      dispatch(getUser(params.id)).then((response) => {
        const userSourceCategories = response.data.user.sourceCategory;

        const ids = userSourceCategories ? userSourceCategories.map((item) => item.id) : [];

        dispatch(setSelectSourceCategories({ ids }));
      })
    );
  }, [getUser, params.id]);

  useEffect(() => {
    dispatch(getUserHistory(params.id, postParams));
  }, [getUserHistory, params.id, postParams]);

  useEffect(() => {
    if (id) {
      dispatch(getUserSourceCategories(id));
    }
  }, [getUserSourceCategories, id]);

  const limit = page2 * perPage2 + perPage2 < userSourceCategories.length ? page2 * perPage2 + perPage2 : userSourceCategories.length;

  const renderData = userSourceCategories.slice(page2 * perPage2, limit);

  const onChangePage = (page, pageSize) => {
    setPage(page);
    setPostParams((postParams) => {
      return {
        ...postParams,
        page,
      };
    });
  };

  const onChangePerPage = (page, perPage) => {
    setPerPage(perPage);
    setPostParams((postParams) => {
      return {
        ...postParams,
        perPage,
      };
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id)).then(() => history.push("/users/page=0&perPage=10"));
  };

  const onSendForm = (values) => {
    dispatch(editUser(id, values));
  };

  const handleResetPassword = (values) => {
    dispatch(resetPassword(id, values));
  };

  const addSourceCategory = (values) => {
    const data = {};
    Object.assign(data, values, { userId: id });

    dispatch(createUserSourceCategory(data));
  };

  return (
    <CoreListStyles>
      <div className="item-title">User Details</div>
      <div className="item-wrapper">
        <div className="description-box" style={{ width: "80%" }}>
          <div className="title-item-desc">
            Created At: <span>{moment(createdAt).format("MMMM Do YYYY, h:mm")}</span>
          </div>
          <div className="title-item-desc">
            Updated At: <span>{moment(updatedAt).format("MMMM Do YYYY, h:mm")}</span>
          </div>
          <div className="title-item-desc">
            First name: <span>{first_name}</span>
          </div>
          <div className="title-item-desc">
            Last name: <span>{last_name}</span>
          </div>
          <div className="title-item-desc">
            Email: <span>{email}</span>
          </div>
          <div className="title-item-desc">
            Status: <span>{status}</span>
          </div>
          <div className="title-item-desc">
            Company: <span>{company && company.name}</span>
          </div>
          <div className="title-item-desc">
            Admin: <Switch disabled checked={is_stuff} />
          </div>

          {userSourceCategories.length ? (
            <>
              <div className="title-item-desc">
                User Source Category:
                {/* {
                                userSourceCategories.map(item =>
                                    <Popconfirm
                                        key={item.id}
                                        onConfirm={() => deleteUserSourceCategory(id, item.id)}
                                        title={`Are you sure you want to delete source category ${item.name}？`} okText="Yes" cancelText="No">
                                        <span className="item-value" >{item.name}</span>
                                    </Popconfirm>)

                            } */}
              </div>
              <div className="table-wrapper-box">
                <div className="item-box header">
                  <div className="item-path">Name</div>
                </div>
                {renderData.map((item, index) => (
                  <div key={index} className="item-box">
                    <div className="item-path">{item.name}</div>
                    <Popconfirm
                      key={item.id}
                      onConfirm={() => dispatch(deleteUserSourceCategory(id, item.id))}
                      title={`Are you sure you want to delete source category ${item.name}？`}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined />
                    </Popconfirm>
                  </div>
                ))}
              </div>
              <Pagination
                className="pagination-controls"
                total={userSourceCategories.length}
                showTotal={(total) => `Total ${total} items`}
                pageSize={perPage2}
                defaultCurrent={1}
                onChange={onChangePage2}
                onShowSizeChange={onChangePerPage2}
              />
            </>
          ) : null}
        </div>
        <div className="controls-box">
          <Popconfirm
            onConfirm={() => handleDelete(id)}
            title={`Are you sure you want to delete user ${first_name} ${last_name}？`}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
          <CoreForm
            title={"Edit User"}
            initialValue={initialValue}
            selectData={selectData}
            inputData={inputData}
            switchData={switchData}
            onSendForm={onSendForm}
          />

          <CoreForm title={"Reset Password"} passwordData={passwordData} onSendForm={handleResetPassword} />

          <CoreForm title={"Add Source Category"} selectData={sourceData} onSendForm={addSourceCategory} />
        </div>
      </div>
      <div>
        {userHistory.rows && userHistory.rows.length ? (
          <>
            <div className="item-title history">User History</div>
            <div className="table-wrapper-box">
              <div className="item-box header">
                <div className="item-path">Path</div>
                <div className="item-date">Time</div>
              </div>
              {userHistory.rows.map((item, index) => (
                <div key={index} className="item-box">
                  <div className="item-path">{item.path}</div>
                  <div className="item-date">{moment(item.createdAt).format("MMMM Do YYYY, h:mm")}</div>
                </div>
              ))}
            </div>
            <Pagination
              className="pagination-controls"
              total={userHistory.count * perPage}
              showTotal={(total) => `Total ${total} items`}
              pageSize={perPage}
              current={page}
              onChange={onChangePage}
              onShowSizeChange={onChangePerPage}
            />
          </>
        ) : (
          <>
            <div className="item-title history">User History</div>
            <div className="empty-item">
              <Empty />
            </div>
          </>
        )}
      </div>
    </CoreListStyles>
  );
};

export default withRouter(UserDesc);
