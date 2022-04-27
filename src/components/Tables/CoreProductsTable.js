import React from "react";
import { Table, Pagination, Switch } from "antd";
import { Link } from "react-router-dom";
import { FilterFilled } from "@ant-design/icons";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import CoreForm from "components/ModalFrom/CoreForm";
import { CoreProductEditInput } from "../../utils/FormInputs";
export const Styles = styled.div`
  margin-top: 15px;

  .pagination-controls {
    display: flex;
    justify-content: center;
    margin-top: 25px;
  }
`;
const CoreProductsTable = ({ count, data, page, perPage, setPage, setPerPage, handleCoreProductEdit, setCoreImage }) => {
  const formInputs = CoreProductEditInput();
  const dataSource = data.map((item) => {
    return {
      key: item.id,
      image: item.image,
      name: item.title,
      size: item.size,
      category: item?.category?.name,
      brand: item?.productBrand?.name,
      categoryId: item?.category?.id,
      brandId: item?.productBrand?.id,
      invalidEan: item.eanIssues,
      dateCreated: item.createdAt,
      secondaryImages: item.secondaryImages,
      description: item.description,
      features: item.features,
      ingredients: item.ingredients,
      bundled: item.bundled,
      productOptions: item.productOptions,
      reviewed: item.reviewed,
    };
  });

  const nameFilter = _.uniq(_.map(dataSource, "name")).map((item) => {
    return { text: item, value: item };
  });

  const categoryFilters = _.uniq(_.map(dataSource, "category")).map((item) => {
    return { text: item, value: item };
  });

  const columns = [
    {
      title: "Edit",
      dataIndex: "editUser",
      key: "editUser",
      width: "5%",
      render: (_, record) => (
        <CoreForm
          title={"Edit Core Product"}
          // className={"core-product"}
          initialValue={{
            id: record.key,
            title: record.name,
            image: record.image,
            secondaryImages: record.secondaryImages,
            description: record.description,
            features: record.features,
            ingredients: record.ingredients,
            bundled: record.bundled,
            brandId: record.brandId,
            categoryId: record.categoryId,
            size: record.size,
            productOptions: record.productOptions,
            reviewed: record.reviewed,
          }}
          selectData={formInputs.selectData}
          inputData={formInputs.inputData}
          areaData={formInputs.areaData}
          switchData={formInputs.switchData}
          uploadData={true}
          handleSetImage={setCoreImage}
          onSendForm={handleCoreProductEdit}
        />
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: "5%",
      render: (text) => <img width="70px" height="70px" src={`${text}?${+new Date().getTime()}`} alt="product" />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "35%",
      render: (text, record) => (
        <Link style={{ fontSize: "1.2rem" }} to={`/core-product/${record.key}`}>
          {text}
        </Link>
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
      filters: _.orderBy(nameFilter, "text", "asc"),
      onFilter: (value, record) => record.name === value,
      filterSearch: true,
      filterIcon: (filtered) => <FilterFilled style={{ color: filtered ? "#1890ff" : undefined }} />,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      width: "10%",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "15%",
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
      width: "15%",
    },
    {
      title: "Invalid EAN",
      dataIndex: "invalidEan",
      key: "invalidEan",
      width: "10%",
      render: (text, record) => <Switch defaultChecked={text} disabled />,
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
      <Table dataSource={dataSource} columns={columns} rowClassName="editable-row" pagination={false} />

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
