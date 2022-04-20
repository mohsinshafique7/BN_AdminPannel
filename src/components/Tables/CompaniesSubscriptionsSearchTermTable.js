import React, { useMemo } from "react";
import { Table, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { FilterFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import _ from "lodash";
import { DeleteOutlined } from "@ant-design/icons";
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
const CompaniesSubscriptionsSearchTermTable = ({ data, removeProductGroupCores }) => {
  const dataSource = data.map((item) => {
    return {
      key: item.id,
      productName: item.title,
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
      render: (text, record) => (
        <Popconfirm
          onConfirm={() => removeProductGroupCores({ coreProducts: [record.key] }, record.key)}
          title={`Are you sure you want to delete core product ${record.productName}？`}
          okText="Yes"
          cancelText="No"
        >
          <div className="item-core-product">
            <DeleteOutlined />
            <span>{record.productName}</span>
          </div>
        </Popconfirm>
      ),
    },
  ];

  const searchedData = useMemo(() => {
    const search = new RegExp(searchValue, "gi");
    return dataSource.filter((item) => item.productName.match(search));
  }, [searchValue, dataSource]);
  return (
    <Styles>
      <Table dataSource={searchedData} columns={columns} pagination={{ pageSize: 20, position: ["bottomCenter"] }} />
    </Styles>
  );
};

export default CompaniesSubscriptionsSearchTermTable;
