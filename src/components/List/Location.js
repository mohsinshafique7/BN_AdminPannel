import React, { useState } from "react";
import { CollapseClose, CollapseOpen } from "assets/icons";
import { Checkbox } from "antd";

const Location = ({
  location: {
    id: locationId,
    category,
    children,
    status: { products, banners, subscription },
  },
  updateSubscription,
}) => {
  const [isOpenChild, setIsOpenChild] = useState(false);
  const handleStatus = (name, { checked }) => {
    updateSubscription(locationId, { status: { [name]: checked } });
  };

  const openChild = () => {
    setIsOpenChild(!isOpenChild);
  };

  return (
    <div className="category-wrap">
      <div className="category-box">
        <div className="category-title">
          {children?.length ? (
            <div className="collapse-wrap" onClick={() => openChild()}>
              {isOpenChild ? <CollapseOpen color={"#000"} /> : <CollapseClose color={"#000"} />}
            </div>
          ) : (
            <div className="empty-wrap"></div>
          )}
          <div>{category}</div>
        </div>

        <div className="checkboxes-wrap">
          <Checkbox onChange={({ target }) => handleStatus("products", target)} checked={products}>
            Products
          </Checkbox>
          <Checkbox onChange={({ target }) => handleStatus("banners", target)} checked={banners}>
            Banners
          </Checkbox>
          <Checkbox onChange={({ target }) => handleStatus("subscription", target)} checked={subscription}>
            Subscription
          </Checkbox>
        </div>
      </div>
      {children?.length && isOpenChild ? (
        <div style={{ marginLeft: "24px" }}>
          {children.map((item) => (
            <Location key={item.id} location={item} updateSubscription={updateSubscription} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Location;
