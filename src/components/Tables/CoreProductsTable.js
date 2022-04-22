import React from "react";
import { Table, Pagination, Switch, Typography, Popconfirm, Form, InputNumber, Input, Select } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FilterFilled } from "@ant-design/icons";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import { setEditKeyValue } from "../../store/filters/action";
import SelectBox from "components/ModalFrom/SelectBox";
import { getBrands } from "../../store/manufacturersBrands/action";
import Selector from "components/FormItems/Selector";
import NumberInput from "components/FormItems/NumberInput";
import TextInput from "components/FormItems/TextInput";
export const Styles = styled.div`
  margin-top: 15px;

  .pagination-controls {
    display: flex;
    justify-content: center;
    margin-top: 25px;
  }
`;
const CoreProductsTable = ({ count, data, page, perPage, setPage, setPerPage, onSendForm }) => {
  const [form] = Form.useForm();
  const { categories, brands, editingKey } = useSelector((state) => {
    return {
      editingKey: state.filters.editingKey,
      brands: state.manufacturersBrands.brands,
      categories: state.categories.categories,
    };
  });
  console.log(
    "brands",
    brands.find((item) => item.name === "Tesco Finest")
  );
  const dispatch = useDispatch();
  console.log(data);
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
    };
  });

  const nameFilter = _.uniq(_.map(dataSource, "name")).map((item) => {
    return { text: item, value: item };
  });

  const categoryFilters = _.uniq(_.map(dataSource, "category")).map((item) => {
    return { text: item, value: item };
  });
  const cancel = () => {
    dispatch(setEditKeyValue(""));
  };
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      id: record.key,
      name: record.name,
      size: record.size,
      brand: record.brandId,
      category: record.categoryId,
    });
    dispatch(setEditKeyValue(record.key));
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      onSendForm({ ...row, id: editingKey });
      dispatch(setEditKeyValue(""));
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
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
      editable: true,
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
      editable: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "15%",
      editable: true,
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
      editable: true,
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
    {
      title: "Operation",
      dataIndex: "operation",
      width: "10%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Typography.Link>Cancel</Typography.Link>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ""} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
    const inputNode =
      inputType === "size" ? (
        <NumberInput name={dataIndex} />
      ) : inputType === "brand" ? (
        <Selector selector={brands} sort="name" title="name" value="id" name={dataIndex} />
      ) : inputType === "category" ? (
        <Selector selector={categories} sort="name" title="name" value="id" name={dataIndex} />
      ) : (
        <TextInput name={dataIndex} />
      );

    return <td {...restProps}>{editing ? <>{inputNode}</> : children}</td>;
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "size" ? "size" : col.dataIndex === "brand" ? "brand" : col.dataIndex === "category" ? "category" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Styles>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={dataSource}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>

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
