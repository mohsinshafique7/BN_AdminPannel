import React, { useState, useEffect } from "react";
import { Table, Pagination } from "antd";
import { Link } from "react-router-dom";
import { FilterFilled } from "@ant-design/icons";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import { setColor, getFilter, renderTableData } from "../../utils/helpers";
import { brandsEditInputs } from "../../utils/FormInputs/BrandFormInputs";

import CoreForm from "components/ModalFrom/CoreForm";
import { useGetAllManufacturers } from "../../Requests/ManufacturerRequest";
import { useGetAllBrands } from "../../Requests/BrandRequest";
export const Styles = styled.div`
  margin-top: 15px;

  .pagination-controls {
    display: flex;
    justify-content: center;
    margin-top: 25px;
  }
`;
const BrandsTable = ({ data, page, perPage, setPage, setPerPage, onFinishEdit }) => {
  const { isLoading: brandsIsLoading, data: brandsData } = useGetAllBrands();

  const { isLoading: manufacturerIsLoading, data: manufacturerData } = useGetAllManufacturers();
  const [formInputs, setFormInputs] = useState(null);
  useEffect(() => {
    if (!manufacturerIsLoading && !brandsIsLoading) {
      setFormInputs(brandsEditInputs(manufacturerData?.manufacturers, brandsData?.brands));
    }
  }, [brandsIsLoading, brandsData, manufacturerData, manufacturerIsLoading]);
  const dataSource = data.map((item) => {
    return {
      key: item.id,
      name: item.name,
      parentBrand: item?.parent?.name,
      parentBrandId: item?.parent?.id,
      manufacturer: item?.manufacture?.name,
      manufacturerId: item?.manufacture?.id,
      color: item.color,
      productCount: item.productCount,
      dateCreated: item.createdAt,
    };
  });

  const renderData = renderTableData(page, perPage, dataSource);

  const brandFilters = getFilter(renderData, "name");

  const manufacturerFilters = getFilter(renderData, "manufacturer");

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
      render: (_, record) =>
        formInputs ? (
          <CoreForm
            title={"Edit"}
            initialValue={{
              name: record.name,
              brandId: record.parentBrandId,
              color: record.color,
              manufacturerId: record.manufacturerId,
              id: record.key,
            }}
            selectData={formInputs.selectData}
            inputData={formInputs.inputData}
            brandSelect={true}
            onSendForm={onFinishEdit}
          />
        ) : null,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
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
      width: "20%",
      render: (text, record) => <span style={setColor(text)}></span>,
    },
    {
      title: "Product Count",
      dataIndex: "productCount",
      key: "productCount",
      width: "20%",
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
