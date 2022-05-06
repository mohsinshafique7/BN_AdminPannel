import React from "react";
import { Layout, Button } from "antd";
import styled from "styled-components";
import { connect } from "react-redux";
import { logOut } from "../../store/auth/action";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
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
      <Header className="site-layout-background">
        <div>
          <Button type="primary" onClick={() => props.logOut()}>
            Log Out
          </Button>
          <Avatar style={{ marginLeft: "10px" }} size={40} src={state?.avatar} alt={<UserOutlined />} />
        </div>
      </Header>
    </Styles>
  );
};

export default connect(null, { logOut })(Header);
