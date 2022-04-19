import React from "react";
import { Link } from "react-router-dom";
import { Checkbox, Empty } from "antd";
import TableBox from "../TableBox/TableBox";
import Search from "../Search/Search";
import Loader from "../Loader/Loader";
import { STATE_STATUSES } from "../../utils/app";
import { useDispatch, useSelector } from "react-redux";
import { subscribeCompanyToCategory, unsubscribeCompanyToCategory, getCompanyCategories } from "store/companies/action";

const CategoriesTable = ({ categories, setPage, setPerPage, page, perPage, companyCategories, companyId }) => {
  const sortParams = [{ label: "Category", value: "category" }];
  const dispatch = useDispatch();

  const { status } = useSelector((state) => state.companies);

  const isChecked = (itemId) => {
    return companyCategories.some(({ categoryId }) => categoryId === itemId);
  };

  const tableHeader = () => (
    <div className="item-box header">
      <div className="item-link">Category</div>
    </div>
  );

  const changeSubscription = (id) => {
    const data = { ids: String(id), companyId: String(companyId) };
    if (isChecked(id)) {
      dispatch(unsubscribeCompanyToCategory(data)).then(() => dispatch(getCompanyCategories(companyId)));
    } else {
      dispatch(subscribeCompanyToCategory(data)).then(() => dispatch(getCompanyCategories(companyId)));
    }
  };

  const tableData = (item) => {
    const name = item.breadcrumbs.length ? `${item.breadcrumbs.join(" / ")} / ${item.name}` : item.name;
    return (
      <>
        <Link className="item-link" to={`/category/${item.id}/page=0&perPage=10`}>
          {name}
        </Link>
        <div className="checkboxes-wrap">
          <Checkbox onChange={() => changeSubscription(item.id)} checked={isChecked(item.id)}>
            Subscription
          </Checkbox>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="item-title">Categories</div>
      {status !== STATE_STATUSES.PENDING ? (
        <>
          {categories && categories.length ? (
            <>
              <Search />
              <TableBox
                data={categories}
                tableHeader={tableHeader}
                tableData={tableData}
                titleParam={"name"}
                sortParams={sortParams}
                page={Number(page)}
                perPage={Number(perPage)}
                setPage={setPage}
                setPerPage={setPerPage}
              />
            </>
          ) : (
            <div className="empty-item">
              <Empty />
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CategoriesTable;
