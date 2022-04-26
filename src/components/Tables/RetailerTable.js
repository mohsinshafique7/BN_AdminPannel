import React from "react";
import { Table, Pagination } from "antd";
import { Link } from "react-router-dom";
import { FilterFilled } from "@ant-design/icons";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import CoreForm from "components/ModalFrom/CoreForm";
import { retailerEditInput, renderTableData, getFilter, setColor } from "../../utils/FormInputs";
export const Styles = styled.div`
  margin-top: 15px;

  .pagination-controls {
    display: flex;
    justify-content: center;
    margin-top: 25px;
  }
`;
const RetailerTable = ({ data, page, perPage, setPage, setPerPage, handleEditRetailer }) => {
  const formInputs = retailerEditInput();
  const dataSource = data.map((item) => {
    return {
      key: item.id,
      name: item.name,
      color: item.color,
      dateCreated: item.createdAt,
    };
  });
  const renderData = renderTableData(page, perPage, dataSource);
  const retailerFilters = getFilter(renderData, "name");
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
      render: (_, record) => (
        <CoreForm
          title={"Edit"}
          initialValue={{
            color: record.color,
            id: record.key,
          }}
          inputData={formInputs.inputData}
          onSendForm={handleEditRetailer}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "75%",
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
