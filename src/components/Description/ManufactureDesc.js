import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrandManufacturers,
  manufacturerDeleteBrand,
  getManufacturer,
  deleteManufacturer,
  editManufacturer,
  getFreeBrands,
} from "../../store/manufacturersBrands/action";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import moment from "moment";
import { Popconfirm, Button, notification } from "antd";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
// import ModalFrom from '../ModalFrom/ModalFrom'
import TableBox from "../TableBox/TableBox";
import CoreForm from "../ModalFrom/CoreForm";

const ManufacturersDesc = ({
  //   getManufacturer,
  //   deleteManufacturer,
  //   createBrandManufacturers,
  //   manufacturerDeleteBrand,
  //   editManufacturer,
  //   getFreeBrands,
  //   manufacturer: { createdAt, updatedAt, name, brands, id, color },
  history,
  match: { params },
}) => {
  const { manufacturer } = useSelector((state) => {
    return {
      manufacturer: state.manufacturersBrands.manufacturer,
    };
  });
  const { createdAt, updatedAt, name, brands, id, color } = manufacturer;
  const dispatch = useDispatch();
  const inputData = [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Colour", name: "color", type: "text", required: true },
  ];

  const inputBrand = [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Colour", name: "color", type: "text", required: true },
  ];

  const selectData = [
    {
      name: "brands",
      value: "id",
      option: "name",
      action: getFreeBrands,
      store: "brands",
      lable: "Select brands",
      required: true,
      mode: "multiple",
    },
  ];

  const initialValue = {
    name,
    color,
  };

  const divStyle = {
    color: color,
  };

  const sortParams = [
    { label: "Core Product", value: "coreProduct" },
    { label: "EAN", value: "ean" },
    { label: "Date", value: "createdAt" },
  ];

  const [queryParams, setQueryParams] = useState(qs.parse(params.param));

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/manufacturer/${params.id}/${queryString}`);
  }, [queryParams, history, params.id]);

  useEffect(() => {
    dispatch(getFreeBrands());
    dispatch(getManufacturer(params.id));
  }, [params.id, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteManufacturer(id))
      .then(() => history.push("/manufacturers/page=0&perPage=10"))
      .catch((error) => openNotification("error", error.error.response.data.message));
  };

  const onFinishCreate = (values) => {
    const data = { ...values, ...{ manufacturerId: id } };
    dispatch(createBrandManufacturers(data)).catch((error) => openNotification("error", "Brand already exists"));
  };

  const onSendForm = (values) => {
    const { name, color } = values;
    dispatch(editManufacturer({ manufacturer: { name, color } }, id));
  };

  const onFinishAddBrands = (values) => {
    const { brands } = values;
    dispatch(editManufacturer({ brands }, id));
  };

  const openNotification = (type, message) => {
    notification[type]({
      message: "Error",
      description: message,
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

  const tableHeader = () => (
    <div className="item-box header">
      <div className="item-link">Core Product</div>
      <div className="item-id">EAN</div>
      <div className="item-date">Created At</div>
    </div>
  );

  const tableData = (item) => (
    <>
      <Link className="item-link" to={`/core-product/${[item.id]}`}>
        {[item.title]}
      </Link>
      <div className="item-id">{[item.ean]}</div>
      <div className="item-date">{moment(item.createdAt).format("MMMM Do YYYY, h:mm")}</div>
    </>
  );

  return (
    <>
      <Button type="primary" onClick={() => history.goBack()}>
        Go Back
      </Button>
      <div className="item-title">Manufacturer Details</div>
      <div className="item-wrapper">
        <div className="description-box">
          <div className="title-item-desc">
            Created At: <span>{moment(createdAt).format("MMMM Do YYYY, h:mm")}</span>
          </div>
          <div className="title-item-desc">
            Updated At: <span>{moment(updatedAt).format("MMMM Do YYYY, h:mm")}</span>
          </div>
          <div className="title-item-desc">
            Colour: <span style={divStyle}>{color}</span>
          </div>
          <div className="title-item-desc">
            Name: <span>{name}</span>
          </div>
          {brands && brands.length ? (
            <div className="title-item-desc">
              Brands:
              {brands.map((item) => (
                <Popconfirm
                  key={item.id}
                  onConfirm={() => dispatch(manufacturerDeleteBrand(item.id))}
                  title={`Are you sure you want to delete brand ${item.name}？`}
                  okText="Yes"
                  cancelText="No"
                >
                  <span className="item-value">{item.name}</span>
                </Popconfirm>
              ))}
            </div>
          ) : null}
        </div>
        <div className="controls-box">
          <Popconfirm
            onConfirm={() => handleDelete(id)}
            title={`Are you sure you want to delete manufacturer ${name}？`}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>

          {/* <ModalFrom
                        text={"Create Brand"}
                        name={"name"}
                        isDynamicForm={true}
                        postPatam={"manufacturerId"}
                        onFinish={onFinishCreate}
                    /> */}
          <CoreForm title={"Edit Manufacturer Name"} initialValue={initialValue} inputData={inputData} onSendForm={onSendForm} />

          <CoreForm title={"Create Brand"} inputData={inputBrand} onSendForm={onFinishCreate} />

          <CoreForm title={"Add Existing Brand"} selectData={selectData} onSendForm={onFinishAddBrands} />
        </div>
      </div>

      {brands?.length ? (
        <>
          <div className="item-title sub">Brands</div>
          {brands
            .sort((first, second) => {
              if (first.name.toLowerCase() < second.name.toLowerCase()) {
                return -1;
              }
              if (first.name.toLowerCase() > second.name.toLowerCase()) {
                return 1;
              }
              return 0;
            })
            .map((brand, index) => (
              <div key={index}>
                <div className="brand-item">
                  <Link className="brand-title" to={`/brand/${[brand.id]}/brand/page=0&perPage=10`}>
                    {[brand.name]}
                  </Link>
                </div>
                {brand.coreProducts?.length ? (
                  <>
                    <Search />
                    <TableBox
                      data={brand.coreProducts}
                      tableHeader={tableHeader}
                      tableData={tableData}
                      titleParam={"title"}
                      sortParams={sortParams}
                      page={Number(queryParams.page)}
                      perPage={Number(queryParams.perPage)}
                      setPage={setPage}
                      setPerPage={setPerPage}
                    />
                  </>
                ) : null}
              </div>
            ))}
        </>
      ) : null}
    </>
  );
};

export default withRouter(ManufacturersDesc);
