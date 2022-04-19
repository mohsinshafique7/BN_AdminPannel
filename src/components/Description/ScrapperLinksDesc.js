import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { deleteScrapperLink, 
    getScrapperLink, 
    editScrapperLink } from '../../store/scrapperLinks/action'
import { getRetailers } from '../../store/retailers/action'
import { getCategories } from '../../store/categories/action'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import { Popconfirm, Button } from 'antd'
import CoreForm from '../ModalFrom/CoreForm'

const ScrapperLinksDesc = ({
    getScrapperLink,
    deleteScrapperLink,
    editScrapperLink,
    scrapperLink: { createdAt, updatedAt, url, id, category, categoryType, retailer }, 
    getRetailers,
    getCategories,
    history,
    match: { params } }) => {

    const inputData = [
        { label: 'Url', name: 'url', type: 'text', required: false },
    ]

    const selectData = [
        { name: "retailer",  value: 'name', option: 'name', action: getRetailers, store: 'retailers', lable: 'Change retailer', required: false, mode: false },
        { name: "category",  value: 'name', option: 'name', action: getCategories, store: 'categories', lable: 'Change category', required: false, mode: false },
        { name: "categoryType",  value: 'name', option: 'name', store: 'categoryType', lable: 'Change categoryType', required: false, mode: false },
    ]

    const initialValue = { 
        url, 
        retailer,
        category,
        categoryType
    }

    useEffect(() => {
        getScrapperLink(params.id)
    }, [getScrapperLink, params.id])

    const handleDelete = (id) => {
        deleteScrapperLink(id)
            .then(() => history.push('/scrapper-links/page=0&perPage=10'))
    }

    const onSendForm = (values) => {
        editScrapperLink(values, id)
    }
    
    return (
        <>
            <Button type="primary" onClick={() => history.goBack()}>
                Go Back
            </Button>
            <div className="item-title">Scrapper Link Details</div>
            <div className="item-wrapper">
                <div className="description-box">
                    <div className="title-item-desc">
                        Created At: <span>{moment(createdAt).format('MMMM Do YYYY, h:mm')}</span>
                    </div>
                    <div className="title-item-desc">
                        Updated At: <span>{moment(updatedAt).format('MMMM Do YYYY, h:mm')}</span>
                    </div>
                    <div className="title-item-desc">Link: <a target="_blank" rel="noopener noreferrer" href={url}>{url}</a></div>
                    <div className="title-item-desc">Category: <span>{category}</span></div>
                    <div className="title-item-desc">Category Type: <span>{categoryType}</span></div>
                    <div className="title-item-desc">Retailer: <span>{retailer}</span>
                    </div>
                </div>
                <div className="controls-box">
                    <Popconfirm
                        onConfirm={() => handleDelete(id)}
                        title={`Are you sure you want to delete Scrapper Link？`} okText="Yes" cancelText="No">
                        <Button type="primary" danger>
                            Delete
                        </Button>
                    </Popconfirm> 
                    <CoreForm
                        title={'Edit Scrapper Link'} 
                        initialValue={initialValue}
                        inputData={inputData}
                        selectData={selectData}
                        onSendForm={onSendForm}
                    />
                </div>
            </div>
        </>
    )
}


export default connect(
    state => ({
        scrapperLink: state.scrapperLinks.scrapperLink,
    }),{ getScrapperLink, deleteScrapperLink, editScrapperLink, getCategories, getRetailers }
)(withRouter(ScrapperLinksDesc))