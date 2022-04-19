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
const RetailerTable = ({ data, page, perPage, setPage, setPerPage }) => {
  const dataSource = data.map((item) => {
    return {
      key: item.id,
      name: item.name,
      color: item.color,
      dateCreated: item.createdAt,
    };
  });
  const limit = page * perPage + perPage < dataSource.length ? page * perPage + perPage : dataSource.length;

  const renderData = dataSource.slice(page * perPage, limit);

  const retailerFilters = _.uniq(_.map(renderData, "name")).map((item) => {
    return { text: item, value: item };
  });

  const onChangePage = (page, pageSize) => {
    setPage(page - 1);
  };
  const setColor = (color) => {
    return { backgroundColor: color, padding: "10px", border: "1px solid green" };
  };
  const onChangeSize = (page, pageSize) => {
    setPerPage(pageSize);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "70%",
      render: (text, record) => <Link to={`/retailer/${record.key}`}>{text}</Link>,
      sorter: (a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      },
      filters: _.orderBy(retailerFilters, "text", "asc"),
      onFilter: (value, record) => record.name === value,
      filterSearch: true,
      filterIcon: (filtered) => <FilterFilled style={{ color: filtered ? "#1890ff" : undefined }} />,
    },

    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      width: "10%",
      render: (text, record) => <span style={setColor(text)}></span>,
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
      width: "20%",
      render: (text) => moment(text).format("YYYY-MM-DD"),
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

export default RetailerTable;
