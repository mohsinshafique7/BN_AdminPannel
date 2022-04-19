import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import qs from "query-string";
import moment from 'moment'
import { Link } from "react-router-dom"
import { getCategories } from '../../store/categories/action'
import { getSourceCategories, createSourceCategory, getSourceCategoriesNames } from '../../store/sourceCategories/action'
import Loader from '../Loader/Loader'
import Search from '../Search/Search'
import TableBox from '../TableBox/TableBox'
import CoreForm from '../ModalFrom/CoreForm'
import { STATE_STATUSES } from '../../utils/app'
import { notification } from 'antd'

const SourceCategoriesList = (props) => {
    const {
        getSourceCategoriesNames,
        getCategories,
        getSourceCategories,
        match: { params }, history } = props

    const inputData = [
        { label: 'Name', name: 'name', type: 'text', required: true },
    ]

    const sortParams = [
        { label: 'Source category', value: 'sourceCategory' },
        { label: 'Id', value: 'id' },
        { label: 'Date', value: 'createdAt' },
    ]

    const [queryParams, setQueryParams] = useState(qs.parse(params.param))

    useEffect(() => {
        const queryString = qs.stringify(queryParams)
        history.replace(`/source-categories/${queryString}`)
    }, [queryParams, history])

    useEffect(() => {
        getSourceCategories()
    }, [getSourceCategories])

    const onSendForm = (values) => {
        props.createSourceCategory(values)
            .catch(() => openNotification('error'))
    }

    const openNotification = (type) => {
        notification[type]({
            message: 'Error',
            description: 'This source category already exists.'
        });
    }

    const setPage = (page) => {
        setQueryParams(queryParams => {
            return {
                ...queryParams, page
            }
        })
    }

    const setPerPage = (perPage) => {
        setQueryParams(queryParams => {
            return {
                ...queryParams, perPage
            }
        })
    }

    const tableHeader = () =>
        <div className="item-box header">
            <div className="item-link">Source Category</div>
            <div className="item-type">Type</div>
            <div className="item-id">ID</div>
            <div className="item-date">Created At</div>
        </div>

    const tableData = (item) =>
        <>
            <Link className="item-link" to={`/source-category/${[item.id]}`}>{[item.name]}</Link>
            <div className="item-type">{[item.type]}</div>
            <div className="item-id">{[item.id]}</div>
            <div className="item-date">{moment(item.createdAt).format('MMMM Do YYYY, h:mm')}</div>
        </>

    return (
        <>
            <div className="item-title">Source Categories</div>
            <Search />
            <CoreForm
                title={'Create Source Category'}
                inputData={inputData}
                onSendForm={onSendForm}
            />
            {
                props.status !== STATE_STATUSES.PENDING
                    ?
                    <TableBox
                        data={props.sourceCategories}
                        tableHeader={tableHeader}
                        tableData={tableData}
                        titleParam={'name'}
                        sortParams={sortParams}
                        page={Number(queryParams.page)}
                        perPage={Number(queryParams.perPage)}
                        setPage={setPage}
                        setPerPage={setPerPage}
                    />
                    :
                    <Loader />
            }
        </>
    )
}

export default connect(
    state => ({
        sourceCategories: state.sourceCategories.sourceCategories,
        status: state.sourceCategories.status,
    }), { getSourceCategories, createSourceCategory, getCategories, getSourceCategoriesNames }
)(withRouter(SourceCategoriesList))