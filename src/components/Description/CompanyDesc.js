import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getCompany,
  getCompanyCategories,
  deleteCompany,
  editCompany,
  editCompanyManufacturer,
  editCompanyReatailer,
  editCompanySourceCategory,
} from "../../store/companies/action";
import { getManufacturers } from "../../store/manufacturersBrands/action";
import { setSortedValue, setSearchValue } from "../../store/filters/action";
import { getRetailers } from "../../store/retailers/action";
import { getSourceCategories } from "../../store/sourceCategories/action";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import moment from "moment";
import { Tabs } from "antd";
import { Popconfirm, Button } from "antd";
import styled from "styled-components";
import CoreForm from "../ModalFrom/CoreForm";

import ManufacturerTable from "../CompanyTables/ManufacturerTable";
import RetailerTable from "../CompanyTables/RetailerTable";
import SubscriptionsTab from "../CompanyTables/SubscriptionsTab";
import CategoriesTable from "components/CompanyTables/CategoriesTable";
import SectionTab from "components/CompanyTables/SectionTab";

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

const CompanyDesc = ({
  getCompany,
  editCompany,
  getCompanyCategories,
  deleteCompany,
  editCompanyManufacturer,
  editCompanyReatailer,
  editCompanySourceCategory,
  getManufacturers,
  getRetailers,
  getSourceCategories,
  setSortedValue,
  setSearchValue,
  status,
  company: { createdAt, updatedAt, name, id, manufacturer, retailer, sourceCategory, filtersStartDate },
  categories,
  companyCategories,
  history,
  match: { params },
}) => {
  const { TabPane } = Tabs;

  const inputData = [{ label: "Name", name: "name", type: "text", required: true }];
  const selectDate = [{ label: "Start Date", name: "filtersStartDate" }];

  const selectDataManufacturer = [
    {
      name: "manufacturers",
      value: "id",
      option: "name",
      action: getManufacturers,
      store: "manufacturers",
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
      action: getRetailers,
      store: "retailers",
      lable: "Change retailers",
      required: false,
      mode: "multiple",
    },
  ];

  const selectDataSourceCategory = [
    {
      name: "sourceCategories",
      value: "id",
      option: "name",
      action: getSourceCategories,
      store: "sourceCategory",
      lable: "Change source categories",
      required: false,
      mode: "multiple",
    },
  ];

  const initialValue = {
    name,
  };

  const [manufacturers, setManufacturers] = useState([]);
  const [retailers, setRetailers] = useState([]);
  const [sourceCategories, setSourceCategories] = useState([]);

  const [queryParams, setQueryParams] = useState(qs.parse(params.param));

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/company/${params.id}/${params.tab}/${queryString}`);
  }, [queryParams, history, params.id, params.tab]);

  useEffect(() => {
    getCompany(params.id);
    getCompanyCategories(params.id);
  }, [getCompany, params.id]);

  useEffect(() => {
    if (manufacturer && manufacturer.length) {
      const ids = manufacturer.map((item) => item.id);

      setManufacturers(ids);
    } else {
      setManufacturers([]);
    }
  }, [manufacturer]);

  useEffect(() => {
    if (retailer && retailer.length) {
      const ids = retailer.map((item) => item.id);

      setRetailers(ids);
    } else {
      setRetailers([]);
    }
  }, [retailer]);

  useEffect(() => {
    if (sourceCategory && sourceCategory.length) {
      const ids = sourceCategory.map((item) => item.id);

      setSourceCategories(ids);
    } else {
      setSourceCategories([]);
    }
  }, [sourceCategory]);

  const handleDelete = (id) => {
    deleteCompany(id).then(() => {
      history.push("/companies/page=0&perPage=10");
    });
  };

  const onSendForm = (values) => {
    editCompany(values, id);
  };

  const editManufacturer = (values) => {
    const { manufacturers } = values;
    editCompanyManufacturer({ manufacturers }, id);
  };

  const editRetailer = (values) => {
    const { retailers } = values;
    editCompanyReatailer({ retailers }, id);
  };

  const editStartDate = (values) => {
    const filtersStartDate = !!values.filtersStartDate ? values.filtersStartDate.format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
    values.filtersStartDate = filtersStartDate;
    editCompany(values, id);
  };

  const editSourceCategory = (values) => {
    const { sourceCategories } = values;
    editCompanySourceCategory({ sourceCategories }, id);
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
    setSortedValue(key);
    setSearchValue("");

    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        page: 0,
      };
    });
  };

  return (
    <Styles>
      <div className="item-title">Company Details</div>
      <div className="item-wrapper">
        <div className="description-box">
          <div className="title-item-desc">
            Created At: <span>{moment(createdAt).format("MMMM Do YYYY, h:mm")}</span>
          </div>
          <div className="title-item-desc">
            Updated At: <span>{moment(updatedAt).format("MMMM Do YYYY, h:mm")}</span>
          </div>
          <div className="title-item-desc">
            Started Date: <span>{filtersStartDate ? moment(filtersStartDate).format("MMMM Do YYYY") : "No Date"}</span>
          </div>
          <div className="title-item-desc">
            Name: <span>{name}</span>
          </div>
        </div>
        <div className="controls-box">
          <Popconfirm
            onConfirm={() => handleDelete(id)}
            title={`Are you sure you want to delete company ${name}？`}
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
            initialValue={{ manufacturers }}
            selectData={selectDataManufacturer}
            onSendForm={editManufacturer}
          />
          <CoreForm title={"Edit Retailer"} initialValue={{ retailers }} selectData={selectDataRetailer} onSendForm={editRetailer} />
          <CoreForm
            title={"Edit Start Date"}
            initialValue={{ filtersStartDate: filtersStartDate ? moment(filtersStartDate) : moment() }}
            selectDate={selectDate}
            onSendForm={editStartDate}
          />

          {/* <CoreForm
            title={"Edit Source Category"}
            initialValue={{ sourceCategories }}
            selectData={selectDataSourceCategory}
            onSendForm={editSourceCategory}
          /> */}
        </div>
      </div>

      <Tabs defaultActiveKey={params.tab} onChange={callback}>
        <TabPane tab="Subscriptions" key="subscriptions">
          <SubscriptionsTab companyId={params.id} />
        </TabPane>
        <TabPane tab="Manufacturers" key="manufacturer" disabled={manufacturer && manufacturer.length === 0}>
          <ManufacturerTable
            status={status}
            dataTable={manufacturer}
            setPage={setPage}
            setPerPage={setPerPage}
            page={queryParams.page}
            perPage={queryParams.perPage}
          />
        </TabPane>
        <TabPane tab="Retailers" key="retailer" disabled={retailer && retailer.length === 0}>
          <RetailerTable
            status={status}
            dataTable={retailer}
            setPage={setPage}
            setPerPage={setPerPage}
            page={queryParams.page}
            perPage={queryParams.perPage}
          />
        </TabPane>
        <TabPane tab="Categories" key="categories" disabled={!categories.length && !companyCategories.length}>
          <CategoriesTable
            categories={categories}
            companyCategories={companyCategories}
            setPage={setPage}
            setPerPage={setPerPage}
            page={queryParams.page}
            perPage={queryParams.perPage}
            companyId={params.id}
          />
        </TabPane>
        <TabPane tab="Section" key="section">
          <SectionTab companyId={params.id} />
        </TabPane>
      </Tabs>
    </Styles>
  );
};

export default connect(
  (state) => ({
    company: state.companies.company,
    categories: state.companies.categories,
    companyCategories: state.companies.companyCategories,
    status: state.manufacturersBrands.status,
  }),
  {
    getCompany,
    deleteCompany,
    editCompany,
    editCompanyManufacturer,
    editCompanyReatailer,
    editCompanySourceCategory,
    getManufacturers,
    getRetailers,
    getSourceCategories,
    setSortedValue,
    setSearchValue,
    getCompanyCategories,
  }
)(withRouter(CompanyDesc));
