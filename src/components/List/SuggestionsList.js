import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import qs from "query-string";
import { getSuggestions } from "../../store/suggestions/action";
import Loader from "../Loader/Loader";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { CoreListStyles } from "./style";
import { STATE_STATUSES } from "../../utils/app";

const SuggestionsList = (props) => {
  const {
    getSuggestions,
    suggestions,
    status,
    match: { params },
    history,
  } = props;

  const [queryParams, setQueryParams] = useState(qs.parse(params.page));

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/mapping-suggestions/mapping/${queryString}`);
  }, [queryParams, history]);

  useEffect(() => {
    getSuggestions(queryParams);
  }, [getSuggestions, queryParams]);

  const onChangePage = (page, pageSize) => {
    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        page,
      };
    });
  };

  const onChangePerPage = (page, perPage) => {
    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        perPage,
      };
    });
  };

  return (
    <CoreListStyles>
      <div className="item-title">Mapping Suggestions</div>
      {Object.entries(suggestions).length !== 0 ? (
        <>
          <div className="table-wrapper-box">
            <div className="item-box header">
              <div className="item-link">Product Title</div>
              <div className="item-id">Retailer Product ID</div>
              <div className="item-length">No. Mapping Suggestions</div>
            </div>
            {status === STATE_STATUSES.READY ? (
              suggestions.suggestions.map((itemObj, indexObj) => (
                <div key={itemObj.coreProductId}>
                  {itemObj.coreProductId && (
                    <div className="item-box">
                      <Link className="item-link" to={`/mapping-suggestion/${itemObj.coreProductId}`}>
                        {itemObj.title}
                      </Link>
                      <div className="item-id">{itemObj.ean}</div>
                      <div className="item-length">{itemObj.suggestions}</div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <Loader />
            )}
          </div>
          <Pagination
            className="pagination-controls"
            total={suggestions.count * Number(queryParams.perPage)}
            showTotal={(total) => `Total ${total} items`}
            pageSize={Number(queryParams.perPage)}
            current={Number(queryParams.page)}
            onChange={onChangePage}
            onShowSizeChange={onChangePerPage}
          />
        </>
      ) : (
        <Loader />
      )}
    </CoreListStyles>
  );
};

export default connect(
  (state) => ({
    suggestions: state.suggestions.suggestions,
    status: state.suggestions.status,
  }),
  { getSuggestions }
)(withRouter(SuggestionsList));
