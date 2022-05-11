import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import qs from "query-string";
import moment from "moment";
import { Popconfirm, Button, Tabs } from "antd";
import styled from "styled-components";
import CoreForm from "../ModalFrom/CoreForm";
import BrandsTable from "components/Tables/BrandsTable";
import { brandsEditInputs } from "../../utils/FormInputs/BrandFormInputs";
import { useGetSingleBrand, useGetAllBrands, useUpdateBrand, useDeleteBrand } from "../../Requests/BrandRequest";
import { useGetAllManufacturers } from "../../Requests/ManufacturerRequest";
import { useParams, useHistory } from "react-router-dom";

const Styles = styled.div`
  .check-item {
    display: inline-block;
    border-radius: 4px;
    margin: 4px 8px;
    border: 1px solid #ccc;
    padding: 4px 8px;
    font-size: 14px;
  }
  .title-core-product {
    text-align: center;
    font-size: 36px;
    margin-top: 30px;
  }
  .item-wrapper {
    margin-bottom: 25px;
  }
  .empty-item {
    margin-top: 25px;
  }
`;

const BrandDesc = () => {
  const params = useParams();
  const history = useHistory();

  const { TabPane } = Tabs;
  const { isLoading: brandIsLoading, data: brandData } = useGetSingleBrand(params.id);
  const { mutate: updateBrand } = useUpdateBrand("single");
  const { mutate: deleteBrand } = useDeleteBrand("brandDes", history);

  const { isLoading: brandsIsLoading, data: brandsData } = useGetAllBrands();
  const { isLoading: manufacturerIsLoading, data: manufacturerData } = useGetAllManufacturers();
  const [inputs, setInputs] = useState(null);
  useEffect(() => {
    if (!manufacturerIsLoading && !brandsIsLoading) {
      setInputs(brandsEditInputs(manufacturerData?.manufacturers, brandsData?.brands));
    }
  }, [manufacturerIsLoading, brandsIsLoading, manufacturerData, brandsData]);

  const initialValue = {
    id: params.id,
    name: brandData?.brand?.name,
    manufacturerId: brandData?.brand?.manufacturerId,
    brandId: brandData?.brand?.brandId,
    color: brandData?.brand?.color,
  };

  const divStyle = {
    color: brandData?.brand?.color,
  };

  const [queryParams, setQueryParams] = useState(qs.parse(params.param));

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/brand/${params.id}/${params.tab}/${queryString}`);
  }, [queryParams, history, params.id, params.tab]);

  const handleDelete = (id) => {
    deleteBrand(id);
  };
  const onFinishEdit = (values) => {
    const id = values.id;
    delete values["id"];
    updateBrand({ id, values });
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

  const callback = (key) => {
    history.replace(`/brand/${params.id}/${key}/page=0&perPage=10`);
    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        page: 0,
      };
    });
  };

  return (
    <Styles>
      <Button type="primary" onClick={() => history.goBack()}>
        Go Back
      </Button>
      <div className="item-title">Brand Details</div>
      {inputs && !brandIsLoading && !brandsIsLoading && !manufacturerIsLoading ? (
        <>
          <div className="item-wrapper">
            <div className="description-box">
              <div className="title-item-desc">
                Created At: <span>{moment(brandData?.brand?.createdAt).format("MMMM Do YYYY, h:mm")}</span>
              </div>
              <div className="title-item-desc">
                Updated At: <span>{moment(brandData?.brand?.updatedAt).format("MMMM Do YYYY, h:mm")}</span>
              </div>
              <div className="title-item-desc">
                Colour: <span style={divStyle}>{brandData?.brand?.color}</span>
              </div>
              <div className="title-item-desc">
                Name: <span>{brandData?.brand?.name}</span>
              </div>
              {brandData?.brand?.manufacture && (
                <div className="title-item-desc">
                  Manufacture: <span>{brandData?.brand?.manufacture?.name}</span>
                </div>
              )}
            </div>
            <div className="controls-box">
              <Popconfirm
                onConfirm={() => handleDelete(params.id)}
                title={`Are you sure you want to delete brand ${brandData?.brand?.name}？`}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger>
                  Delete
                </Button>
              </Popconfirm>

              <CoreForm
                title={"Edit Brand"}
                initialValue={initialValue}
                selectData={inputs.selectData}
                inputData={inputs.inputData}
                brandSelect={true}
                onSendForm={onFinishEdit}
              />
            </div>
          </div>

          <Tabs defaultActiveKey={params.tab} onChange={callback}>
            <TabPane tab="Child Brands" key="brand" disabled={brandData?.brand?.child.length > 0 ? false : true}>
              <BrandsTable
                data={brandData?.brand?.child}
                page={Number(queryParams.page)}
                perPage={Number(queryParams.perPage)}
                setPage={setPage}
                setPerPage={setPerPage}
                onFinishEdit={() => {
                  console.log("");
                }}
              />
            </TabPane>
            {/* <TabPane tab="Core Products" key="coreProduct" disabled={coreProducts && coreProducts.length === 0}>
              <ProductsTable
                status={status}
                dataTable={coreProducts}
                setPage={setPage}
                setPerPage={setPerPage}
                page={queryParams.page}
                perPage={queryParams.perPage}
              />
            </TabPane> */}
          </Tabs>
        </>
      ) : (
        <Loader />
      )}
    </Styles>
  );
};

export default BrandDesc;
