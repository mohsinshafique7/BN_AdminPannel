import React, { useState, useEffect, useCallback, useRef } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Empty } from 'antd'
import { getWeightExample, createWeight, editWeight } from '../../store/weights/action'
import Loader from '../Loader/Loader'
import { sendFormСommon, sendFormRetailers, sendFormPds, sendFormRanking } from './helpers'
import { buildObjectСommon, buildObjectRetailers, buildObjectPds, buildObjectRanking } from './helpers'
import { STATE_STATUSES } from '../../utils/app'

const WeightTab = ({
        isUserWeights,
        isExist,
        nameParam,
        data,
        weightsExample,
        user,
        company,
        getWeightExample, createWeight, editWeight,
        status,
    }) => {

    const inputEl = useRef(null)
    const [form] = Form.useForm()
    
    const [ dataWeight, setDataWeight ] = useState({})
    const [ lengthArray, setLengthArray ] = useState({})
    const [ isEdit, setIsEdit ] = useState(false)
    const [ isCreate, setIsCreate ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState(false)

    useEffect(() => {
        if(dataWeight) {
            form.setFieldsValue(dataWeight)
        }
    }, [dataWeight, form])

    const convertData = useCallback(
        (initialData) => {
            if(initialData.length) {
                setLengthArray(initialData.length)
    
                let values
    
                switch(nameParam) {
                    case 'portfolioPresentation':
                    case 'perfectProduct':
                    case 'bestPlacement':
                        values = buildObjectСommon(initialData)
                        break
                    case 'retailers':
                        values = buildObjectRetailers(initialData)
                        break
                    case 'totalPds':
                        values = buildObjectPds(initialData)
                        break
                    case 'topRanking':
                        values = buildObjectRanking(initialData)
                        break
                    default: break
                }
                
                setDataWeight(values)
            }
        }, [nameParam],
    );

    useEffect(() => {
        if(isExist) {
            const weight = data.length && data.find(element => element.name === nameParam).value
            convertData(weight)
        }
    }, [isExist, data, nameParam, convertData])

    useEffect(() => {
        setIsEdit(isExist)
     }, [isExist])

    useEffect(() => {
        if(weightsExample.length) {
            convertData(weightsExample)
        }
    }, [weightsExample, convertData])

    const getExample = () => {
        setIsCreate(true)
        getWeightExample(isUserWeights, user.id, company.id, nameParam)
    }

    const onFinish = values => {
        let data
        switch(nameParam) {
            case 'portfolioPresentation':
            case 'perfectProduct':
            case 'bestPlacement':
                data = sendFormСommon(nameParam, lengthArray, values)
                break
            case 'retailers':
                data = sendFormRetailers(nameParam, lengthArray, values)
                break
            case 'totalPds':
                data = sendFormPds(nameParam, values)
                break
            case 'topRanking':
                data = sendFormRanking(nameParam, lengthArray, values)
                break
            default: break
        }
        
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
                .catch(error => {
                    setErrorMessage(error.error.response.data.message)
                })
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo)
    }


    const renderForm = () => {
        return (
            <>
               { Object.entries(dataWeight).length !== 0 && 
               <Form
                    name="weight"
                    ref={inputEl}
                    form={form}
                    initialValues={dataWeight}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    { Object.keys(dataWeight).map((item, index) => 
                        <Form.Item
                            style={item.split('_')[0] === 'manufacture' ? {"paddingTop": "25px"} : null}
                            key={index}
                            label={item.split('_')[0]}
                            name={item}
                            rules={[{ required: true, message: `Please input ${item.split('_')[0]}!` }]}
                        >
                            <Input 
                                disabled={item.split('_')[0] === 'manufacture'} 
                                placeholder={item.split('_')[0]} 
                                type={item.split('_')[0] === 'manufacture' ? "text" : "number"}
                            />
                        </Form.Item>
                    )}
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
    (state, ownProps) => ({
        weightsExample: state.weights.weightsExample[ownProps.nameParam],
        user: state.users.user,
        company: state.companies.company,
        status: state.weights.status,
    }), { getWeightExample, createWeight, editWeight }
)(WeightTab)
