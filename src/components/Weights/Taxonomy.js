import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Empty } from 'antd'
import { getWeightExample, createWeight, editWeight } from '../../store/weights/action'
import Loader from '../Loader/Loader'
import { STATE_STATUSES } from '../../utils/app'
import CustomDynamicForm from '../CustomDynamicForm/CustomDynamicForm'
import { sendTaxonomy, buildObjectTaxonomy } from './helpers'

const Taxonomy = ({
        isUserWeights,
        isExist,
        nameParam,
        data,
        status,
        weightsExample,
        user,
        company,
        getWeightExample, createWeight, editWeight,
    }) => {

    const inputEl = useRef(null)
    const [form] = Form.useForm()

    const [ dataWeight, setDataWeight ] = useState({})
    const [ formFields, setFormFields ] = useState([])
    const [ lengthArray, setLengthArray ] = useState({})
    const [ isEdit, setIsEdit ] = useState(false)
    const [ isCreate, setIsCreate ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState(false)

    useEffect(() => {
        if(dataWeight) {
            form.setFieldsValue(dataWeight)
        }
    }, [dataWeight, form])

    useEffect(() => {
        if(isExist) {
        const weight = data.length && data.find(element => element.name === nameParam).value

        convertData(weight)
        setFormFields(weight)
        }
    }, [isExist, data, nameParam])

    useEffect(() => {
        setIsEdit(isExist)
    }, [isExist])

    useEffect(() => {
        if(weightsExample.length) {
            convertData(weightsExample)
            setFormFields(weightsExample)
        }
    }, [weightsExample])


    const getExample = () => {
        setIsCreate(true)
        getWeightExample(isUserWeights, user.id, company.id, nameParam)
    }

    const convertData = (initialData) => {
        if(initialData.length) {
            setLengthArray(initialData.length)

            const values = buildObjectTaxonomy(initialData)
    
            setDataWeight(values)
        }
    }

    const onFinish = values => {

        const data = sendTaxonomy(nameParam, lengthArray, values)

        console.log({data})

        isExist ? 
            editWeight(isUserWeights, user.id, company.id, data, nameParam)
                .then(() => setIsEdit(true))
                .catch(error => setErrorMessage(error.error.response.data.message))
            :
            createWeight(isUserWeights, user.id, company.id, data, nameParam)
                .then(() => setIsEdit(true))
                .catch(error => setErrorMessage(error.error.response.data.message))
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo)
    }

    console.log({formFields})

    const renderForm = () => {
        return (
            <>
               { formFields.length &&
               <Form
                    name="weight"
                    ref={inputEl}
                    form={form}
                    initialValues={dataWeight}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    { formFields.map((objectItem, objectIndex) => {
                            return (
                                Object.keys(objectItem).map((item, index) => {
                                    if(item === 'manufacture') {
                                        return (
                                            <Form.Item
                                                style={{"paddingTop": "25px"}}
                                                key={index}
                                                label={objectItem[item]}
                                                name={
                                                    `${item}_${objectIndex}`
                                                }
                                                rules={[{ required: true, message: `Please input ${item}!` }]}
                                            >
                                                <Input 
                                                    disabled={true} 
                                                    placeholder={item} 
                                                    type="text"
                                                />
                                            </Form.Item>
                                        )
                                    } else {
                                        return (
                                            Object.keys(objectItem[item]).map((objValue, indexValue) => {
                                                
                                                if(objValue === "topLevel") {
                                                    return (
                                                        <Form.Item
                                                            key={index}
                                                            label={objValue}
                                                            name={`${objValue}_${objectIndex}`}
                                                            rules={[{ required: true, message: `Please input ${objValue}!` }]}
                                                        >
                                                            <Input 
                                                                placeholder={objValue} 
                                                                type="number"
                                                            />
                                                        </Form.Item>
                                                    )
                                                } else {
                                                    return (
                                                        <CustomDynamicForm 
                                                            key={indexValue}
                                                            objectIndex={objectIndex} 
                                                            initialFields={objectItem[item][objValue]} 
                                                        />
                                                    )
                                                    
                                                }
                                            })
                                        )
                                    }
                                })
                            )
                    })}
                    { errorMessage && <span className="error-message-weight">{errorMessage}</span> }
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form> }
            </>
        )
    }

    return (
        <div className="item-wrapper">
            { status !== STATE_STATUSES.PENDING ?
                <div className="weights-wrapper">
                <>
                    { isExist ?
                        <>
                            { isEdit ?
                                <div className="weight-info-box">
                                    { Object.keys(dataWeight).map((item, index) => 
                                        <div 
                                            className="weight-info" 
                                            key={index}
                                            style={item.split('_')[0] === 'manufacture' ? 
                                                {"paddingTop": "25px"} : null} 
                                            >
                                            <div className="lable">{item.split('_')[0]}</div>
                                            <div className="value">{dataWeight[item]}</div>
                                        </div>
                                    )}
                                </div>
                                :
                                renderForm()
                            }
                        </>
                        : 
                        <>
                            { isCreate ?
                                renderForm()
                            :
                            <>
                                <div className="empty-item"><Empty /></div>
                                <Button className="btn-weight" 
                                    onClick={getExample} 
                                    type="primary">
                                    Add Weight
                                </Button>
                            </> }
                        </>
                    }
                </>
                { isExist && 
                    <Button className="btn-weight" 
                        onClick={() => setIsEdit(!isEdit)} 
                        type="primary">
                            Edit Weight
                        </Button> }
                </div>
                :
                <Loader />
            }
        </div>
    )    
}

export default connect(
    state => ({
        weightsExample: state.weights.weightsExample.taxonomy,
        user: state.users.user,
        company: state.companies.company,
        status: state.weights.status,
    }), { getWeightExample, createWeight, editWeight }
)(Taxonomy)