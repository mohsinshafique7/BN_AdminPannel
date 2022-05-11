import React from "react";
import { Layout, Button } from "antd";
import styled from "styled-components";
import { connect } from "react-redux";
import { logOut } from "../../store/auth/action";

import { useSelector } from "react-redux";
export const Styles = styled.div`
  .ant-layout-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    line-height: inherit;
  }
`;

const Header = (props) => {
  const state = useSelector((state) => state?.auth?.user);
  console.log("Satte", state);
  const { Header } = Layout;

  return (
    <Styles>
      <Header data-test="header" className="site-layout-background">
        <div>
          <Button type="primary" onClick={() => props.logOut()}>
            Log Out
          </Button>
        </div>
      </Header>
    </Styles>
  );
};

export default connect(null, { logOut })(Header);
