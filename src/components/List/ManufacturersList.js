import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import CoreForm from "../ModalFrom/CoreForm";
import { notification } from "antd";
import ManufacturersTable from "components/Tables/ManufacturersTable";
import { manufacturerCreateInputs } from "../../utils/FormInputs";
import { useGetAllManufacturers, useCreateManufacturer, useUpdateManufacturer } from "../../Requests/ManufacturerRequest";
import { useGetAllBrands } from "../../Requests/BrandRequest";
const ManufacturersList = (props) => {
  const {
    match: { params },
    history,
  } = props;
  const { isLoading: brandsIsLoading, data: brandsData } = useGetAllBrands();
  const { isLoading: manufacturerIsLoading, data: manufacturerData } = useGetAllManufacturers();
  const { mutate: createManufacturer, isError: createManufacturerIsError } = useCreateManufacturer();
  const { mutate: updateManufacturer, isError: updateManufacturerIsError } = useUpdateManufacturer();

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

  const openNotification = (type) => {
    notification[type]({
      message: "Error",
      description: "This manufacturer already exists.",
    });
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
      {formInputs && !manufacturerIsLoading ? (
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
