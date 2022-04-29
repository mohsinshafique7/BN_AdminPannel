import React, { useEffect, useState, useMemo } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import CoreForm from "../ModalFrom/CoreForm";
import { notification } from "antd";
import CompaniesTable from "components/Tables/CompaniesTable";
import { CompanyCreateInput } from "../../utils/FormInputs";
import { useGetAllCompanies, useCreateCompany, useUpdateCompany } from "../../Requests/CompanyRequest";
const CompaniesList = (props) => {
  const {
    match: { params },
    history,
  } = props;
  const formInputs = CompanyCreateInput();
  const { isLoading: companiesIsLoading, data: companiesData } = useGetAllCompanies();
  const { mutate: createCompany, isError: createCompanyIsError } = useCreateCompany();
  const { mutate: updateCompany, isError: updateCompanyIsError } = useUpdateCompany();
  const { searchValue } = useSelector((state) => {
    return {
      searchValue: state.filters.searchValue,
    };
  });

  const [queryParams, setQueryParams] = useState(qs.parse(params.param));

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/companies/${queryString}`);
  }, [queryParams, history]);

  const onSendForm = (values) => {
    const filtersStartDate = !!values.filtersStartDate ? values.filtersStartDate.format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
    values.filtersStartDate = filtersStartDate;
    createCompany(values);
  };

  const openNotification = (type) => {
    notification[type]({
      message: "Error",
      description: "This company already exists.",
    });
  };

  const searchedData = useMemo(() => {
    const search = new RegExp(searchValue, "gi");
    return companiesData?.companies.filter((item) => item.name.match(search));
  }, [searchValue, companiesData]);

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
  function handleEditCompany(values) {
    const filtersStartDate = values.filtersStartDate ? values.filtersStartDate.format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
    const { name, id } = values;
    const data = { name, filtersStartDate };
    updateCompany({ id, data });
  }
  return (
    <>
      <div className="item-title">Companies</div>
      <Search />
      <CoreForm title={"Create Company"} inputData={formInputs.inputData} selectDate={formInputs.selectDate} onSendForm={onSendForm} />
      {!companiesIsLoading ? (
        <div>
          <CompaniesTable
            data={searchedData}
            page={Number(queryParams.page)}
            perPage={Number(queryParams.perPage)}
            setPage={setPage}
            setPerPage={setPerPage}
            handleEditCompany={handleEditCompany}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default withRouter(CompaniesList);
