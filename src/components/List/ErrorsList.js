import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import qs from "query-string";
import moment from 'moment'
import { Link } from "react-router-dom"
import { getErrors, deleteErrors } from '../../store/errors/action'
import Loader from '../Loader/Loader'
import Search from '../Search/Search'
import TableBox from '../TableBox/TableBox'
import { Popconfirm, Button } from 'antd'
import { STATE_STATUSES } from '../../utils/app'

const ErrorsList = (props) => {

    const { getErrors, match: { params }, history } = props

    const sortParams = [
        { label: 'Error', value: 'error' },
        { label: 'Id', value: 'id' },
        { label: 'Date', value: 'createdAt' },
    ]

    const [queryParams, setQueryParams] = useState(qs.parse(params.param))

    useEffect(() => {
        const queryString = qs.stringify(queryParams)
        history.replace(`/errors/${queryString}`)
    }, [queryParams, history])

    useEffect(() => {
        getErrors()
    }, [getErrors])

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
            <div className="item-link">Error</div>
            <div className="item-id">ID</div>
            <div className="item-date">Created At</div>
        </div>

    const tableData = (item) =>
        <>
            <Link className="item-link" to={`/error/${[item.id]}`}>{[item.message]}</Link>
            <div className="item-id">{[item.id]}</div>
            <div className="item-date">{moment(item.createdAt).format('MMMM Do YYYY, h:mm')}</div>
        </>

    return (
        <>
            <div className="item-title">Errors</div>
            <Popconfirm
                onConfirm={() => props.deleteErrors()}
                title="Are you sure you want to delete？" okText="Yes" cancelText="No">
                <Button type="primary" danger>
                    Delete
                </Button>
            </Popconfirm>
            <Search />
            {
                props.status !== STATE_STATUSES.PENDING
                    ?
                    <TableBox
                        data={props.errors}
                        tableHeader={tableHeader}
                        tableData={tableData}
                        titleParam={'message'}
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
        errors: state.errors.errors,
        status: state.errors.status,
    }), { getErrors, deleteErrors }
)(withRouter(ErrorsList))