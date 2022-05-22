import React, { useState, useEffect } from "react";
import moment from "moment";
import { Popconfirm, Button } from "antd";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import CoreForm from "../ModalFrom/CoreForm";
import { setColor } from "../../utils/helpers";
import {
  manufacturerEditNameInputs,
  manufacturerBrandsInputs,
  manufacturerAddExistingBrandSelect,
} from "../../utils/FormInputs/ManufacturerFormInputs";
import ManufacturerBrandTable from "components/Tables/ManufacturerBrandTable";
import {
  useGetSingleManufacturer,
  useDeleteManufacturer,
  useUpdateManufacturer,
  useCreateBrandManufacturer,
} from "../../Requests/ManufacturerRequest";
import { useDeleteBrand, useGetAllBrands } from "../../Requests/BrandRequest";
import Loader from "components/Loader/Loader";
import { useParams, useHistory } from "react-router-dom";

const ManufacturersDesc = () => {
  const { id: paramId } = useParams();
  const history = useHistory();
  const { isLoading: manufacturerIsLoading, data: manufacturerData } = useGetSingleManufacturer(paramId);
  const { mutate: deleteBrand } = useDeleteBrand("manufacturerDes");
  const { mutate: deleteManufacturer } = useDeleteManufacturer(history);
  const { mutate: updateManufacturer } = useUpdateManufacturer();
  const { mutate: createBrandManufacturers } = useCreateBrandManufacturer();
  const { isLoading: brandsIsLoading, data: brandsData, status: brandsStatus } = useGetAllBrands();

  const [inputs, setInputs] = useState(null);

  useEffect(() => {
    if (!brandsIsLoading) {
      setInputs({
        editManufacturerNameInput: manufacturerEditNameInputs(),
        createBrandInput: manufacturerBrandsInputs(),
        addExistingBrandSelect: manufacturerAddExistingBrandSelect(brandsData?.brands),
      });
    }
  }, [brandsIsLoading, brandsData]);
  const initialValue = {
    name: manufacturerData?.manufacturer?.name,
    color: manufacturerData?.manufacturer?.color,
  };

  const handleDelete = () => {
    deleteManufacturer(paramId);
  };

  const onFinishCreate = (values) => {
    const data = { ...values, ...{ manufacturerId: Number(paramId) } };
    console.log("Form Data", data);
    createBrandManufacturers(data);
  };

  const onSendForm = (values) => {
    const { name, color } = values;
    updateManufacturer({ manufacturer: { manufacturer: { name, color } }, id: paramId });
  };

  const onFinishAddBrands = (values) => {
    const { brands } = values;
    updateManufacturer({ manufacturer: { manufacturer: { brands } }, id: paramId });
  };

  return (
    <>
      <Button type="primary" onClick={() => history.goBack()}>
        Go Back
      </Button>
      <div className="item-title">Manufacturer Details</div>
      {brandsStatus === "success" && !manufacturerIsLoading && !brandsIsLoading && inputs ? (
        <>
          <div className="item-wrapper">
            <div className="description-box">
              <div className="title-item-desc">
                Created At: <span>{moment(manufacturerData?.manufacturer?.createdAt).format("MMMM Do YYYY, h:mm")}</span>
              </div>
              <div className="title-item-desc">
                Updated At: <span>{moment(manufacturerData?.manufacturer?.updatedAt).format("MMMM Do YYYY, h:mm")}</span>
              </div>
              <div className="title-item-desc">
                Colour: <span style={setColor(manufacturerData?.manufacturer?.color)}></span>
              </div>
              <div className="title-item-desc">
                Name: <span>{manufacturerData?.manufacturer?.name}</span>
              </div>
              {manufacturerData?.manufacturer?.brands && manufacturerData?.manufacturer?.brands.length ? (
                <div className="title-item-desc">
                  Brands:
                  {manufacturerData?.manufacturer?.brands.map((item) => (
                    <Popconfirm
                      key={item.id}
                      onConfirm={() => deleteBrand(item.id)}
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
                onConfirm={() => handleDelete()}
                title={`Are you sure you want to delete manufacturer ${manufacturerData?.manufacturer?.name}？`}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger>
                  Delete
                </Button>
              </Popconfirm>
              <CoreForm
                title={"Edit Manufacturer Name"}
                initialValue={initialValue}
                inputData={inputs.editManufacturerNameInput}
                onSendForm={onSendForm}
              />

              <CoreForm title={"Create Brand"} inputData={inputs.createBrandInput} onSendForm={onFinishCreate} />

              <CoreForm title={"Add Existing Brand"} selectData={inputs.addExistingBrandSelect} onSendForm={onFinishAddBrands} />
            </div>
          </div>

          {manufacturerData?.manufacturer?.brands?.length ? (
            <>
              <div className="item-title sub">Brands</div>
              {manufacturerData?.manufacturer?.brands
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
                        <ManufacturerBrandTable data={brand.coreProducts} />
                      </>
                    ) : null}
                  </div>
                ))}
            </>
          ) : null}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ManufacturersDesc;
