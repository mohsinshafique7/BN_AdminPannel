import React, { useState, useRef } from "react";
import { Button, Modal, Form, Input, DatePicker } from "antd";
import SelectBox from "./SelectBox";
import UploadImg from "./UploadImg";
import SwitchBox from "./SwitchBox";

const CoreForm = (props) => {
  const { initialValue } = props;
  const [form] = Form.useForm();
  const formRef = useRef(null);

  const { TextArea } = Input;

  const [visible, setVisible] = useState(false);

  // useEffect(() => {
  //   if (initialValue) {
  //     form.setFieldsValue(initialValue);
  //   }
  // }, []);
  const switchData =
    props.switchData &&
    props.switchData.length &&
    props.switchData.map((item) => {
      const value = initialValue[item.name];
      return { ...item, default: value };
    });

  // const onFinish = (values) => {
  //   props.onSendForm(values);
  //   setVisible(false);
  //   formRef.current.resetFields();
  // };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        {props.title}
      </Button>
      <Modal
        // forceRender={true}
        //className={`modal-form ${props.className}`}
        title={props.title}
        visible={visible}
        okText="Submit"
        onCancel={() => setVisible(false)}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              setVisible(false);
              props.onSendForm(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          ref={formRef}
          form={form}
          name="core"
          initialValues={props.initialValue ? props.initialValue : ""}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
        >
          {props.uploadData ? <UploadImg handleSetImage={props.handleSetImage} initialImage={initialValue.image} /> : null}

          {props.inputData && props.inputData.length
            ? props.inputData.map((item, index) => (
                <Form.Item
                  key={index}
                  style={item?.display === false ? { display: "none" } : {}}
                  label={item.label}
                  name={item.name}
                  rules={[{ required: item.required, message: `Please input ${item.label}!` }]}
                >
                  <Input type={item.type} placeholder={item.label} />
                </Form.Item>
              ))
            : null}

          {props.passwordData && props.passwordData.length
            ? props.passwordData.map((item, index) => (
                <Form.Item
                  key={index}
                  label={item.label}
                  name={item.name}
                  rules={[
                    { required: item.required, message: `Please input ${item.label}!` },
                    { min: 8, message: "Password must be minimum 8 characters." },
                  ]}
                >
                  <Input.Password
                    pattern="^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-.]).{8,}$"
                    title="Password must contain at least one number and one special character"
                    type={item.type}
                    placeholder={item.label}
                  />
                </Form.Item>
              ))
            : null}

          {props.areaData && props.areaData.length
            ? props.areaData.map((item, index) => (
                <Form.Item
                  key={index}
                  label={item.label}
                  name={item.name}
                  rules={[{ required: item.required, message: `Please input ${item.label}!` }]}
                >
                  <TextArea placeholder={item.label} />
                </Form.Item>
              ))
            : null}

          {props.selectData && props.selectData.length
            ? props.selectData.map((item, index) => (
                <SelectBox
                  key={index}
                  categorySelect={item.categorySelect}
                  brandSelect={item.brandSelect}
                  store={item.store}
                  name={item.name}
                  lable={item.lable}
                  value={item.value}
                  option={item.option}
                  mode={item.mode}
                  required={item.required}
                />
              ))
            : null}
          <div>{switchData && switchData.length ? switchData.map((item, index) => <SwitchBox item={item} key={index} />) : null}</div>

          {props.selectDate && props.selectDate.length
            ? props.selectDate.map((item, index) => (
                <Form.Item key={index} label={item.label} name={item.name}>
                  <DatePicker />
                </Form.Item>
              ))
            : null}

          {/* <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};

export default CoreForm;
