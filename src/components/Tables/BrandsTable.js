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
const BrandsTable = ({ data, page, perPage, setPage, setPerPage }) => {
  const dataSource = data.map((item) => {
    return {
      key: item.id,
      name: item.name,
      parentBrand: item?.parent?.name,
      manufacturer: item?.manufacture?.name,
      manufacturerId: item?.manufacture?.id,
      color: item.color,
      productCount: item.productCount,
      dateCreated: item.createdAt,
    };
  });
  const limit = page * perPage + perPage < dataSource.length ? page * perPage + perPage : dataSource.length;

  const renderData = dataSource.slice(page * perPage, limit);

  const brandFilters = _.uniq(_.map(renderData, "name")).map((item) => {
    return { text: item, value: item };
  });

  const manufacturerFilters = _.uniq(_.map(renderData, "manufacturer")).map((item) => {
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
      width: "30%",
      render: (text, record) => (
        <Link to={`/brand/${record.key}/brand/page=0&perPage=10`}>{record.parentBrand ? `${record.parentBrand} / ${text}` : text}</Link>
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
      filters: _.orderBy(brandFilters, "text", "asc"),
      onFilter: (value, record) => record.name === value,
      filterSearch: true,
      filterIcon: (filtered) => <FilterFilled style={{ color: filtered ? "#1890ff" : undefined }} />,
    },

    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
      key: "manufacturer",
      width: "20%",
      filterSearch: true,
      render: (text, record) => <Link to={`/manufacturer/${record.manufacturerId}/page=0&perPage=10`}>{text}</Link>,
      sorter: (a, b) => {
        if (a.brand < b.brand) {
          return -1;
        }
        if (a.brand > b.brand) {
          return 1;
        }
        return 0;
      },
      filterIcon: (filtered) => <FilterFilled style={{ fontSize: "15px", color: filtered ? "#1890ff" : undefined }} />,
      filters: _.orderBy(manufacturerFilters, "text", "asc"),
      onFilter: (value, record) => record.manufacturer === value,
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      width: "10%",
      render: (text, record) => <span style={setColor(text)}></span>,
    },
    {
      title: "Product Count",
      dataIndex: "productCount",
      key: "productCount",
      width: "10%",
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
      <h2>Hello</h2>
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

export default BrandsTable;
