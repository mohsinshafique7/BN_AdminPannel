import React, { useEffect, useState, useMemo } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import qs from "query-string";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import CoreForm from "../ModalFrom/CoreForm";
import CompaniesTable from "components/Tables/CompaniesTable";
import { useHistory } from "react-router-dom";
import { CompanyCreateInput } from "../../utils/FormInputs/CompanyFormInputs";
import { useGetAllCompanies, useCreateCompany, useUpdateCompany } from "../../Requests/CompanyRequest";
const CompaniesList = () => {
  const history = useHistory();
  const formInputs = CompanyCreateInput();

  const { isLoading: companiesIsLoading, data: companiesData, status: companiesStatus } = useGetAllCompanies();
  const { mutate: createCompany } = useCreateCompany();
  const { mutate: updateCompany } = useUpdateCompany("list");

  const { searchValue } = useSelector((state) => {
    return {
      searchValue: state.filters.searchValue,
    };
  });

  const [queryParams, setQueryParams] = useState(qs.parse(history.location.search));

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/companies?${queryString}`);
  }, [queryParams, history]);

  const onSendForm = (values) => {
    const filtersStartDate = !!values.filtersStartDate ? values.filtersStartDate.format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
    values.filtersStartDate = filtersStartDate;
    createCompany(values);
  };

  const searchedData = useMemo(() => {
    return companiesData?.companies.filter((o) =>
      Object.keys(o).some((k) => String(o[k]).toLowerCase().includes(searchValue.toLowerCase()))
    );
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
      {companiesStatus === "success" && !companiesIsLoading ? (
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

export default CompaniesList;
