import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Collapse } from "antd";
import Location from "./Location";

import { getSubscriptions, updateSubscription, createSubscription, deleteSubscription } from "store/subscriptions/action";
import { getRetailers } from "../../store/retailers/action";
import { getCategories } from "../../store/categories/action";
import Loader from "../Loader/Loader";
import CoreForm from "../ModalFrom/CoreForm";

import { getRetailerImg } from "utils/getRetailerImg";
import { STATE_STATUSES } from "utils/app";

import { SearchTerm } from "./SearchTerm";

const SubscriptionsList = (props) => {
  const { Panel } = Collapse;

  const {
    // getCategories,
    deleteSubscription,
    getSubscriptions,
    updateSubscription,
    locations,
    searchTerms,
    status,
    getRetailers,
    createSubscription,
  } = props;

  const inputData = [
    { label: "URL", name: "url", type: "text", required: true },
    { label: "Search Term Name", name: "category", type: "text", required: true },
  ];

  const selectData = [
    {
      name: "retailerId",
      value: "id",
      option: "name",
      action: getRetailers,
      store: "retailers",
      lable: "Select retailer",
      required: true,
      mode: false,
    },
    // {
    //   name: "category",
    //   value: "name",
    //   option: "name",
    //   action: getCategories,
    //   store: "categories",
    //   lable: "Change category",
    //   required: true,
    //   mode: false,
    // },
    // {
    //   name: "categoryType",
    //   value: "name",
    //   option: "name",
    //   store: "categoryType",
    //   lable: "Change categoryType",
    //   required: true,
    //   mode: false,
    // },
  ];

  const onSendForm = (values) => {
    const data = {
      retailerId: values.retailerId,
      parentId: 0,
      category: values.category,
      categoryType: "search",
      url: values.url,
      level: 1,
      position: 1,
    };
    createSubscription(data);
  };
  useEffect(() => {
    getSubscriptions({ subscription: false });
    getRetailers();
  }, [getSubscriptions, getRetailers]);

  console.log("searchTerms", searchTerms);

  return (
    <div style={{ position: "relative" }}>
      <div className="item-title">Subscriptions</div>
      <CoreForm title={"Create Search term"} inputData={inputData} selectData={selectData} onSendForm={onSendForm} />
      <>
        {Object.entries(locations).length !== 0 ? (
          <div>
            <div className="title-taxonomy-main">Locations</div>
            <Collapse>
              {Object.keys(locations).map((locationItem) => {
                return (
                  <Panel
                    key={locationItem}
                    showArrow={false}
                    header={
                      <div className="taxonomy-title">
                        <img src={getRetailerImg(locationItem)} alt="retailer" />
                        <span>{locationItem}</span>
                      </div>
                    }
                  >
                    {locations[locationItem].map((location) => (
                      <Location key={location.id} location={location} updateSubscription={updateSubscription} />
                    ))}
                  </Panel>
                );
              })}
            </Collapse>
          </div>
        ) : null}

        {Object.entries(searchTerms).length !== 0 ? (
          <div>
            <div className="title-taxonomy-main">Search Terms</div>
            {Object.keys(searchTerms).map((searchTermItem) => (
              <div key={searchTermItem}>
                <Collapse>
                  <Panel
                    key={searchTermItem}
                    showArrow={false}
                    header={
                      <div className="taxonomy-title">
                        <img src={getRetailerImg(searchTermItem)} alt="retailer" />
                        <span>{searchTermItem}</span>
                      </div>
                    }
                  >
                    {searchTerms[searchTermItem].map((searchTerm) => (
                      <SearchTerm
                        key={searchTerm.id}
                        deleteSubscription={deleteSubscription}
                        retailer={searchTermItem}
                        searchTerm={searchTerm}
                        updateSubscription={updateSubscription}
                      />
                    ))}
                  </Panel>
                </Collapse>
              </div>
            ))}
          </div>
        ) : null}
      </>

      {status === STATE_STATUSES.PENDING ? (
        <div className="loader-locations">
          <Loader />
        </div>
      ) : null}
    </div>
  );
};

export default connect(
  (state) => ({
    locations: state.subscriptions.subscriptions.locations,
    searchTerms: state.subscriptions.subscriptions.searchTerms,
    status: state.subscriptions.status,
  }),
  { getCategories, deleteSubscription, getSubscriptions, updateSubscription, getRetailers, createSubscription }
)(SubscriptionsList);
