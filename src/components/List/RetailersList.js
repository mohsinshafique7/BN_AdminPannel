import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import qs from "query-string";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import CoreForm from "../ModalFrom/CoreForm";
import { useHistory } from "react-router-dom";

import RetailerTable from "components/Tables/RetailerTable";
import { retailerCreateInput } from "../../utils/FormInputs/RetailerFormInputs";
import { useGetAllRetailers, useCreateRetailer, useUpdateRetailer } from "../../Requests/RetailerRequest";
const RetailersList = () => {
  const history = useHistory();
  const { isLoading: retailersIsLoading, data: retailersData, status: retailersStatus } = useGetAllRetailers();
  const { mutate: createRetailer } = useCreateRetailer();
  const { mutate: updateRetailer } = useUpdateRetailer("list");
  const [queryParams, setQueryParams] = useState(qs.parse(history.location.search));
  const formInputs = retailerCreateInput();
  const { searchValue } = useSelector((state) => {
    return {
      searchValue: state.filters.searchValue,
    };
  });

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/retailers?${queryString}`);
  }, [queryParams, history]);

  const onSendForm = (values) => {
    createRetailer(values);
  };

  const searchedData = useMemo(() => {
    const search = new RegExp(searchValue, "gi");
    return retailersData?.retailers.filter((item) => item.name.match(search));
  }, [searchValue, retailersData]);

  const setPage = (page) => {
    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        page,
      };
    });
  };
  function handleEditRetailer(values) {
    const { color, id } = values;
    updateRetailer({ color, id });
  }
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
      <CoreForm title={"Create Retailer"} inputData={formInputs.inputData} onSendForm={onSendForm} />
      {retailersStatus === "success" && !retailersIsLoading ? (
        <div>
          <RetailerTable
            data={searchedData}
            page={Number(queryParams.page)}
            perPage={Number(queryParams.perPage)}
            setPage={setPage}
            setPerPage={setPerPage}
            handleEditRetailer={handleEditRetailer}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default RetailersList;
