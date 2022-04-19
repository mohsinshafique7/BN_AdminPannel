import React from "react";
import { Layout, Button } from "antd";
import styled from "styled-components";
import { connect } from "react-redux";
import { logOut } from "../../store/auth/action";

export const Styles = styled.div`
  .ant-layout-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    line-height: inherit;
  }
`;

const Header = (props) => {
  const { Header } = Layout;

  return (
    <Styles>
      <Header className="site-layout-background">
        <Button type="primary" onClick={() => props.logOut()}>
          Log Out
        </Button>
      </Header>
    </Styles>
  );
};

export default connect(null, { logOut })(Header);
