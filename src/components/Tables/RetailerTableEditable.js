import React, { useState } from "react";
import { Table, Pagination, Form, InputNumber, Input, Typography, Popconfirm } from "antd";
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
const RetailerTableEditable = ({ data, page, perPage, setPage, setPerPage }) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const dataSource = data.map((item) => {
    return {
      key: item.id,
      name: item.name,
      color: item.color,
      dateCreated: item.createdAt,
    };
  });
  const limit = page * perPage + perPage < dataSource.length ? page * perPage + perPage : dataSource.length;

  const renderData = dataSource.slice(page * perPage, limit);

  const retailerFilters = _.uniq(_.map(renderData, "name")).map((item) => {
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
  const cancel = () => {
    setEditingKey("");
  };
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    console.log(record);
    form.setFieldsValue({
      name: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      console.log(row);
      // const index = newData.findIndex((item) => key === item.key);
      setEditingKey("");
      // if (index > -1) {
      //   const item = newData[index];
      //   newData.splice(index, 1, { ...item, ...row });
      //   setData(newData);
      //   setEditingKey('');
      // } else {
      //   newData.push(row);
      //   setData(newData);
      //   setEditingKey('');
      // }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "60%",
      editable: true,
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
      width: "20%",
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
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "text",
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
          dataSource={renderData}
          columns={mergedColumns}
          pagination={false}
          rowClassName="editable-row"
        />
      </Form>
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

export default RetailerTableEditable;
