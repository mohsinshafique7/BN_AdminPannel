import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import { Link } from "react-router-dom";
import { getScrapperLinks, createScrapperLink } from "../../store/scrapperLinks/action";
import { getRetailers } from "../../store/retailers/action";
import { getCategories } from "../../store/categories/action";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import CoreForm from "../ModalFrom/CoreForm";
import SelectBox from "../ModalFrom/Select";
import TableBox from "../TableBox/TableBox";
import { ClearOutlined } from "@ant-design/icons";

const ScrapperLinksList = (props) => {
  const {
    scrapperLinks,
    getScrapperLinks,
    getRetailers,
    getCategories,
    match: { params },
    history,
  } = props;

  const inputData = [{ label: "Url", name: "url", type: "text", required: true }];

  const selectData = [
    {
      name: "retailer",
      value: "name",
      option: "name",
      action: getRetailers,
      store: "retailers",
      lable: "Change retailer",
      required: true,
      mode: false,
    },
    {
      name: "category",
      value: "name",
      option: "name",
      action: getCategories,
      store: "categories",
      lable: "Change category",
      required: true,
      mode: false,
    },
    {
      name: "categoryType",
      value: "name",
      option: "name",
      store: "categoryType",
      lable: "Change categoryType",
      required: true,
      mode: false,
    },
  ];

  const sortParams = [
    { label: "CategoryType", value: "categoryType" },
    { label: "Retailer", value: "retailerParser" },
    { label: "Category", value: "categoryParser" },
  ];

  const [queryParams, setQueryParams] = useState(qs.parse(params.param));
  const [filterLinksData, setFilterLinksData] = useState([]);

  const [clearSelect, setClearSelect] = useState({});

  const selectDataSearch = [
    { param: "retailer", value: "name", option: "name", lable: "Retailer", initialValue: queryParams.retailer },
    { param: "category", value: "name", option: "name", lable: "Category", initialValue: queryParams.category },
    {
      param: "categoryType",
      value: "name",
      option: "name",
      lable: "Category Type",
      initialValue: queryParams.categoryType,
    },
  ];

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/scrapper-links/${queryString}`);
  }, [queryParams, history]);

  useEffect(() => {
    getScrapperLinks();
  }, [getScrapperLinks]);

  useEffect(() => {
    if (scrapperLinks.length) {
      setFilterLinksData(scrapperLinks);
    }
  }, [scrapperLinks]);

  useEffect(() => {
    let filterData = scrapperLinks;

    Object.keys(queryParams).forEach((itemPatam) => {
      if (queryParams[itemPatam] && itemPatam !== "page" && itemPatam !== "perPage") {
        filterData = filterData.filter((item) => item[itemPatam] === queryParams[itemPatam]);
      }
    });

    setFilterLinksData(filterData);
  }, [queryParams, scrapperLinks]);

  const selectValueSet = (value) => {
    setQueryParams((queryParams) => Object.assign({}, queryParams, value));
  };

  const handleClearSelect = (name) => {
    setClearSelect([name]);

    setQueryParams((queryParams) => {
      return {
        ...queryParams,
        [name]: null,
        page: 0,
      };
    });
  };

  const onSendForm = (values) => {
    props.createScrapperLink(values);
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
      <div className="item-link">Url</div>
      <div className="item-date">Category Type</div>
      <div className="item-date">Retailer</div>
      <div className="item-date">Category</div>
    </div>
  );

  const tableData = (item) => (
    <>
      <Link className="item-link" to={`/scrapper-link/${[item.id]}`}>
        {[item.url]}
      </Link>
      <div className="item-date">{[item.categoryType]}</div>
      <div className="item-date">{[item.retailer]}</div>
      <div className="item-date">{[item.category]}</div>
    </>
  );

  return (
    <>
      <div className="item-title">Parser Links</div>
      <Search />
      <CoreForm title={"Create Scrapper Link"} inputData={inputData} selectData={selectData} onSendForm={onSendForm} />
      {props.scrapperLinks.length ? (
        <>
          <div className="wrapper-filter-categoty">
            <div className="title">Filter by category</div>
            {selectDataSearch.map((item, index) => (
              <div key={index} className="select-filter-categoty">
                <SelectBox
                  initialValue={item.initialValue}
                  selectData={selectValueSet}
                  actionParam={item.param}
                  value={item.value}
                  option={item.option}
                  initialId={item.initial}
                  lable={item.lable}
                  clearSelect={clearSelect}
                />
                <ClearOutlined onClick={() => handleClearSelect(item.param)} />
              </div>
            ))}
          </div>
          <TableBox
            data={filterLinksData}
            tableHeader={tableHeader}
            tableData={tableData}
            titleParam={"url"}
            sortParams={sortParams}
            page={Number(queryParams.page)}
            perPage={Number(queryParams.perPage)}
            setPage={setPage}
            setPerPage={setPerPage}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default connect(
  (state) => ({
    scrapperLinks: state.scrapperLinks.scrapperLinks,
  }),
  { getScrapperLinks, createScrapperLink, getRetailers, getCategories }
)(withRouter(ScrapperLinksList));
