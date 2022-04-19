import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import { getRetailers, createRetailer } from "../../store/retailers/action";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import CoreForm from "../ModalFrom/CoreForm";
import { STATE_STATUSES } from "../../utils/app";
import { notification } from "antd";
import RetailerTable from "components/Tables/RetailerTable";

const RetailersList = (props) => {
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
  const inputData = [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Colour", name: "color", type: "text", required: true },
  ];

  const [queryParams, setQueryParams] = useState(qs.parse(params.param));

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/retailers/${queryString}`);
  }, [queryParams, history]);

  useEffect(() => {
    dispatch(getRetailers());
  }, [dispatch]);

  const onSendForm = (values) => {
    dispatch(createRetailer(values)).catch(() => openNotification("error"));
  };

  const searchedData = useMemo(() => {
    const search = new RegExp(searchValue, "gi");
    return retailers.filter((item) => item.name.match(search));
  }, [searchValue, retailers]);

  const openNotification = (type) => {
    notification[type]({
      message: "Error",
      description: "This retailer already exists.",
    });
  };

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
      <div className="item-title">Retailers</div>
      <Search />
      <CoreForm title={"Create Retailer"} inputData={inputData} onSendForm={onSendForm} />
      {status !== STATE_STATUSES.PENDING ? (
        <div>
          <RetailerTable
            data={searchedData}
            page={Number(queryParams.page)}
            perPage={Number(queryParams.perPage)}
            setPage={setPage}
            setPerPage={setPerPage}
            x
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default withRouter(RetailersList);
