import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import CoreForm from "../ModalFrom/CoreForm";
import ManufacturersTable from "components/Tables/ManufacturersTable";
import { manufacturerCreateInputs } from "../../utils/FormInputs/ManufacturerFormInputs";
import { useGetAllManufacturers, useCreateManufacturer, useUpdateManufacturer } from "../../Requests/ManufacturerRequest";
import { useGetAllBrands } from "../../Requests/BrandRequest";
const ManufacturersList = (props) => {
  const {
    match: { params },
    history,
  } = props;
  const { isLoading: brandsIsLoading, data: brandsData, status: brandsStatus } = useGetAllBrands();
  const { isLoading: manufacturerIsLoading, data: manufacturerData, status: manufacturersStatus } = useGetAllManufacturers();
  const { mutate: createManufacturer } = useCreateManufacturer();
  const { mutate: updateManufacturer } = useUpdateManufacturer("list");

  const [formInputs, setFormInputs] = useState(null);
  useEffect(() => {
    if (!brandsIsLoading) {
      setFormInputs(manufacturerCreateInputs(brandsData?.brands));
    }
  }, [brandsIsLoading, brandsData]);
  const { searchValue } = useSelector((state) => {
    return {
      searchValue: state.filters.searchValue,
    };
  });

  const [queryParams, setQueryParams] = useState(qs.parse(params.param));

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/manufacturers/${queryString}`);
  }, [queryParams, history]);

  const onSendForm = (values) => {
    const { name, brands, color } = values;
    createManufacturer({ manufacturer: { name, color }, brands });
  };

  const searchedData = useMemo(() => {
    const search = new RegExp(searchValue, "gi");
    return manufacturerData?.manufacturers.filter((item) => item.name.match(search));
  }, [searchValue, manufacturerData]);

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
  function handleEditManufacturer(values) {
    const { name, color, id } = values;
    updateManufacturer({ manufacturer: { manufacturer: { name, color } }, id });
  }

  return (
    <>
      <div className="item-title">Manufacturers</div>
      <Search />
      {manufacturersStatus === "success" && brandsStatus === "success" && formInputs && !manufacturerIsLoading ? (
        <>
          <CoreForm
            title={"Create  Manufacturer"}
            inputData={formInputs?.inputData}
            selectData={formInputs?.selectData}
            onSendForm={onSendForm}
          />
          <div>
            <ManufacturersTable
              data={searchedData}
              page={Number(queryParams.page)}
              perPage={Number(queryParams.perPage)}
              setPage={setPage}
              setPerPage={setPerPage}
              handleEditManufacturer={handleEditManufacturer}
            />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default withRouter(ManufacturersList);
