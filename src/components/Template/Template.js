import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { withRouter } from "react-router-dom";
import {
  DesktopOutlined,
  PieChartOutlined,
  UserSwitchOutlined,
  GroupOutlined,
  FileProtectOutlined,
  ControlOutlined,
  SettingOutlined,
  NotificationOutlined,
  WarningOutlined,
  CodeSandboxOutlined,
  HeatMapOutlined,
  SubnodeOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { Styles } from "./style";
import Header from "../Header/Header";
import logo1 from "../../assets/images/general-logo-white.svg";

const { Content, Sider } = Layout;

const Template = (props) => {
  const [collapsed, setCollaps] = useState(JSON.parse(localStorage.getItem("Collapsed")));
  const [activeLink, setActiveLink] = useState(null);

  const onCollapse = (collapsed) => {
    setCollaps(collapsed);
    localStorage.setItem("Collapsed", collapsed);
  };

  useEffect(() => {
    const activeLink = props.location.pathname.split("/")[1];
    setActiveLink(activeLink);
  }, [props.location.pathname]);

  return (
    <Styles>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo">
            <img src={logo1} alt="logo" />
          </div>
          <Menu theme="dark" selectedKeys={[activeLink]} mode="inline">
            <Menu.Item key="users">
              <Link to={"/users/company&page=0&perPage=10"}>
                <UserSwitchOutlined />
                <span className="color-selected">Users</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="manufacturers">
              <Link to={"/manufacturers/page=0&perPage=10"}>
                <PieChartOutlined />
                <span className="color-selected">Manufacturers</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="brands">
              <Link to={"/brands/page=0&perPage=10"}>
                <DesktopOutlined />
                <span className="color-selected">Brands</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="retailers">
              <Link to={"/retailers/page=0&perPage=10"}>
                <ControlOutlined />
                <span className="color-selected">Retailers</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="categories">
              <Link to={"/categories/page=0&perPage=10"}>
                <GroupOutlined />
                <span className="color-selected">Categories</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="product-groups">
              <Link to={"/product-groups/page=0&perPage=10"}>
                <FileProtectOutlined />

                <span className="color-selected">Custom Groups</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="companies">
              <Link to={"/companies/page=0&perPage=10"}>
                <ContainerOutlined />
                <span className="color-selected">Companies</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="core-products">
              <Link
                to={
                  "/core-products/direction=ASC&noBrand=false&notReviewed=false&noCategory=false&issues=false&order=title&page=1&perPage=10&productId=null"
                }
              >
                <CodeSandboxOutlined />
                <span className="color-selected">Core Products</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="scraper-settings">
              <Link to={"/scraper-settings/page=0&perPage=10"}>
                <SettingOutlined />
                <span className="color-selected">Parser Settings</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="mapping-suggestions">
              <Link to={"/mapping-suggestions/mapping/page=1&perPage=10"}>
                <HeatMapOutlined />
                <span className="color-selected">Product Mapping</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="notifications">
              <Link to={"/notifications/notification/page=0&perPage=10"}>
                <NotificationOutlined />
                <span className="color-selected">Notifications</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="subscriptions">
              <Link to={"/subscriptions"}>
                <SubnodeOutlined />
                <span className="color-selected">Subscriptions</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="errors">
              <Link to={"/errors/page=0&perPage=10"}>
                <WarningOutlined />
                <span className="color-selected">Errors</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header />
          <Content>
            <div className="site-layout-background">{props.component}</div>
          </Content>
        </Layout>
      </Layout>
    </Styles>
  );
};

export default withRouter(Template);
