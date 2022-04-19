import React, { useEffect, useState, useMemo } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import { getProductGroups } from "../../store/productGroups/action";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import { STATE_STATUSES } from "../../utils/app";
import ProductGroupTable from "components/Tables/ProductGroupTable";

const ProductGroupsList = (props) => {
  const {
    match: { params },
    history,
  } = props;
  const { productGroups, status, searchValue } = useSelector((state) => {
    return {
      productGroups: state.productGroups.productGroups,
      status: state.productGroups.status,
      searchValue: state.filters.searchValue,
    };
  });
  const dispatch = useDispatch();
  const [queryParams, setQueryParams] = useState(qs.parse(params.param));

  useEffect(() => {
    const queryString = qs.stringify(queryParams);
    history.replace(`/product-groups/${queryString}`);
  }, [queryParams, history]);

  useEffect(() => {
    dispatch(getProductGroups());
  }, [dispatch]);

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

    return productGroups.filter(
      (item) =>
        item.name.match(search) ||
        item?.user?.first_name.match(search) ||
        item?.user?.last_name.match(search) ||
        item?.company?.name.match(search)
    );
  }, [searchValue, productGroups]);

  return (
    <>
      <div className="item-title">Product Groups</div>
      <Search />
      <Button type="primary" href={"/create-product-group/0"}>
        Create Product
      </Button>
      {status !== STATE_STATUSES.PENDING ? (
        <ProductGroupTable
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

export default withRouter(ProductGroupsList);
