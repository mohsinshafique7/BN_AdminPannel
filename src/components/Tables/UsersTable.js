import React from "react";
import { Table, Pagination } from "antd";
import { Link } from "react-router-dom";
import { FilterFilled } from "@ant-design/icons";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
export const Styles = styled.div`
  margin-top: 15px;

  .pagination-controls {
    display: flex;
    justify-content: center;
    margin-top: 25px;
  }
`;
const UsersTable = ({ data, page, perPage, setPage, setPerPage }) => {
  const dataSource = data.map((item) => {
    return {
      key: item.id,
      name: item.first_name + " " + item.last_name,
      email: item.email,
      status: item.status,
      company: item?.company?.name,
      dateCreated: item.createdAt,
    };
  });
  const limit = page * perPage + perPage < dataSource.length ? page * perPage + perPage : dataSource.length;

  const renderData = dataSource.slice(page * perPage, limit);

  const nameFilters = _.uniq(_.map(renderData, "name")).map((item) => {
    return { text: item, value: item };
  });

  const emailFilters = _.uniq(_.map(renderData, "email")).map((item) => {
    return { text: item, value: item };
  });
  const companyFilter = _.uniq(_.map(renderData, "company")).map((item) => {
    return { text: item, value: item };
  });
  const onChangePage = (page, pageSize) => {
    setPage(page - 1);
  };

  const onChangeSize = (page, pageSize) => {
    setPerPage(pageSize);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      render: (text, record) => <Link to={`/user/${record.key}`}>{text}</Link>,
      sorter: (a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      },
      filters: _.orderBy(nameFilters, "text", "asc"),
      onFilter: (value, record) => record.name === value,
      filterSearch: true,
      filterIcon: (filtered) => <FilterFilled style={{ color: filtered ? "#1890ff" : undefined }} />,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
      sorter: (a, b) => {
        if (a.email < b.email) {
          return -1;
        }
        if (a.email > b.email) {
          return 1;
        }
        return 0;
      },
      filterMode: "tree",
      filterSearch: true,
      filterIcon: (filtered) => <FilterFilled style={{ color: filtered ? "#1890ff" : undefined }} />,
      filters: _.orderBy(emailFilters, "text", "asc"),

      onFilter: (value, record) => record.email === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      sorter: (a, b) => a.status.length - b.status.length,
      filterIcon: (filtered) => <FilterFilled style={{ color: filtered ? "#1890ff" : undefined }} />,
      filters: [
        { text: "Active", value: "active" },
        { text: "In Active", value: "inactive" },
      ],
      onFilter: (value, record) => record.status.includes(value),
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      width: "20%",
      filterSearch: true,
      sorter: (a, b) => {
        if (a.company < b.company) {
          return -1;
        }
        if (a.company > b.company) {
          return 1;
        }
        return 0;
      },
      filterIcon: (filtered) => <FilterFilled style={{ fontSize: "15px", color: filtered ? "#1890ff" : undefined }} />,
      filters: _.orderBy(companyFilter, "text", "asc"),
      onFilter: (value, record) => record.company === value,
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
      width: "20%",
      render: (text) => moment(text).format("YYYY-MM-DD hh:mm"),
      filterIcon: (filtered) => <FilterFilled style={{ color: filtered ? "#1890ff" : undefined }} />,
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

export default UsersTable;
