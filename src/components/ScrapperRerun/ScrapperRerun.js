import React from 'react'
import { connect } from 'react-redux'
import { getRetailers } from '../../store/retailers/action'
import { reatailerDropToday, scrapperRun, setResult } from '../../store/scraperSettings/action'
import CoreForm from '../ModalFrom/CoreForm'
import Loader from '../Loader/Loader'
import { notification } from 'antd'
import { STATE_STATUSES } from '../../utils/app'

const ScrapperRerun = (props) => {

    const { reatailerDropToday, scrapperRun, setResult, status, result } = props

    const inputData = [
        { label: 'Address', name: 'address', type: 'text', required: true },
    ]

    const selectDataDrop = [
        { name: "retailer",  value: 'name', option: 'name', action: getRetailers, store: 'retailers', lable: 'Select retailer', required: true, mode: false },
    ]

    const selectDataRerun = [
        { name: "retailer",  value: 'name', option: 'name', action: getRetailers, store: 'retailers', lable: 'Select retailer', required: true, mode: false },
        { name: "category",  value: 'name', option: 'name', store: 'categotyScrapper', lable: 'Select category', required: true, mode: false },
    ]

    const openNotification = (type, message, description) => {
        notification[type]({
          message: message,
          description: description
        });
    }

    const dropRetailers = (values) => {
        reatailerDropToday(values)
    }

    const scrapperRerun = (values) => {
        scrapperRun(values)
            .then(() => {
                openNotification('success', 'Success', 'Scrapper Rerun')
                setResult(false)
            })
            .catch(() => openNotification('error', 'Error', 'Scrapper Rerun Failed'))
    }
    
    return (
        <>
            <div className="item-title">Scrapper Rerun</div>
            <div className="item-wrapper">
                { 
                    status === STATE_STATUSES.PENDING ? 
                    <Loader /> 
                    :
                    <>
                        { result ?
                            <CoreForm
                                title={'Scrapper Rerun'}
                                inputData={inputData}
                                selectData={selectDataRerun}
                                onSendForm={scrapperRerun}
                            />
                            : 
                            <CoreForm
                                title={'Drop Retailers'}
                                selectData={selectDataDrop}
                                onSendForm={dropRetailers}
                            />
                        }
                    </>
                }
            </div>
        </>
    )
}

export default connect(
    state => ({
        status: state.scraperSettings.status,
        result: state.scraperSettings.result,
    }), { reatailerDropToday, scrapperRun, setResult }
)(ScrapperRerun)