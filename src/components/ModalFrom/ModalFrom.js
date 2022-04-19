import React, { useState, useEffect, useRef } from 'react'
import { Button, Modal, Form, Input } from 'antd'
import styled from 'styled-components'
import SelectBox from './Select'
import DynamicForm from './DynamicForm'

const Styles = styled.div`
    
`

const ModalFrom = (props) => {
    const inputEl = useRef(null)
    const [form] = Form.useForm()

    const [ visible, setVisible ] = useState(false)
    const [ selectValue, setSelectValue ] = useState({})

    useEffect(() => {
        if(props.initialValue) {
            form.setFieldsValue({
                [props.name]: props.initialValue,
            });
        }
    }, [props.initialValue, props.name, form])

    const onFinish = values => {
        if(Object.entries(selectValue).length !== 0) {
            Object.assign(values, selectValue)
        }

        props.onFinish(values)
        setVisible(false)
        inputEl.current.resetFields();
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo)
    }

    const selectValueSet = value => {
        const newData = Object.assign({}, selectValue, value)
        setSelectValue(newData)
    }

    return (
        <Styles>
            <Button type="primary" onClick={() => setVisible(true)}>
                {`${props.text}`}
            </Button>
            <Modal
                className={`modal-create ${props.isSelect || props.isDynamicForm ? 'column' : 'row'}`}
                title={`${props.text}`}
                visible={visible}
                onCancel={() => setVisible(false)}
            >
                <Form
                    form={form}
                    ref={inputEl}
                    name="basic"
                    initialValues={{ name: props.initialValue ? props.initialValue : '' }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    >
                    {
                        props.sineName ?
                        null :
                        <Form.Item
                            label=""
                            name={props.name}
                            rules={[{ required: true, message: `Please input ${props.name}!` }]}
                        >
                            <Input placeholder={props.name}/>
                        </Form.Item>
                    }
                    { props.isDynamicForm && <DynamicForm checkList={props.checkList} /> }
                    { props.isSelect && 
                        props.postPatam.map((item, index) => 
                            <SelectBox 
                                key={index}
                                selectData={selectValueSet} 
                                actionParam={item.param}
                                value={item.value}
                                initialId={item.initial}
                                lable={item.lable}
                            />)
                       
                    }
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Styles>
    )
}

export default ModalFrom
