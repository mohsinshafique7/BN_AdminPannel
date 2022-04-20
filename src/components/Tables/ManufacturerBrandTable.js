import React, { useMemo } from "react";
import { Table, Pagination } from "antd";
import { Link } from "react-router-dom";
import { FilterFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
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
const ManufacturerBrandTable = ({ data }) => {
  const dataSource = data.map((item) => {
    return {
      key: item.id,
      productName: item.title,
      ean: item.ean,
      dateCreated: item.createdAt,
    };
  });
  const { searchValue } = useSelector((state) => {
    return {
      searchValue: state.filters.searchValue,
    };
  });
  // const brandFilters = _.uniq(_.map(renderData, "name")).map((item) => {
  //   return { text: item, value: item };
  // });

  // const manufacturerFilters = _.uniq(_.map(renderData, "manufacturer")).map((item) => {
  //   return { text: item, value: item };
  // });
  const columns = [
    {
      title: "Core Product",
      dataIndex: "productName",
      key: "productName",
      width: "30%",
      render: (text, record) => <Link to={`/core-product/${record.key}`}>{text}</Link>,
      // sorter: (a, b) => {
      //   if (a.name < b.name) {
      //     return -1;
      //   }
      //   if (a.name > b.name) {
      //     return 1;
      //   }
      //   return 0;
      // },
      // filters: _.orderBy(brandFilters, "text", "asc"),
      // onFilter: (value, record) => record.name === value,
      // filterSearch: true,
      // filterIcon: (filtered) => <FilterFilled style={{ color: filtered ? "#1890ff" : undefined }} />,
    },

    {
      title: "EAN",
      dataIndex: "ean",
      key: "ean",
      width: "20%",
      filterSearch: true,
      // sorter: (a, b) => {
      //   if (a.brand < b.brand) {
      //     return -1;
      //   }
      //   if (a.brand > b.brand) {
      //     return 1;
      //   }
      //   return 0;
      // },
      // filterIcon: (filtered) => <FilterFilled style={{ fontSize: "15px", color: filtered ? "#1890ff" : undefined }} />,
      // filters: _.orderBy(manufacturerFilters, "text", "asc"),
      // onFilter: (value, record) => record.manufacturer === value,
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

  const searchedData = useMemo(() => {
    const search = new RegExp(searchValue, "gi");
    return dataSource.filter((item) => item.productName.match(search) || item.ean.match(search));
  }, [searchValue, dataSource]);
  return (
    <Styles>
      <Table dataSource={searchedData} columns={columns} pagination={{ pageSize: 30, position: ["bottomCenter"] }} />
    </Styles>
  );
};

export default ManufacturerBrandTable;
