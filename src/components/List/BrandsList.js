import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import CoreForm from "../ModalFrom/CoreForm";
import BrandsTable from "components/Tables/BrandsTable";
import { useGetAllManufacturers } from "../../Requests/ManufacturerRequest";
import { useGetAllBrands, useCreateBrand, useUpdateBrand } from "../../Requests/BrandRequest";
import { brandsCreateInputs } from "../../utils/FormInputs/BrandFormInputs";
const BrandsList = (props) => {
  const {
    match: { params },
    history,
  } = props;

  const { mutate: createBrand } = useCreateBrand();
  const { mutate: updateBrand } = useUpdateBrand("list");
  const { isLoading: manufacturerIsLoading, data: manufacturerData } = useGetAllManufacturers();
  const { isLoading: brandsIsLoading, data: brandsData, status: brandsStatus } = useGetAllBrands();

  const [formInputs, setFormInputs] = useState(null);

  useEffect(() => {
    if (!brandsIsLoading && !manufacturerIsLoading) {
      setFormInputs(brandsCreateInputs(manufacturerData.manufacturers, brandsData.brands));
    }
  }, [brandsIsLoading, manufacturerIsLoading, brandsData, manufacturerData]);
  const { searchValue } = useSelector((state) => {
    return {
      searchValue: state.filters.searchValue,
    };
  });

  const [queryParams, setQueryParams] = useState(qs.parse(params.param));

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/brands/${queryString}`);
  }, [queryParams, history]);

  const onSendForm = (values) => {
    createBrand(values);
  };

  const searchedData = useMemo(() => {
    const search = new RegExp(searchValue, "gi");
    return brandsData?.brands.filter(
      (item) => item.name.match(search) || item?.parent?.name.match(search) || item?.manufacture?.name.match(search)
    );
  }, [searchValue, brandsData]);
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
  function onFinishEdit(values) {
    const id = values.id;
    delete values["id"];
    updateBrand({ id, values });
  }
  return (
    <>
      <div className="item-title">Brands</div>
      <Search />
      {brandsStatus === "success" && !brandsIsLoading && formInputs ? (
        <>
          <CoreForm title={"Create Brand"} inputData={formInputs.inputData} selectData={formInputs.selectData} onSendForm={onSendForm} />
          <BrandsTable
            data={searchedData}
            page={Number(queryParams.page)}
            perPage={Number(queryParams.perPage)}
            setPage={setPage}
            setPerPage={setPerPage}
            onFinishEdit={onFinishEdit}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default withRouter(BrandsList);
