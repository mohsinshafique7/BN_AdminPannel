import React, { useEffect, useState, useMemo } from "react";
import { Button } from "antd";
import { useSelector } from "react-redux";
import qs from "query-string";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import { useHistory, Link } from "react-router-dom";
import ProductGroupTable from "components/Tables/ProductGroupTable";
import { useGetAllCustomGroups, useUpdateCustomGroup } from "../../Requests/CustomGroupRequest";
const ProductGroupsList = () => {
  const history = useHistory();
  const { isLoading: customGroupsIsLoading, data: customGroupsData, status: customGroupListStatus } = useGetAllCustomGroups();
  const { mutate: updateCustomGroup } = useUpdateCustomGroup("list");
  const { searchValue } = useSelector((state) => {
    return {
      searchValue: state.filters.searchValue,
    };
  });

  const [queryParams, setQueryParams] = useState(qs.parse(history.location.search));

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/product-groups?${queryString}`);
  }, [queryParams, history]);

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

  const searchedData = useMemo(() => {
    return customGroupsData?.productGroups.filter((o) =>
      Object.keys(o).some((k) => String(o[k]).toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [searchValue, customGroupsData]);
  function handleProductGroupEdit(values) {
    const { name, id, userId, companyId } = values;
    values = { name, userId, companyId };
    updateCustomGroup({ id, values });
  }
  return (
    <>
      <div className="item-title">Product Groups</div>
      <Search />
      <Link to="/create-product-group/0">
        <Button type="primary">Create Product</Button>
      </Link>

      {customGroupListStatus === "success" && !customGroupsIsLoading ? (
        <ProductGroupTable
          data={searchedData}
          page={Number(queryParams.page)}
          perPage={Number(queryParams.perPage)}
          setPage={setPage}
          setPerPage={setPerPage}
          handleProductGroupEdit={handleProductGroupEdit}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProductGroupsList;
