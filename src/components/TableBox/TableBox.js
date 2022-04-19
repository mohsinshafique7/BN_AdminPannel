import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Styles } from "./style";
import { searchSort } from "../../utils/helpers";
import { Pagination, Empty } from "antd";
import SortedBox from "../SortedBox/SortedBox";

const TableBox = (props) => {
  const { data, page, perPage, setPage, setPerPage, tableHeader, tableData, searchValue, sortedValue, sortParams, titleParam, reverse } =
    props;
  console.log("data", data);
  let sortableData;
  try {
    sortableData = searchSort(data, searchValue, sortedValue, titleParam, reverse);
  } catch (e) {
    sortableData = data.filter((item) => Boolean(item));
  }

  const limit = page * perPage + perPage < sortableData.length ? page * perPage + perPage : sortableData.length;

  const renderData = sortableData.slice(page * perPage, limit);

  useEffect(() => {
    if (searchValue.length !== 0) {
      setPage(0);
    }
  }, [searchValue]);

  const onChangePage = (page, pageSize) => {
    setPage(page - 1);
  };

  const onChangeSize = (page, pageSize) => {
    setPerPage(pageSize);
  };

  return (
    <Styles>
      <SortedBox sortParams={sortParams} />
      <div>
        {tableHeader()}
        {renderData.length ? (
          renderData.map((item) => (
            <div className="item-box" key={item.id}>
              {tableData(item)}
            </div>
          ))
        ) : (
          <div className="empty-item">
            <Empty />
          </div>
        )}
      </div>
      <Pagination
        className="pagination-controls"
        total={sortableData.length}
        showTotal={(total) => `Total ${total} items`}
        pageSize={perPage}
        current={page + 1}
        onChange={onChangePage}
        onShowSizeChange={onChangeSize}
      />
    </Styles>
  );
};

export default connect(
  (state) => ({
    searchValue: state.filters.searchValue,
    sortedValue: state.filters.sortedValue,
    reverse: state.filters.reverse,
  }),
  null
)(TableBox);
