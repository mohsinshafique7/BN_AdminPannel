import React, { useState, useEffect } from "react";
import { Select } from "antd";
const SelectBox = (props) => {
  const { actionParam, clearSelect } = props;
  const { Option } = Select;
  const [selectValue, setSelectValue] = useState(props.initialId);
  const onChange = (value) => {
    setSelectValue(value);
    props.selectData({ [props.actionParam]: value });
  };
  useEffect(() => {
    if (clearSelect) {
      if (actionParam === clearSelect[0]) {
        setSelectValue("Select item");
      }
    }
  }, [actionParam, clearSelect]);

  return (
    <div className="select-wrapper">
      <div className="select-lable">{props.placeholder}</div>
      <Select
        showSearch
        placeholder={props.placeholder}
        optionFilterProp="children"
        onChange={onChange}
        value={selectValue}
        {...(props.initialValue ? { defaultValue: props.initialValue } : {})}
        filterOption={(input, _option) => {
          let option = _option;
          if (typeof option !== "string") {
            option = option.label || option.value;
          }

          return option.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }}
      >
        {props.store &&
          props.store.length &&
          props.store
            .sort((a, b) => {
              if (a[props.option].toLowerCase() < b[props.option].toLowerCase()) {
                return -1;
              }
              if (a[props.option].toLowerCase() > b[props.option].toLowerCase()) {
                return 1;
              }
              return 0;
            })
            .map((item, index) => (
              <Option key={index} value={item[props.value]}>
                {item[props.option]}
              </Option>
            ))}
      </Select>
    </div>
  );
};

export default SelectBox;
