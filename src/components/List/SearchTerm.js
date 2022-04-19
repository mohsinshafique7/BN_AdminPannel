import React, { useState } from "react";
import { Checkbox, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";


export const SearchTerm = ({
  deleteSubscription, searchTerm, searchTerm: {
    status: { subscription, banners, products },
  }, updateSubscription,
}) => {
  const [status, setStatus] = useState({
    products,
    banners,
    subscription
  });

  const setCheckbox = (name) => {
    setStatus((prevState) => ({
      ...prevState,
      [name]: !prevState[name]
    }));
    updateSubscription(searchTerm.id, { status: { [name]: !status[name] } });
  };



  return (
    <div className="taxonomy-retailer-wrap">
      <Popconfirm
        onConfirm={() => deleteSubscription(searchTerm.id)}
        title={`Are you sure you want to delete?`}
        okText="Yes"
        cancelText="No"
      >
        <div className="item-core-product">
          <DeleteOutlined />
        </div>
      </Popconfirm>
      <div className="searchTerm-name">{searchTerm.category}</div>
      <div className="searchTerm-url">{searchTerm.url}</div>
      <div className="checkboxes-wrap">
        <Checkbox onChange={() => setCheckbox("products")} checked={status.products}>
          Products
        </Checkbox>
        <Checkbox onChange={() => setCheckbox("banners")} checked={status.banners}>
          Banners
        </Checkbox>
        <Checkbox onChange={() => setCheckbox("subscription")} checked={status.subscription}>
          Subscription
        </Checkbox>
      </div>
    </div>
  );
};
