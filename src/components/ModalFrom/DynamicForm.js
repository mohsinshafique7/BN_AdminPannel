import React, { useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const DynamicForm = (props) => {

    useEffect(() => {
      if(props.checkList && props.checkList.length) {
        document.getElementById("create_check_list").click()
      }
    }, [props.checkList])

    return (
        <Form.List name="checkList">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                //   {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? '' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input passenger's name or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="name item" style={{ width: '93%' }} />
                    </Form.Item>
                    <MinusCircleOutlined
                        className="dynamic-delete-button"
                        style={{ margin: '0 8px' }}
                        onClick={() => {
                        remove(field.name);
                        }}
                    />
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add()
                  }}
                  style={{ width: '100%' }}
                >
                  <PlusOutlined /> Add check list
                </Button>
              </Form.Item>
              <span
                id="create_check_list"
                onClick={() => {
                  props.checkList.map(item => add(item))
                }}
              >
              </span>
            </div>
          );
        }}
      </Form.List>
    )
}

export default DynamicForm