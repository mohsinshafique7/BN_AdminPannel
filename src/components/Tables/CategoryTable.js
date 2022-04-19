import React from "react";
import { Table, Pagination, Checkbox } from "antd";
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
const CategoryTable = ({ changeSubscription, data, page, perPage, setPage, setPerPage }) => {
  const dataSource = data.map((item) => {
    return {
      key: item.id,
      name: item.name,
      breadCrumb: item.breadcrumbs,
      subscription: item.status.subscription,
      pricePer: item.pricePer ? item.pricePer : "-",
      measuringUnit: item.measurementUnit ? item.measurementUnit : "-",
      color: item.color,
      dateCreated: item.createdAt,
    };
  });
  console.log(data);
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
      width: "40%",
      render: (text, record) => <Link to={`/category/${record.key}/page=0&perPage=10`}>{text}</Link>,
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
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
      width: "20%",
      render: (text, record) => (
        <Checkbox
          defaultChecked={text}
          onChange={() => {
            changeSubscription(data.filter((i) => i.id === record.key));
            // console.log(record.key, e.target.checked);
          }}
        >
          Subscription
        </Checkbox>
      ),
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
      title: "Price per",
      dataIndex: "pricePer",
      key: "pricePer",
      width: "10%",
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
      title: "Measurement Unit",
      dataIndex: "measuringUnit",
      key: "measuringUnit",
      width: "10%",
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
      width: "10%",
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

export default CategoryTable;
