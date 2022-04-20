import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { Checkbox, Collapse } from "antd";
import { getSubscriptions, subscriptionSubscribe, subscriptionUnsubscribe } from "store/subscriptions/action";
import { getRetailerImg } from "utils/getRetailerImg";
import { STATE_STATUSES } from "utils/app";
import Loader from "../Loader/Loader";
import { CollapseClose, CollapseOpen } from "assets/icons";

const Location = ({ companyId, location, companyTaxonomies, subscriptionSubscribe, subscriptionUnsubscribe }) => {
  const [isOpenChild, setIsOpenChild] = useState(false);
  const [isChecked, setIsChecked] = useState(null);

  useEffect(() => {
    setIsChecked(companyTaxonomies.includes(location.id));
  }, [companyTaxonomies]);

  const setCheckbox = () => {
    setIsChecked(!isChecked);

    const taxonomy = {
      ids: location.id.toString(),
      companyId,
    };

    if (companyTaxonomies.includes(location.id)) {
      subscriptionUnsubscribe(taxonomy);
    } else {
      subscriptionSubscribe(taxonomy);
    }
  };

  return (
    <div className="category-wrap">
      <div className="category-box">
        <div className="category-title">
          {location.children?.length ? (
            <div className="collapse-wrap" onClick={() => setIsOpenChild(!isOpenChild)}>
              {isOpenChild ? <CollapseOpen color={"#000"} /> : <CollapseClose color={"#000"} />}
            </div>
          ) : (
            <div className="empty-wrap"></div>
          )}
          <div>{location.category}</div>
        </div>

        <div className="checkboxes-wrap">
          <Checkbox onChange={setCheckbox} checked={isChecked}>
            Subscription
          </Checkbox>
        </div>
      </div>
      {location.children?.length && isOpenChild ? (
        <div style={{ marginLeft: "24px" }}>
          {location.children.map((item) => (
            <Location
              key={item.id}
              companyId={companyId}
              location={item}
              companyTaxonomies={companyTaxonomies}
              subscriptionSubscribe={subscriptionSubscribe}
              subscriptionUnsubscribe={subscriptionUnsubscribe}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

const SearchTerm = ({ companyId, retailer, searchTerm, companyTaxonomies, subscriptionSubscribe, subscriptionUnsubscribe }) => {
  const [isChecked, setIsChecked] = useState(null);

  useEffect(() => {
    setIsChecked(companyTaxonomies.includes(searchTerm.id));
  }, [companyTaxonomies]);

  const setCheckbox = () => {
    setIsChecked(!isChecked);

    const taxonomy = {
      ids: searchTerm.id.toString(),
      companyId,
    };

    if (companyTaxonomies.includes(searchTerm.id)) {
      subscriptionUnsubscribe(taxonomy);
    } else {
      subscriptionSubscribe(taxonomy);
    }
  };

  return (
    <div className="taxonomy-retailer-wrap">
      <div className="taxonomy-retailer">
        <img src={getRetailerImg(retailer)} alt="retailer" />
        <span>{retailer}</span>
      </div>
      <div className="searchTerm-url">{searchTerm.category}</div>
      <div className="checkboxes-wrap">
        <Checkbox onChange={setCheckbox} checked={isChecked}>
          Subscription
        </Checkbox>
      </div>
    </div>
  );
};

const SubscriptionsTab = (props) => {
  const { Panel } = Collapse;

  const { companyId, getSubscriptions, subscriptionSubscribe, subscriptionUnsubscribe, locations, searchTerms, status } = props;

  const [companyTaxonomies, setCompanyTaxonomies] = useState([]);

  useEffect(() => {
    getSubscriptions({ subscription: true, companyId }).then((response) => {
      const taxonomies = response.data.companyTaxonomies.map((item) => item.retailerTaxonomyId);
      setCompanyTaxonomies(taxonomies);
    });
  }, []);
  const dd = useMemo(() => {
    console.log(props.searchTerms);
    return Object.entries(props.searchTerms).map((i, index) => {
      return {
        searchTerm: i[0],
        data: i[1].map((a) => {
          return { category: a.category };
        }),
      };
    });
  });
  console.log("FullData", dd);
  return (
    <div style={{ position: "relative" }}>
      <div className="item-title">Subscriptions</div>
      <>
        {Object.entries(locations).length !== 0 ? (
          <div>
            <div className="title-taxonomy-main">Locations</div>
            <Collapse>
              {Object.keys(locations).map((locationItem) => (
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
                    <Location
                      key={location.id}
                      companyId={companyId}
                      location={location}
                      companyTaxonomies={companyTaxonomies}
                      subscriptionSubscribe={subscriptionSubscribe}
                      subscriptionUnsubscribe={subscriptionUnsubscribe}
                    />
                  ))}
                </Panel>
              ))}
            </Collapse>
          </div>
        ) : null}

        {Object.entries(searchTerms).length !== 0 ? (
          <div>
            <div className="title-taxonomy-main">Search Terms</div>
            {/* {Object.keys(searchTerms).map((searchTermItem) => (
              // <div>
              //   {searchTerms[searchTermItem].map((i) => {
              //     return <div>{i.category}</div>;
              //   })}
              // </div>
              // <div key={searchTermItem}>
              //   {searchTerms[searchTermItem].map((searchTerm) => (
              //     <SearchTerm
              //       key={searchTerm.id}
              //       companyId={companyId}
              //       retailer={searchTermItem}
              //       searchTerm={searchTerm}
              //       companyTaxonomies={companyTaxonomies}
              //       subscriptionSubscribe={subscriptionSubscribe}
              //       subscriptionUnsubscribe={subscriptionUnsubscribe}
              //     />
              //   ))}
              // </div>
            ))} */}
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
    companyTaxonomies: state.subscriptions.subscriptions.companyTaxonomies,
    status: state.subscriptions.status,
  }),
  { getSubscriptions, subscriptionSubscribe, subscriptionUnsubscribe }
)(SubscriptionsTab);
