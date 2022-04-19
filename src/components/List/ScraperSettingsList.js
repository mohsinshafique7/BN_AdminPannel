import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import { getRetailers } from "../../store/retailers/action";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import { STATE_STATUSES } from "../../utils/app";
import ParserSettingTable from "components/Tables/ParserSettingTable";

const ScraperSettingsList = (props) => {
  const {
    match: { params },
    history,
  } = props;

  const { retailers, status, searchValue } = useSelector((state) => {
    return {
      retailers: state.retailers.retailers,
      status: state.retailers.status,
      searchValue: state.filters.searchValue,
    };
  });
  const dispatch = useDispatch();

  const [queryParams, setQueryParams] = useState(qs.parse(params.param));
  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/scraper-settings/${queryString}`);
  }, [queryParams, history]);

  useEffect(() => {
    dispatch(getRetailers());
  }, [dispatch]);

  const searchedData = useMemo(() => {
    const search = new RegExp(searchValue, "gi");
    return retailers.filter((item) => item.name.match(search));
  }, [searchValue, retailers]);

  const setPage = (page) => {
    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        page,
      };
    });
  };

  const setPerPage = (perPage) => {
    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        perPage,
      };
    });
  };

  return (
    <>
      <div className="item-title">Parser Settings</div>
      <Search />
      {status !== STATE_STATUSES.PENDING ? (
        <ParserSettingTable
          data={searchedData}
          page={Number(queryParams.page)}
          perPage={Number(queryParams.perPage)}
          setPage={setPage}
          setPerPage={setPerPage}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default withRouter(ScraperSettingsList);
