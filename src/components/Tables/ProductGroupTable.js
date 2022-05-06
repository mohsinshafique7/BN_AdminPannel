import React, { useState, useEffect } from "react";
import { Table, Pagination } from "antd";
import { Link } from "react-router-dom";
import { FilterFilled } from "@ant-design/icons";
import _ from "lodash";
import styled from "styled-components";
import CoreForm from "components/ModalFrom/CoreForm";
import { useGetAllUsers } from "../../Requests/UsersRequest";
import { useGetAllCompanies } from "../../Requests/CompanyRequest";
import { CustomGroupEditInput } from "../../utils/FormInputs/CustomGroupFormInputs";
import { renderTableData, getFilter } from "../../utils/helpers";

export const Styles = styled.div`
  margin-top: 15px;

  .pagination-controls {
    display: flex;
    justify-content: center;
    margin-top: 25px;
  }
`;
const ProductGroupTable = ({ data, page, perPage, setPage, setPerPage, handleProductGroupEdit }) => {
  const { isLoading: usersIsLoading, data: usersData } = useGetAllUsers();
  const { isLoading: companiesIsLoading, data: companiesData } = useGetAllCompanies();
  const [formInputs, setFormInputs] = useState(null);
  useEffect(() => {
    if (!usersIsLoading && !companiesIsLoading) {
      setFormInputs(CustomGroupEditInput(usersData?.users, companiesData?.companies));
    }
  }, [usersIsLoading, usersData, companiesIsLoading, companiesData]);
  const dataSource = data.map((item) => {
    return {
      key: item.id,
      name: item.name,
      user: item?.user?.first_name && item?.user?.last_name && item?.user?.first_name + " " + item?.user?.last_name,
      userId: item?.user?.id,
      company: item?.company?.name,
      companyId: item?.company?.id,
      coreProduct: item.coreProduct.length,
    };
  });

  const renderData = renderTableData(page, perPage, dataSource);
  const productFilters = getFilter(renderData, "name");
  const usersFilter = getFilter(renderData, "user");
  const compnayFilter = getFilter(renderData, "company");
  const onChangePage = (page, pageSize) => {
    setPage(page - 1);
  };

  const onChangeSize = (page, pageSize) => {
    setPerPage(pageSize);
  };

  const columns = [
    {
      title: "Edit",
      dataIndex: "editUser",
      key: "editUser",
      width: "5%",
      render: (_, record) =>
        formInputs && !companiesIsLoading && !usersIsLoading ? (
          <CoreForm
            title={"Edit"}
            initialValue={{
              name: record.name,
              userId: record.userId,
              companyId: record.companyId,
              id: record.key,
            }}
            inputData={formInputs.inputData}
            selectData={formInputs.selectData}
            onSendForm={handleProductGroupEdit}
          />
        ) : null,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "40%",
      render: (text, record) => <Link to={`/product-group/${record.key}`}>{text}</Link>,
      sorter: (a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      },
      filters: _.orderBy(productFilters, "text", "asc"),
      onFilter: (value, record) => record.name === value,
      filterSearch: true,
      filterIcon: (filtered) => <FilterFilled style={{ color: filtered ? "#1890ff" : undefined }} />,
    },

    {
      title: "User",
      dataIndex: "user",
      key: "user",
      width: "25%",
      filterSearch: true,
      render: (text, record) => <Link to={`/user/${record.userId}`}>{text}</Link>,
      sorter: (a, b) => {
        if (a.user < b.user) {
          return -1;
        }
        if (a.user > b.user) {
          return 1;
        }
        return 0;
      },
      filterIcon: (filtered) => <FilterFilled style={{ fontSize: "15px", color: filtered ? "#1890ff" : undefined }} />,
      filters: _.orderBy(usersFilter, "text", "asc"),
      onFilter: (value, record) => record.user === value,
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      width: "20%",
      filters: _.orderBy(compnayFilter, "text", "asc"),
      onFilter: (value, record) => record.company === value,
      render: (text, record) => <Link to={`/company/${record.companyId}/subscriptions/page=0&perPage=10`}>{text}</Link>,
    },
    {
      title: "Core products",
      dataIndex: "coreProduct",
      key: "coreProduct",
      width: "10%",
    },
  ];

  return (
    <Styles>
      <Table dataSource={renderData} columns={columns} pagination={false} />
      <Pagination
        className="pagination-controls"
        total={dataSource.length}
        showTotal={(total) => `Total ${total} items`}
        pageSize={perPage}
        current={page + 1}
        onChange={onChangePage}
        onShowSizeChange={onChangeSize}
      />
    </Styles>
  );
};

export default ProductGroupTable;
