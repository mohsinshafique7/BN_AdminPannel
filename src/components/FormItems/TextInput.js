import React from "react";
import { Form, Input } from "antd";
const TextInput = ({ name, label, required = true }) => {
  return (
    <Form.Item label={label} name={name} rules={[{ required: required, message: `Please select item!` }]}>
      <Input />
    </Form.Item>
  );
};

export default TextInput;
