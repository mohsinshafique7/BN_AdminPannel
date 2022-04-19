import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../../store/categories/action'
import { getSourceCategory, deleteSourceCategory, editSourceCategory, getSourceCategoriesNames } from '../../store/sourceCategories/action'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import { Popconfirm, Button } from 'antd'
import CoreForm from '../ModalFrom/CoreForm'

const SourceCategoryDesc = ({
    getSourceCategory,
    editSourceCategory,
    deleteSourceCategory,
    getSourceCategoriesNames, getCategories,
    sourceCategory: { createdAt, updatedAt, name, type, id, categoryId },
    history,
    match: { params } }) => {

    const inputData = [
        { label: 'Change name', name: 'name', type: 'text', required: true },
        { label: 'Change type', name: 'type', type: 'text', required: true },
    ]

    const selectData = [
        { name: "name", value: 'name', option: 'name', action: getSourceCategoriesNames, store: 'namesSourceCategories', lable: 'Change name', required: false, mode: "multiple" },
        { name: "categoryId", value: 'id', option: 'name', action: getCategories, store: 'categories', lable: 'Change category', required: true, mode: "tags" },
    ]

    const initialValue = {
        name,
        type,
        categoryId,
    }

    useEffect(() => {
        getSourceCategory(params.id)
    }, [getSourceCategory, params.id])

    const handleDelete = (id) => {
        deleteSourceCategory(id)
            .then(() => {
                history.push('/source-categories/page=0&perPage=10')
            })
    }

    const onSendForm = (values) => {
        editSourceCategory(values, id)
    }

    return (
        <>
            <Button type="primary" onClick={() => history.goBack()}>
                Go Back
            </Button>
            <div className="item-title">Source Category Details</div>
            <div className="item-wrapper">
                <div className="description-box">
                    <div className="title-item-desc">
                        Created At: <span>{moment(createdAt).format('MMMM Do YYYY, h:mm')}</span>
                    </div>
                    <div className="title-item-desc">
                        Updated At: <span>{moment(updatedAt).format('MMMM Do YYYY, h:mm')}</span>
                    </div>
                    <div className="title-item-desc">
                        Type: <span>{type}</span>
                    </div>
                    <div className="title-item-desc">Name: <span>{name}</span></div>
                </div>
                <div className="controls-box">
                    <Popconfirm
                        onConfirm={() => handleDelete(id)}
                        title={`Are you sure you want to delete source category ${name}？`} okText="Yes" cancelText="No">
                        <Button type="primary" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                    <CoreForm
                        title={'Edit source category'}
                        initialValue={initialValue}
                        inputData={inputData}
                        onSendForm={onSendForm}
                    />
                </div>
            </div>
        </>
    )
}


export default connect(
    state => ({
        sourceCategory: state.sourceCategories.sourceCategory,
    }), { getSourceCategory, deleteSourceCategory, editSourceCategory, getSourceCategoriesNames, getCategories }
)(withRouter(SourceCategoryDesc))
