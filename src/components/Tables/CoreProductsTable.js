import React from "react";
import { Table, Pagination, Switch } from "antd";
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
const CoreProductsTable = ({ count, data, page, perPage, setPage, setPerPage }) => {
  const dataSource = data.map((item) => {
    return {
      key: item.id,
      edit: "Edit",
      image: item.image,
      title: item.title,
      category: item?.category?.name,
      brand: item?.productBrand?.name,
      invalidEan: item.eanIssues,
      dateCreated: item.createdAt,
    };
  });
  // const limit = page * perPage + perPage < dataSource.length ? page * perPage + perPage : dataSource.length;

  // const renderData = dataSource.slice(page * perPage, limit);

  const titleFilters = _.uniq(_.map(dataSource, "title")).map((item) => {
    return { text: item, value: item };
  });

  const categoryFilters = _.uniq(_.map(dataSource, "category")).map((item) => {
    return { text: item, value: item };
  });
  const onChangePage = (page, pageSize) => {
    setPage(page);
  };
  const setColor = (color) => {
    return { backgroundColor: color, padding: "10px", border: "1px solid green" };
  };
  const onChangeSize = (page, pageSize) => {
    setPerPage(pageSize);
  };
  const columns = [
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <img width="70px" height="70px" src={`${text}?${+new Date().getTime()}`} alt="product" />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Link style={{ fontSize: "1.2rem" }} to={`/core-product/${record.key}`}>
          {text}
        </Link>
      ),
      sorter: (a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      },
      filters: _.orderBy(titleFilters, "text", "asc"),
      onFilter: (value, record) => record.title === value,
      filterSearch: true,
      filterIcon: (filtered) => <FilterFilled style={{ color: filtered ? "#1890ff" : undefined }} />,
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filterSearch: true,
      sorter: (a, b) => {
        if (a.category < b.category) {
          return -1;
        }
        if (a.category > b.category) {
          return 1;
        }
        return 0;
      },
      filterIcon: (filtered) => <FilterFilled style={{ fontSize: "15px", color: filtered ? "#1890ff" : undefined }} />,
      filters: _.orderBy(categoryFilters, "text", "asc"),
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Invalid EAN",
      dataIndex: "invalidEan",
      key: "invalidEan",
      render: (text, record) => <Switch defaultChecked={text} disabled />,
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
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
        total={count * perPage}
        showTotal={(total) => `Total ${total} items`}
        pageSize={perPage}
        current={page}
        onChange={setPage}
        onShowSizeChange={setPerPage}
      />
    </Styles>
  );
};

export default CoreProductsTable;
