import React from "react";
import { Select, Form } from "antd";
const Selector = ({ selector, title, sort, value, name, label, required = true, defaultValue }) => {
  const { Option } = Select;
  return (
    <Form.Item label={label} name={name} rules={[{ required: required, message: `Please select item!` }]}>
      <Select
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {selector
          .sort((a, b) => {
            if (a[sort].toLowerCase() < b[sort].toLowerCase()) {
              return -1;
            }
            if (a[sort].toLowerCase() > b[sort].toLowerCase()) {
              return 1;
            }
            return 0;
          })
          .map((item, index) => (
            <Option key={index} value={item[value]}>
              {item[title]}
            </Option>
          ))}
      </Select>
    </Form.Item>
  );
};

export default Selector;
