import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { connect } from "react-redux";
import { getCategories } from "../../store/categories/action";
import { getManufacturers } from "../../store/manufacturersBrands/action";
import { getRetailers } from "../../store/retailers/action";
import { getCompanies } from "../../store/companies/action";
import { getSourceCategories, getSourceCategoriesNames } from "../../store/sourceCategories/action";
import { getUsers } from "../../store/users/action";

const SelectBox = (props) => {
  const { actionParam, clearSelect } = props;

  const { Option } = Select;

  const [dataOption, setDataOption] = useState("");
  const [selectValue, setSelectValue] = useState(props.initialId);

  useEffect(() => {
    switch (actionParam) {
      case "categoryId":
        props.getCategories();
        setDataOption("categories");
        break;
      case "manufacturerId": {
        props.getManufacturers();
        setDataOption("manufacturers");
        break;
      }
      case "retailer": {
        props.getRetailers();
        setDataOption("retailers");
        break;
      }
      case "company":
      case "companyId": {
        props.getCompanies();
        setDataOption("companies");
        break;
      }
      case "categoryType": {
        setDataOption("categoryType");
        break;
      }
      case "category": {
        props.getSourceCategories();
        setDataOption("sourceCategories");
        break;
      }
      case "name": {
        props.getSourceCategoriesNames();
        setDataOption("namesSourceCategories");
        break;
      }
      case "sourceCategoryId": {
        props.getSourceCategories();
        setDataOption("sourceCategories");
        break;
      }
      case "userId": {
        props.getUsers();
        setDataOption("users");
        break;
      }
      default: {
        break;
      }
    }
  }, [actionParam]);

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
      <div className="select-lable">{props.lable}</div>
      <Select
        showSearch
        placeholder="Select a item"
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
        {props[dataOption] &&
          props[dataOption].length &&
          props[dataOption]
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

export default connect(
  (state) => ({
    categories: state.categories.categories,
    companies: state.companies.companies,
    manufacturers: state.manufacturersBrands.manufacturers,
    retailers: state.retailers.retailers,
    sourceCategories: state.sourceCategories.sourceCategories,
    namesSourceCategories: state.sourceCategories.names,
    users: state.users.users,
    categoryType: [{ name: "shelf" }, { name: "aisle" }, { name: "banners" }, { name: "search" }],
  }),
  { getCategories, getManufacturers, getRetailers, getSourceCategories, getSourceCategoriesNames, getUsers, getCompanies }
)(SelectBox);
