import styled from "styled-components";
import "antd/dist/antd.css";

export const Styles = styled.div`
  .ant-layout-content {
    padding: 25px;
  }
  .logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 65px;
      width: 100%;
      margin: 0 6px;
    }
  }
  .ant-layout-content {
    flex: none;
  }
  .ant-menu.ant-menu-dark.ant-menu-root.ant-menu-inline {
    @media (max-height: 768px) {
      overflow-y: scroll;
      height: calc(100vh - 110px);
    }
  }
`;
