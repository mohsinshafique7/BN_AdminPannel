import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import { getBrands, createBrandBrands, getManufacturers } from "../../store/manufacturersBrands/action";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import CoreForm from "../ModalFrom/CoreForm";
import { STATE_STATUSES } from "../../utils/app";
import { notification } from "antd";
import BrandsTable from "components/Tables/BrandsTable";

const BrandsList = (props) => {
  const {
    match: { params },
    history,
  } = props;
  const { brands, status, searchValue } = useSelector((state) => {
    return {
      brands: state.manufacturersBrands.brands,
      status: state.manufacturersBrands.status,
      searchValue: state.filters.searchValue,
    };
  });
  const dispatch = useDispatch();
  const inputData = [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Colour", name: "color", type: "text", required: true },
  ];

  const selectData = [
    {
      name: "manufacturerId",
      value: "id",
      option: "name",
      action: getManufacturers,
      store: "manufacturers",
      lable: "Select manufacturer",
      required: false,
      mode: false,
    },
    {
      name: "brandId",
      value: "id",
      option: "name",
      action: getBrands,
      store: "brands",
      lable: "Select brand",
      required: false,
      mode: false,
      brandSelect: true,
    },
  ];

  const [queryParams, setQueryParams] = useState(qs.parse(params.param));

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/brands/${queryString}`);
  }, [queryParams, history]);

  useEffect(() => {
    dispatch(getManufacturers());
    dispatch(getBrands());
  }, [dispatch]);

  const onSendForm = (values) => {
    dispatch(createBrandBrands(values)).catch(() => openNotification("error"));
  };

  const openNotification = (type) => {
    notification[type]({
      message: "Error",
      description: "Brand already exists",
    });
  };

  const searchedData = useMemo(() => {
    const search = new RegExp(searchValue, "gi");
    return brands.filter((item) => item.name.match(search) || item?.parent?.name.match(search) || item?.manufacture?.name.match(search));
  }, [searchValue, brands]);
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
      <div className="item-title">Brands</div>
      <Search />
      <CoreForm title={"Create Brand"} inputData={inputData} selectData={selectData} onSendForm={onSendForm} />
      {brands.length > 0 && status !== STATE_STATUSES.PENDING ? (
        <BrandsTable
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

export default withRouter(BrandsList);
