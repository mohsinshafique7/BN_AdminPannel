import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import { getManufacturers, createManufacturer, getBrands } from "../../store/manufacturersBrands/action";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import { STATE_STATUSES } from "../../utils/app";
import CoreForm from "../ModalFrom/CoreForm";
import { notification } from "antd";
import ManufacturersTable from "components/Tables/ManufacturersTable";

const ManufacturersList = (props) => {
  const {
    match: { params },
    history,
  } = props;
  const { manufacturers, status, searchValue } = useSelector((state) => {
    return {
      manufacturers: state.manufacturersBrands.manufacturers,
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
    { name: "brands", value: "id", option: "name", action: getBrands, store: "brands", lable: "Brands", required: false, mode: "multiple" },
  ];

  const [queryParams, setQueryParams] = useState(qs.parse(params.param));

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/manufacturers/${queryString}`);
  }, [queryParams, history]);

  useEffect(() => {
    dispatch(getManufacturers());
    dispatch(getBrands());
  }, [dispatch]);

  const onSendForm = (values) => {
    const { name, brands, color } = values;
    dispatch(createManufacturer({ manufacturer: { name, color }, brands })).catch(() => openNotification("error"));
  };

  const openNotification = (type) => {
    notification[type]({
      message: "Error",
      description: "This manufacturer already exists.",
    });
  };

  const searchedData = useMemo(() => {
    const search = new RegExp(searchValue, "gi");
    return manufacturers.filter((item) => item.name.match(search) || item?.brands.some((a) => a.name.match(search)));
  }, [searchValue, manufacturers]);

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
      <div className="item-title">Manufacturers</div>
      <Search />
      <CoreForm title={"Create Manufacturer"} inputData={inputData} selectData={selectData} onSendForm={onSendForm} />
      {status !== STATE_STATUSES.PENDING ? (
        <div>
          <ManufacturersTable
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

export default withRouter(ManufacturersList);
