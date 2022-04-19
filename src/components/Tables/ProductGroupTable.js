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
const ProductGroupTable = ({ data, page, perPage, setPage, setPerPage }) => {
  const dataSource = data.map((item) => {
    return {
      key: item.id,
      name: item.name,
      user: item?.user?.first_name && item?.user?.last_name && item?.user?.first_name + " " + item?.user?.last_name,
      userId: item?.user?.id,
      company: item?.company?.name,
      companyId: item?.company?.id,
      coreProduct: item.coreProduct.length,
      // coreProducts: item.coreProduct,
      // children:
      //   item.coreProduct.length > 0
      //     ? item.coreProduct.map((itm) => {
      //         return {
      //           key: itm.id,
      //           name: itm.title,
      //           render: (text) => <Link to={"/home"}>{text.name}</Link>,
      //         };
      //       })
      //     : null,
      dateCreated: item.createdAt,
    };
  });

  const limit = page * perPage + perPage < dataSource.length ? page * perPage + perPage : dataSource.length;

  const renderData = dataSource.slice(page * perPage, limit);

  const productFilters = _.uniq(_.map(renderData, "name")).map((item) => {
    return { text: item, value: item };
  });

  const usersFilter = _.uniq(_.map(renderData, "user")).map((item) => {
    return { text: item, value: item };
  });
  const compnayFilter = _.uniq(_.map(renderData, "company")).map((item) => {
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
      width: "20%",
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
      <Table
        dataSource={renderData}
        columns={columns}
        pagination={false}
        // expandable={{
        //   expandedRowRender: (record) => <p style={{ backgroundColor: "" }}>{record.name}</p>,
        //   rowExpandable: (record) => record.name !== "Not Expandable",
        // }}
      />
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
