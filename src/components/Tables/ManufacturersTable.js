import React from "react";
import { Table, Pagination } from "antd";
import { Link } from "react-router-dom";
import { FilterFilled } from "@ant-design/icons";
import _ from "lodash";
import moment from "moment";
import CoreForm from "components/ModalFrom/CoreForm";
import styled from "styled-components";
import { renderTableData, getFilter, setColor } from "../../utils/helpers";
import { manufacturerEditInputs } from "../../utils/FormInputs/ManufacturerFormInputs";

export const Styles = styled.div`
  margin-top: 15px;

  .pagination-controls {
    display: flex;
    justify-content: center;
    margin-top: 25px;
  }
`;
const ManufacturersTable = ({ data, page, perPage, setPage, setPerPage, handleEditManufacturer }) => {
  const formInputs = manufacturerEditInputs();
  const dataSource = data.map((item) => {
    return {
      key: item.id,
      name: item.name,
      brand: item?.brands?.map((i) => {
        return { name: i.name, id: i.id };
      }),
      color: item.color,
      dateCreated: item.createdAt,
    };
  });

  const renderData = renderTableData(page, perPage, dataSource);

  const manufacturerFilters = getFilter(renderData, "name");

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
            name: record.name,
            color: record.color,
            id: record.key,
          }}
          inputData={formInputs.inputData}
          onSendForm={handleEditManufacturer}
        />
      ),
    },
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
      filters: _.orderBy(manufacturerFilters, "text", "asc"),
      onFilter: (value, record) => record.name === value,
      filterSearch: true,
      filterIcon: (filtered) => <FilterFilled style={{ color: filtered ? "#1890ff" : undefined }} />,
    },

    {
      title: "Brand",
      dataIndex: "brand",
      width: "60%",
      key: "brand",
      render: (text, record) =>
        text.map((i, index) => (
          <Link key={index} to={`/brand/${i.id}/brand/page=0&perPage=10`}>
            {index !== 0 ? i.name + " / " : i.name}
          </Link>
        )),
    },
    {
      title: "Color",
      dataIndex: "color",
      width: "10%",
      key: "color",
      render: (text, record) => <span style={setColor(text)}></span>,
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

export default ManufacturersTable;
