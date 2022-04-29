import React from "react";
import { Layout, Button } from "antd";
import styled from "styled-components";
import { connect } from "react-redux";
import { logOut } from "../../store/auth/action";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
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
        <Avatar size={40} icon={<UserOutlined />} />
        <Button type="primary" onClick={() => props.logOut()}>
          Log Out
        </Button>
      </Header>
    </Styles>
  );
};

export default connect(null, { logOut })(Header);
