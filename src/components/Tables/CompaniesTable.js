import React from "react";
import { Table, Pagination } from "antd";
import { Link } from "react-router-dom";
import { FilterFilled } from "@ant-design/icons";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import { renderTableData, getFilter, CompanyEditInput } from "../../utils/FormInputs";
import CoreForm from "components/ModalFrom/CoreForm";

export const Styles = styled.div`
  margin-top: 15px;

  .pagination-controls {
    display: flex;
    justify-content: center;
    margin-top: 25px;
  }
`;
const CompaniesTable = ({ data, page, perPage, setPage, setPerPage, handleEditCompany }) => {
  const formInputs = CompanyEditInput();
  const dataSource = data.map((item) => {
    return {
      key: item.id,
      name: item.name,
      filtersStartDate: item.filtersStartDate,
    };
  });

  const renderData = renderTableData(page, perPage, dataSource);
  const companiesFilter = getFilter(renderData, "name");

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
            filtersStartDate: record.filtersStartDate ? moment(record.filtersStartDate) : moment(),
            id: record.key,
          }}
          inputData={formInputs.inputData}
          selectDate={formInputs.selectDate}
          onSendForm={handleEditCompany}
        />
      ),
    },
    {
      title: "Name",
      width: "95%",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <Link to={`/company/${record.key}/subscriptions/page=0&perPage=10`}>{text}</Link>,
      sorter: (a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      },
      filters: _.orderBy(companiesFilter, "text", "asc"),
      onFilter: (value, record) => record.name === value,
      filterSearch: true,
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

export default CompaniesTable;
