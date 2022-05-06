import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import moment from "moment";
import { Tabs } from "antd";
import { Popconfirm, Button } from "antd";
import styled from "styled-components";
import CoreForm from "../ModalFrom/CoreForm";
import SubscriptionsTab from "../CompanyTables/SubscriptionsTab";
import SectionTab from "components/CompanyTables/SectionTab";
import { useGetAllManufacturers } from "../../Requests/ManufacturerRequest";
import { useGetAllRetailers } from "../../Requests/RetailerRequest";
import {
  useGetSingleCompany,
  useGetCompanyCategories,
  useUpdateCompany,
  useUpdateCompanyManufacturers,
  useUpdateCompanyRetailers,
  useDeleteCompany,
} from "../../Requests/CompanyRequest";
import CompaniesTable from "components/Tables/CompaniesTable";
import RetailerTable from "components/Tables/RetailerTable";
import CategoryTable from "components/Tables/CategoryTable";
const Styles = styled.div`
  .manufacture-item {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
    margin-top: 15px;
    span {
      font-weight: normal;
    }
  }
  .brands-title {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }
  .item-wrapper {
    margin-bottom: 25px;
  }
  .item-title.manufacturers {
    margin-bottom: 25px;
  }
`;

const CompanyDesc = ({ history, match: { params } }) => {
  const { TabPane } = Tabs;
  const { data: manufacturerData } = useGetAllManufacturers();
  const { data: retailersData } = useGetAllRetailers();
  const { isLoading: companyCategoriesDataIsLoading, data: companyCategoriesData } = useGetCompanyCategories(params.id);
  const { mutate: updateCompany } = useUpdateCompany("single");
  const { mutate: updateCompanyManufacturer } = useUpdateCompanyManufacturers();
  const { mutate: updateCompanyRetailer } = useUpdateCompanyRetailers();
  const { mutate: deleteCompany } = useDeleteCompany(history);

  const { isLoading: companyDataIsLoading, data: companyData } = useGetSingleCompany(params.id);
  const inputData = [{ label: "Name", name: "name", type: "text", required: true }];
  const selectDate = [{ label: "Start Date", name: "filtersStartDate" }];

  const selectDataManufacturer = [
    {
      name: "manufacturers",
      value: "id",
      option: "name",
      store: manufacturerData?.manufacturers,
      lable: "Change manufacturers",
      required: false,
      mode: "multiple",
    },
  ];

  const selectDataRetailer = [
    {
      name: "retailers",
      value: "id",
      option: "name",
      store: retailersData?.retailers,
      lable: "Change retailers",
      required: false,
      mode: "multiple",
    },
  ];

  const initialValue = {
    name: companyData?.company?.name,
  };

  const [queryParams, setQueryParams] = useState(qs.parse(params.param));

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/company/${params.id}/${params.tab}/${queryString}`);
  }, [queryParams, history, params.id, params.tab]);

  const handleDelete = () => {
    deleteCompany(params.id);
  };

  const onSendForm = (values) => {
    updateCompany({ data: values, id: params.id });
  };

  const editManufacturer = (values) => {
    const { manufacturers } = values;
    updateCompanyManufacturer({ data: { manufacturers }, id: params.id });
  };

  const editRetailer = (values) => {
    const { retailers } = values;
    updateCompanyRetailer({ data: { retailers }, id: params.id });
  };

  const editStartDate = (values) => {
    const filtersStartDate = !!values.filtersStartDate ? values.filtersStartDate.format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
    console.log(filtersStartDate);
    const data = { filtersStartDate };
    updateCompany({ id: params.id, data });
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
    history.replace(`/company/${params.id}/${key}/page=0&perPage=10`);
    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        page: 0,
      };
    });
  };

  return (
    <Styles>
      {!companyDataIsLoading && !companyCategoriesDataIsLoading ? (
        <>
          <div className="item-title">Company Details</div>
          <div className="item-wrapper">
            <div className="description-box">
              <div className="title-item-desc">
                Created At: <span>{moment(companyData?.company?.createdAt).format("MMMM Do YYYY, h:mm")}</span>
              </div>
              <div className="title-item-desc">
                Updated At: <span>{moment(companyData?.company?.updatedAt).format("MMMM Do YYYY, h:mm")}</span>
              </div>
              <div className="title-item-desc">
                Started Date:{" "}
                <span>
                  {companyData?.company?.filtersStartDate
                    ? moment(companyData?.company?.filtersStartDate).format("MMMM Do YYYY")
                    : "No Date"}
                </span>
              </div>
              <div className="title-item-desc">
                Name: <span>{companyData?.company?.name}</span>
              </div>
            </div>
            <div className="controls-box">
              <Popconfirm
                onConfirm={() => handleDelete(params.id)}
                title={`Are you sure you want to delete company ${companyData?.company?.name}？`}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger>
                  Delete
                </Button>
              </Popconfirm>
              <CoreForm title={"Edit Company Name"} initialValue={initialValue} inputData={inputData} onSendForm={onSendForm} />
              <CoreForm
                title={"Edit Manufacturer"}
                // initialValue={{ manufacturers }}
                selectData={selectDataManufacturer}
                onSendForm={editManufacturer}
              />
              <CoreForm
                title={"Edit Retailer"}
                // initialValue={{ retailers }}
                selectData={selectDataRetailer}
                onSendForm={editRetailer}
              />
              <CoreForm
                title={"Edit Start Date"}
                initialValue={{
                  filtersStartDate: companyData?.company?.filtersStartDate ? moment(companyData?.company?.filtersStartDate) : moment(),
                }}
                selectDate={selectDate}
                onSendForm={editStartDate}
              />
            </div>
          </div>
          <Tabs defaultActiveKey={params.tab} onChange={callback}>
            <TabPane tab="Subscriptions" key="subscriptions">
              <SubscriptionsTab companyId={params.id} />
            </TabPane>
            <TabPane tab="Manufacturers" key="manufacturer" disabled={companyData?.company?.manufacturer.length === 0}>
              <CompaniesTable
                data={companyData?.company?.manufacturer}
                page={Number(queryParams.page)}
                perPage={Number(queryParams.perPage)}
                setPage={setPage}
                setPerPage={setPerPage}
                handleEditCompany={() => {
                  console.log("Not Editbale");
                }}
                showEdit={false}
              />
            </TabPane>
            <TabPane tab="Retailers" key="retailer" disabled={companyData?.company?.retailer?.lenght === 0}>
              <RetailerTable
                data={companyData?.company?.retailer}
                page={Number(queryParams.page)}
                perPage={Number(queryParams.perPage)}
                setPage={setPage}
                setPerPage={setPerPage}
                showEdit={false}
              />
            </TabPane>
            <TabPane tab="Categories" key="categories" disabled={companyCategoriesData?.categories?.lenght === 0}>
              <CategoryTable
                data={companyCategoriesData?.categories}
                page={Number(queryParams.page)}
                perPage={Number(queryParams.perPage)}
                setPage={setPage}
                setPerPage={setPerPage}
                changeSubscription={() => {
                  console.log("Change Subscription");
                }}
                handleCategoryEdit={() => {
                  console.log("Not Editable");
                }}
                showEdit={false}
              />
            </TabPane>
            <TabPane tab="Section" key="section">
              <SectionTab companyId={params.id} />
            </TabPane>
          </Tabs>
        </>
      ) : (
        <Loader />
      )}
    </Styles>
  );
};

export default withRouter(CompanyDesc);
