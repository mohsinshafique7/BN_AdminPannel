import React from "react";
import { Table, Pagination } from "antd";
import { Link } from "react-router-dom";

import { FilterFilled } from "@ant-design/icons";
import moment from "moment";
import styled from "styled-components";

export const Styles = styled.div`
  margin-top: 15px;
  .ant-table-cell {
    padding: 10px;
    vertical-align: middle;
  }

  .pagination-controls {
    display: flex;
    justify-content: center;
    margin-top: 25px;
  }
`;
const CompanyManufacturersTable = ({ data, setPage, setPerPage, page, perPage }) => {
  // const [page, setPage] = useState(1);
  // const [perPage, setPerPage] = useState(10);
  const dataSource = data.map((item) => {
    return {
      key: item.id,
      name: item.name,
      dateCreated: item.createdAt,
    };
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
      width: "15%",
      align: "left",
      render: (text, record) => <Link to={`/manufacturer/${record.key}/page=0&perPage=10`}>{text}</Link>,
      sorter: (a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      },
      // filters: _.orderBy(manufacturerFilters, "text", "asc"),
      onFilter: (value, record) => record.name === value,
      filterSearch: true,
      filterIcon: (filtered) => <FilterFilled style={{ color: filtered ? "#1890ff" : undefined }} />,
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      width: "10%",
      key: "dateCreated",
      render: (text) => moment(text).format("YYYY-MM-DD"),
      filterIcon: (filtered) => <FilterFilled style={{ color: filtered ? "#1890ff" : undefined }} />,
    },
  ];
  return (
    <Styles>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <Pagination
        className="pagination-controls"
        total={dataSource.length}
        showTotal={(total) => `Total ${total} items`}
        pageSize={perPage}
        current={page + 1}
        onChange={setPage}
        onShowSizeChange={setPerPage}
      />
    </Styles>
  );
};

export default CompanyManufacturersTable;
