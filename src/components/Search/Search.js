import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Input } from "antd";
import { setSearchValue } from "../../store/filters/action";

export const Styles = styled.div`
  .ant-input-search {
    max-width: 900px;
    width: 100%;
    display: flex;
    margin: 25px auto;
  }
`;

const SearchInput = () => {
  const dispatch = useDispatch();

  const { Search } = Input;

  useEffect(() => {
    dispatch(setSearchValue(""));
  }, [dispatch]);

  return (
    <Styles>
      <Search placeholder="input search text" onChange={(e) => dispatch(setSearchValue(e.target.value))} />
    </Styles>
  );
};

export default SearchInput;
