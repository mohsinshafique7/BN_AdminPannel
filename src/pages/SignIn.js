import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Input, Button, Alert } from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";
import icon from "../assets/images/logo.svg";
import { requestLogIn } from "../store/auth/action";
const Styles = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .signin-box {
    min-height: 550px;
    max-width: 60%;
    min-width: 900px;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  .title {
    text-align: left;
    margin-bottom: 20px;
    font-size: 36px;
    font-weight: 700;
  }
  img {
    min-height: 550px;
    width: 100%;
    max-width: 500px;
  }
  form {
    padding: 2rem;
    width: 100%;
  }
  .ant-form-item {
    flex-direction: column;
    align-items: flex-start;
  }
  .ant-form-horizontal .ant-form-item-control {
    width: 100%;
    height: 44px;
  }
  .ant-btn {
    width: 100%;
    height: 48px;
    margin-top: 20px;
  }
  .ant-input-affix-wrapper {
    .ant-input {
      height: 34px;
    }
  }
  .ant-input {
    height: 44px;
  }
  .ant-input-suffix {
    display: flex;
    align-items: center;
  }
`;

const SignIn = (props) => {
  const [isError, setIsError] = useState(false);

  const onFinish = (values) => {
    props.requestLogIn(values).catch(() => setIsError(true));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Styles>
      <div className="signin-box">
        <img src={icon} alt="img" />
        <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          {isError && (
            <>
              <Alert message="Error" description="Wrong password or email" type="error" showIcon />
              <br />
            </>
          )}
          <div className="title">Sign In</div>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Styles>
  );
};

export default connect(null, { requestLogIn })(withRouter(SignIn));
