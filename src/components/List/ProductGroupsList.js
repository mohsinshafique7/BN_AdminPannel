import React, { useEffect, useState, useMemo } from "react";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import ProductGroupTable from "components/Tables/ProductGroupTable";
import { useGetAllCustomGroups, useUpdateCustomGroup } from "../../Requests/CustomGroupRequest";
const ProductGroupsList = (props) => {
  const {
    match: { params },
    history,
  } = props;
  const { isLoading: customGroupsIsLoading, data: customGroupsData, status: customGroupListStatus } = useGetAllCustomGroups();
  const { mutate: updateCustomGroup } = useUpdateCustomGroup("list");
  const { searchValue } = useSelector((state) => {
    return {
      searchValue: state.filters.searchValue,
    };
  });

  const [queryParams, setQueryParams] = useState(qs.parse(params.param));

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/product-groups/${queryString}`);
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
    const search = new RegExp(searchValue, "gi");

    return customGroupsData?.productGroups.filter(
      (item) =>
        item.name.match(search) ||
        item?.user?.first_name.match(search) ||
        item?.user?.last_name.match(search) ||
        item?.company?.name.match(search)
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
      <Button type="primary" href={"/create-product-group/0"}>
        Create Product
      </Button>
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

export default withRouter(ProductGroupsList);
