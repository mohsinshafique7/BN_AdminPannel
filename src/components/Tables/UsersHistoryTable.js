import React, { useState } from "react";
import { Table, Pagination } from "antd";
import Loader from "../Loader/Loader";
import moment from "moment";
import styled from "styled-components";
import { useGetUserHistory } from "../../Requests/UsersRequest";

export const Styles = styled.div`
  margin-top: 15px;
  .ant-table-cell {
    padding: 10px;
    vertical-align: middle;
  }
  .pagination-controls {
    display: flex;
    justify-content: center;
    margin-top: 25px;
  }
`;
const UsersHistoryTable = ({ id }) => {
  const [postParams, setPostParams] = useState({ page: 1, perPage: 10 });
  const { isLoading: userHistoryIsLoading, data: userHistoryData } = useGetUserHistory({ id, params: postParams });
  const dataSource = userHistoryData?.history?.rows.map((item) => {
    return {
      key: item.id,
      path: item.path,
      createdAt: item.createdAt,
    };
  });
  const onChangePage = (page, pageSize) => {
    setPostParams((postParams) => {
      return {
        ...postParams,
        page,
      };
    });
  };

  const onChangePerPage = (page, perPage) => {
    setPostParams((postParams) => {
      return {
        ...postParams,
        perPage,
      };
    });
  };
  const columns = [
    {
      title: "Path",
      dataIndex: "path",
      key: "path",
      width: "90%",
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "10%",
      render: (text) => moment(text).format("MMMM Do YYYY, h:mm"),
    },
  ];
  return (
    <Styles>
      {!userHistoryIsLoading ? (
        <>
          <Table dataSource={dataSource} columns={columns} pagination={false} />

          <Pagination
            className="pagination-controls"
            total={userHistoryData?.history?.count}
            showTotal={(total) => `Total ${total} items`}
            pageSize={postParams.perPage}
            current={postParams.page}
            onChange={onChangePage}
            onShowSizeChange={onChangePerPage}
          />
        </>
      ) : (
        <Loader />
      )}
    </Styles>
  );
};

export default UsersHistoryTable;
