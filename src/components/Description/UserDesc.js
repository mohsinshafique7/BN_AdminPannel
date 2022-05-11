import React, { useState, useEffect } from "react";
import moment from "moment";
import { Switch, Popconfirm, Button } from "antd";
import Loader from "../Loader/Loader";
import CoreForm from "../ModalFrom/CoreForm";
import { CoreListStyles } from "../List/style";
import { useGetSingleUser, useDeleteUsers, useUpdateUsers, useResetUserPassword, useGetAllUsers } from "../../Requests/UsersRequest";
import { useGetAllCompanies } from "../../Requests/CompanyRequest";
import { usersEditInputs } from "../../utils/FormInputs/UsersFormInputs";
import UsersHistoryTable from "../../components/Tables/UsersHistoryTable";
import SearchInput from "components/Search/Search";
import { useParams, useHistory } from "react-router-dom";
const UserDesc = () => {
  const { id: paramId } = useParams();
  const history = useHistory();
  const { isLoading: userIsLoading, data: usersData } = useGetSingleUser(paramId);
  const { isLoading: usersIsLoading } = useGetAllUsers();
  const { mutate: deleteUser } = useDeleteUsers(history, paramId);
  const { mutate: resetUserPassword } = useResetUserPassword();
  const { isLoading: companiesIsLoading, data: companiesData } = useGetAllCompanies();
  const { mutate: updateUser } = useUpdateUsers("single");
  const [formInputs, setFormInputs] = useState(null);
  useEffect(() => {
    if (!companiesIsLoading) {
      setFormInputs(usersEditInputs(companiesData?.companies));
    }
  }, [companiesIsLoading, companiesData]);

  const passwordData = [{ label: "Password", name: "password", type: "password", required: true }];

  const handleDelete = () => {
    deleteUser();
  };

  const onSendForm = (values) => {
    const id = values.id;
    delete values["id"];
    updateUser({ id, values });
  };

  const handleResetPassword = (values) => {
    resetUserPassword({ id: paramId, values });
  };
  return (
    <CoreListStyles>
      <div data-testid="pageTitle" className="item-title">
        User Details
      </div>
      <SearchInput />
      {formInputs && !userIsLoading && !companiesIsLoading && !usersIsLoading ? (
        <>
          <div className="title-item-desc">asd</div>
          <div className="item-wrapper">
            <div className="description-box" style={{ width: "80%" }}>
              <div className="title-item-desc">
                Created At: <span>{moment(usersData?.user.createdAt).format("MMMM Do YYYY, h:mm")}</span>
              </div>
              <div className="title-item-desc">
                Updated At: <span>{moment(usersData?.user.updatedAt).format("MMMM Do YYYY, h:mm")}</span>
              </div>
              <div className="title-item-desc">
                First name: <span>{usersData?.user.first_name}</span>
              </div>
              <div className="title-item-desc">
                Last name: <span>{usersData?.user.last_name}</span>
              </div>
              <div className="title-item-desc">
                Email: <span>{usersData?.user.email}</span>
              </div>
              <div className="title-item-desc">
                Status: <span>{usersData?.user.status}</span>
              </div>
              <div className="title-item-desc">
                Company: <span>{usersData?.user?.company?.name}</span>
              </div>
              <div className="title-item-desc">
                Admin: <Switch disabled checked={usersData?.user.is_stuff} />
              </div>
            </div>
            <div className="controls-box">
              <Popconfirm
                onConfirm={() => handleDelete()}
                title={`Are you sure you want to delete user ${usersData?.user.first_name} ${usersData?.user.last_name}？`}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger>
                  Delete
                </Button>
              </Popconfirm>
              <CoreForm
                title={"Edit User"}
                initialValue={{
                  id: paramId,
                  first_name: usersData?.user.first_name,
                  last_name: usersData?.user.last_name,
                  email: usersData?.user.email,
                  companyId: usersData?.user?.companyId,
                  is_stuff: usersData?.user.is_stuff,
                  status: usersData?.user.status,
                }}
                selectData={formInputs.selectData}
                inputData={formInputs.inputData}
                switchData={formInputs.switchData}
                onSendForm={onSendForm}
              />
              <CoreForm title={"Reset Password"} passwordData={passwordData} onSendForm={handleResetPassword} />
            </div>
          </div>
          <div>{/* <UsersHistoryTable id={paramId} /> */}</div>
        </>
      ) : (
        <Loader />
      )}
    </CoreListStyles>
  );
};

export default UserDesc;
