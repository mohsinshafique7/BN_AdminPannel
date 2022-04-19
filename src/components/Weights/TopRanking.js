import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Empty } from 'antd'
import { getWeightExample, createWeight, editWeight } from '../../store/weights/action'
import Loader from '../Loader/Loader'
import { buildObjectRanking, sendFormRanking } from './helpers'
import { STATE_STATUSES } from '../../utils/app'
import { Collapse } from 'antd'

const TopRanking = ({
        isUserWeights,
        isExist,
        nameParam,
        data,
        weightsExample,
        user,
        company,
        getWeightExample, createWeight, editWeight,
        status
    }) => {

    const { Panel } = Collapse

    const inputEl = useRef(null)
    const [form] = Form.useForm()
    
    const [ dataWeight, setDataWeight ] = useState({})
    const [ lengthArray, setLengthArray ] = useState({})
    const [ isEdit, setIsEdit ] = useState(false)
    const [ isCreate, setIsCreate ] = useState(false)
    const [ formFields, setFormFields ] = useState([])
    const [ errorMessage, setErrorMessage ] = useState(false)

    useEffect(() => {
        if(dataWeight) {
            form.setFieldsValue(dataWeight)
        }
    }, [dataWeight, form])

    useEffect(() => {
        if(isExist) {
            const weight = data.length && data.find(element => element.name === nameParam).value

            setFormFields(weight)
            convertData(weight)
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

            const values = buildObjectRanking(initialData)
    
            setDataWeight(values)
        }
    }

    const onFinish = values => {
        console.log({values})

        const data = sendFormRanking(nameParam, lengthArray, values)

        console.log('data', data)
        
        isExist ? 
            editWeight(isUserWeights, user.id, company.id, data, nameParam)
                .then(() => {
                    setIsEdit(true)
                    setErrorMessage(false)
                })
                .catch(error => setErrorMessage(error.error.response.data.message))
            :
            createWeight(isUserWeights, user.id, company.id, data, nameParam)
                .then(() => {
                    setIsEdit(true)
                    setErrorMessage(false)
                })
                .catch(error => setErrorMessage(error.error.response.data.message))
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo)
    }

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
                    <div className="form-wrapper">
                    { 
                        formFields.map((objectItem, objectIndex) => {
                            return (
                                Object.keys(objectItem).map((item, index) => {
                                    if(item === 'manufacture') {
                                        return (
                                            <Form.Item
                                                style={{"paddingTop": "25px"}}
                                                key={`${objectIndex}_${index}`}
                                                label={item}
                                                name={`${item}_${objectIndex}`
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
                                                if(!Array.isArray(objectItem[item][objValue])) {
                                                    return (
                                                        <Form.Item
                                                            key={`${objectIndex}_${indexValue}`}
                                                            label={objValue}
                                                            name={`${objValue}_${objectIndex}_value`}
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
                                                        <Collapse>
                                                            <Panel forceRender={true} header={objValue} key={`${objectIndex}_${indexValue}`}>
                                                            { objectItem[item][objValue].map((par, index) => {
                                                                return (
                                                                    <Form.Item
                                                                        key={`${objectIndex}_${index}`}
                                                                        label={par.name}
                                                                        name={`${par.name}_${objectIndex}_${objValue}_${index}`}
                                                                        rules={[{ required: true, message: `Please input ${par.name}!` }]}
                                                                    >
                                                                        <Input 
                                                                            placeholder={par.name} 
                                                                            type="number"
                                                                        />
                                                                    </Form.Item>
                                                                )
                                                            })}
                                                            </Panel>
                                                        </Collapse>                                             
                                                    )
                                                }
                                            })
                                        )
                                    }
                                })
                            )
                        })
                    }
                    </div>
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

    console.log({formFields})

    return (
        <div className="item-wrapper">
            { status !== STATE_STATUSES.PENDING ?
                <div className="weights-wrapper">
                <>
                    { isExist ?
                        <>
                            { isEdit ?
                                <>
                                    { formFields.length &&
                                        <div className="weight-info-box">
                                        { 
                                            formFields.map((objectItem, objectIndex) => {
                                                return (
                                                    Object.keys(objectItem).map((item, index) => {
                                                        if(item === 'manufacture') {
                                                            return (
                                                                <div 
                                                                    className="weight-info" 
                                                                    key={index}
                                                                    style={{"paddingTop": "25px"}} 
                                                                    >
                                                                    <div className="lable">{item.split('_')[0]}</div>
                                                                    <div className="value">{objectItem[item]}</div>
                                                                </div>
                                                            )
                                                        } else {
                                                            return (
                                                                Object.keys(objectItem[item]).map((objValue, indexValue) => {
                                                                    if(!Array.isArray(objectItem[item][objValue])) {
                                                                        return (
                                                                            <div 
                                                                                className="weight-info" 
                                                                                key={`${indexValue}_${index}`}
                                                                                style={{"paddingTop": "25px"}} 
                                                                                >
                                                                                <div className="lable">{objValue.split('_')[0]}</div>
                                                                                <div className="value">{objectItem[item][objValue]}</div>
                                                                            </div>
                                                                        )
                                                                    } else {
                                                                        return (
                                                                            <Collapse>
                                                                                <Panel forceRender={true} header={objValue} >
                                                                                { objectItem[item][objValue].map((par, index) => {
                                                                                    return (
                                                                                        <div 
                                                                                            className="weight-info" 
                                                                                            key={index}
                                                                                            style={{"paddingTop": "25px"}} 
                                                                                            >
                                                                                            <div className="lable">{par.name}</div>
                                                                                            <div className="value">{par.value}</div>
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                                </Panel>
                                                                            </Collapse>                                             
                                                                        )
                                                                    }
                                                                })
                                                            )
                                                        }
                                                    })
                                                )
                                            })
                                        }
                                        </div>
                                        }
                                </>
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
    (state, ownProps) => ({
        weightsExample: state.weights.weightsExample[ownProps.nameParam],
        user: state.users.user,
        company: state.companies.company,
        status: state.weights.status,
    }), { getWeightExample, createWeight, editWeight }) (TopRanking)
