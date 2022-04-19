import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import qs from "query-string";
import moment from 'moment'
import { Link } from "react-router-dom"
import { getProductErrors } from '../../store/productErrors/action'
import Loader from '../Loader/Loader'
import Search from '../Search/Search'
import TableBox from '../TableBox/TableBox'
import { STATE_STATUSES } from '../../utils/app'

const ProductErrorsList = (props) => {

    const { getProductErrors, match: { params }, history } = props

    const sortParams = [
        { label: 'Notification', value: 'type' },
        { label: 'Id', value: 'id' },
        { label: 'Date', value: 'createdAt' },
    ]

    const [queryParams, setQueryParams] = useState(qs.parse(params.param))

    useEffect(() => {
        const queryString = qs.stringify(queryParams)
        history.replace(`/notifications/product/${queryString}`)
    }, [queryParams, history])

    useEffect(() => {
        getProductErrors()
    }, [getProductErrors])

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
            <div className="item-link">Product Error</div>
            <div className="item-id">ID</div>
            <div className="item-date">Created At</div>
        </div>

    const tableData = (item) =>
        <>
            <Link className="item-link" to={`/product-error/${[item.id]}`}>{[item.type]}</Link>
            <div className="item-id">{[item.id]}</div>
            <div className="item-date">{moment(item.createdAt).format('MMMM Do YYYY, h:mm')}</div>
        </>

    return (
        <>
            <div className="item-title">Product Errors</div>
            <Search />
            {
                props.status !== STATE_STATUSES.PENDING
                    ?
                    <TableBox
                        data={props.productErrors}
                        tableHeader={tableHeader}
                        tableData={tableData}
                        titleParam={'type'}
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
        productErrors: state.productErrors.productErrors,
        status: state.productErrors.status,
    }), { getProductErrors }
)(withRouter(ProductErrorsList))