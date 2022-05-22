import React, { useState, useEffect } from "react";
import { Table, Pagination, Switch, Popover, Button } from "antd";
import { Link } from "react-router-dom";
import { FilterFilled } from "@ant-design/icons";
import _ from "lodash";
import styled from "styled-components";
import CoreForm from "components/ModalFrom/CoreForm";
import { CoreProductEditInput } from "../../utils/FormInputs/CoreProductFormInputs";
import { GlobalOutlined } from "@ant-design/icons";
import Loader from "components/Loader/Loader";
import Testscroll from "components/List/Testscroll";
export const Styles = styled.div`
  margin-top: 15px;
  .ant-table-cell {
    padding: 10px;
    vertical-align: middle;
  }

  .pagination-controls {
    display: flex;
    justify-content: center;
    margin-top: 25px;
    padding-bottom: 25px;
  }
`;
const CoreProductsTable = ({
  count,
  data,
  page,
  perPage,
  setPage,
  setPerPage,
  handleCoreProductEdit,
  categoriesData,
  brandsData,
  setCoreImage,
  coreProductFetching,
}) => {
  const [formInputs, setFormInputs] = useState(null);
  useEffect(() => {
    setFormInputs(CoreProductEditInput(brandsData.brands, categoriesData?.categories));
  }, [categoriesData, brandsData]);
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    if (!coreProductFetching) {
      const a = data.map((item) => {
        return {
          key: item.id,
          image: item.image,
          name: item.title,
          ean: item.ean,
          size: item.size,
          category: item?.category?.name,
          brand: item?.productBrand?.name,
          categoryId: item?.category?.id,
          brandId: item?.productBrand?.id,
          invalidEan: item.eanIssues,
          secondaryImages: item.secondaryImages,
          description: item.description,
          features: item.features,
          ingredients: item.ingredients,
          bundled: item.bundled,
          productOptions: item.productOptions,
          reviewed: item.reviewed,
          source: item?.products[0]?.href,
        };
      });
      setDataSource(a);
    }
  }, [coreProductFetching, data]);

  const nameFilter = _.uniq(_.map(dataSource, "name")).map((item) => {
    return { text: item, value: item };
  });

  const categoryFilters = _.uniq(_.map(dataSource, "category")).map((item) => {
    return { text: item, value: item };
  });
  const Forms = ({ record, formInputs }) => {
    if (formInputs) {
      return (
        <CoreForm
          title={"Edit"}
          // className={"core-product"}
          initialValue={{
            id: record.key,
            title: record.name,
            image: record.image,
            ean: record.ean,
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
      );
    }
  };
  const columns = [
    {
      title: "Edit",
      dataIndex: "editUser",
      key: "editUser",
      width: "5%",
      render: (_, record) => <Forms record={record} formInputs={formInputs} />,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: "5%",
      render: (text) => (
        <Popover
          content={
            <div style={{ width: "500px", height: "500px" }}>
              <img width="100%" height="100%" src={`${text}?${+new Date().getTime()}`} alt="product" />
            </div>
          }
          trigger="click"
        >
          <img width="50px" height="50px" src={`${text}?${+new Date().getTime()}`} alt="product" />
        </Popover>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      render: (text, record) => <Link to={`/core-product/${record.key}`}>{text}</Link>,
      sortDirections: ["descend"],
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
      width: "5%",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "25%",
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
      width: "20%",
    },
    {
      title: "Invalid EAN",
      dataIndex: "invalidEan",
      key: "invalidEan",
      width: "5%",
      render: (text) => <Switch defaultChecked={text} disabled />,
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      width: "5%",
      render: (text) => (
        <Link to={{ pathname: text }} target="_blank">
          <GlobalOutlined style={{ fontSize: "1.5rem" }} />
        </Link>
      ),
    },
  ];
  return (
    <Styles>
      {/* {!coreProductFetching ? ( */}
      <>
        <Table dataSource={[...dataSource]} rowClassName="tableRow" columns={[...columns]} pagination={false} />
        <Pagination
          className="pagination-controls"
          total={count * perPage}
          showTotal={(total) => `Total ${total} items`}
          pageSize={perPage}
          current={page}
          onChange={setPage}
          onShowSizeChange={setPerPage}
        />
      </>
      {/* ) : (
        <Loader />
      )} */}
    </Styles>
  );
};

export default CoreProductsTable;
