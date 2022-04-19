import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import qs from "query-string";
import moment from 'moment'
import { Link } from "react-router-dom"
import { getNotifications, deleteNotifications } from '../../store/notifications/action'
import Loader from '../Loader/Loader'
import Search from '../Search/Search'
import TableBox from '../TableBox/TableBox'
import { Popconfirm, Button } from 'antd'
import { STATE_STATUSES } from '../../utils/app'

const NotificationsList = (props) => {

    const { getNotifications, match: { params }, history } = props

    const sortParams = [
        { label: 'Notification', value: 'error' },
        { label: 'Id', value: 'id' },
        { label: 'Date', value: 'createdAt' },
    ]

    const [queryParams, setQueryParams] = useState(qs.parse(params.param))

    useEffect(() => {
        const queryString = qs.stringify(queryParams)
        history.replace(`/notifications/notification/${queryString}`)
    }, [queryParams, history])

    useEffect(() => {
        getNotifications()
    }, [getNotifications])

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
            <div className="item-link">Notification</div>
            <div className="item-id">ID</div>
            <div className="item-date">Created At</div>
        </div>

    const tableData = (item) =>
        <>
            <Link className="item-link" to={`/notification/${[item.id]}`}>{[item.message]}</Link>
            <div className="item-id">{[item.id]}</div>
            <div className="item-date">{moment(item.createdAt).format('MMMM Do YYYY, h:mm')}</div>
        </>

    return (
        <>
            <div className="item-title">Notifications</div>
            <Popconfirm
                onConfirm={() => props.deleteNotifications()}
                title="Are you sure you want to delete？" okText="Yes" cancelText="No">
                <Button type="primary" danger>
                    Delete All
                </Button>
            </Popconfirm>
            <Search />
            {
                props.status !== STATE_STATUSES.PENDING
                    ?
                    <TableBox
                        data={props.notifications}
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
        notifications: state.notifications.notifications,
        status: state.notifications.status,
    }), { getNotifications, deleteNotifications }
)(withRouter(NotificationsList))