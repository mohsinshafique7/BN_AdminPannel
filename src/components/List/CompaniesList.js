import React, { useEffect, useState, useMemo } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import { getCompanies, createCompany } from "../../store/companies/action";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import CoreForm from "../ModalFrom/CoreForm";
import { STATE_STATUSES } from "../../utils/app";
import { notification } from "antd";
import CompaniesTable from "components/Tables/CompaniesTable";

const CompaniesList = (props) => {
  const {
    match: { params },
    history,
  } = props;

  const { companies, status, searchValue } = useSelector((state) => {
    return {
      companies: state.companies.companies,
      status: state.companies.status,
      searchValue: state.filters.searchValue,
    };
  });
  const dispatch = useDispatch();

  const inputData = [{ label: "Name", name: "name", type: "text", required: true }];
  const selectDate = [{ label: "Start Date", name: "filtersStartDate" }];

  const [queryParams, setQueryParams] = useState(qs.parse(params.param));

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/companies/${queryString}`);
  }, [queryParams, history]);

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  const onSendForm = (values) => {
    const filtersStartDate = !!values.filtersStartDate ? values.filtersStartDate.format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
    values.filtersStartDate = filtersStartDate;

    dispatch(createCompany(values)).catch(() => openNotification("error"));
  };

  const openNotification = (type) => {
    notification[type]({
      message: "Error",
      description: "This company already exists.",
    });
  };

  const searchedData = useMemo(() => {
    const search = new RegExp(searchValue, "gi");
    return companies.filter((item) => item.name.match(search));
  }, [searchValue, companies]);

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
      <div className="item-title">Companies</div>
      <Search />
      <CoreForm title={"Create Company"} inputData={inputData} selectDate={selectDate} onSendForm={onSendForm} />
      {status !== STATE_STATUSES.PENDING ? (
        <div>
          <CompaniesTable
            data={searchedData}
            page={Number(queryParams.page)}
            perPage={Number(queryParams.perPage)}
            setPage={setPage}
            setPerPage={setPerPage}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default withRouter(CompaniesList);
