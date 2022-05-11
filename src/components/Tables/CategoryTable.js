import React, { useState, useEffect } from "react";
import { Table, Pagination, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { FilterFilled } from "@ant-design/icons";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import CoreForm from "components/ModalFrom/CoreForm";
import { useGetAllCategories } from "../../Requests/CategoryRequest";
import { setColor, renderTableData, getFilter } from "../../utils/helpers";
import { categoryEditInput } from "../../utils/FormInputs/CategoryFormInputs";

export const Styles = styled.div`
  margin-top: 15px;

  .pagination-controls {
    display: flex;
    justify-content: center;
    margin-top: 25px;
  }
`;
const CategoryTable = ({ changeSubscription, data, page, perPage, setPage, setPerPage, handleCategoryEdit, showEdit = true }) => {
  const { isLoading: categoriesIsLoading, data: categoriesData } = useGetAllCategories();
  const [formInputs, setFormInputs] = useState(null);
  useEffect(() => {
    if (!categoriesIsLoading) {
      setFormInputs(categoryEditInput(categoriesData.categories));
    }
  }, [categoriesIsLoading, categoriesData]);

  const dataSource = data.map((item) => {
    return {
      key: item.id,
      categoryId: item.categoryId,
      name: item.name,
      breadCrumb: item.breadcrumbs,
      subscription: item.status.subscription,
      pricePer: item.pricePer,
      measuringUnit: item.measurementUnit,
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
      dataIndex: "edit",
      key: "edit",
      width: "5%",
      visible: false,
      render: (_, record) =>
        !categoriesIsLoading && formInputs ? (
          <CoreForm
            title={"Edit"}
            // categorySelect={true}
            initialValue={{
              id: record.key,
              name: record.name,
              color: record.color,
              categoryId: record.categoryId,
              subscription: record.subscription,
              pricePer: record.pricePer,
              measurementUnit: record.measurementUnit,
            }}
            inputData={formInputs.inputData}
            selectData={formInputs.selectData}
            switchData={formInputs.switchData}
            onSendForm={handleCategoryEdit}
          />
        ) : null,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
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
      width: "30%",
      render: (text) => moment(text).format("YYYY-MM-DD hh:mm"),
      filterIcon: (filtered) => <FilterFilled style={{ color: filtered ? "#1890ff" : undefined }} />,
    },
  ].filter((item) => {
    if (!showEdit) {
      return item.key !== "edit";
    } else {
      return true;
    }
  });

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
