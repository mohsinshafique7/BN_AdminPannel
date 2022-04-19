import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getError, deleteError } from '../../store/errors/action'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import { Popconfirm, Button } from 'antd'

const ErrorDesc = ({ 
    getError,
    deleteError, 
    error: { createdAt, updatedAt, message, stack, id }, 
    history,
    match: { params } }) => {

    useEffect(() => {
        getError(params.id)
    }, [getError, params.id])

    const handleDelete = (id) => {
        deleteError(id)
            .then(() => {
                history.push('/errors/page=0&perPage=10')
            })
    }

    return (
        <>
            <Button type="primary" onClick={() => history.goBack()}>
                Go Back
            </Button>
            <div className="item-title">Error Details</div>
            <div className="item-wrapper">
                <div className="description-box">
                    <div className="title-item-desc">
                        Created At: <span>{moment(createdAt).format('MMMM Do YYYY, h:mm')}</span>
                    </div>
                    <div className="title-item-desc">
                        Updated At: <span>{moment(updatedAt).format('MMMM Do YYYY, h:mm')}</span>
                    </div>
                    <div className="title-item-desc">Name: <span>{message}</span></div>
                    <div className="title-item-desc">Stack: <span>{stack}</span></div>
                </div>
                <div className="controls-box">
                    <Popconfirm
                        onConfirm={() => handleDelete(id)}
                        title="Are you sure you want to delete error？" okText="Yes" cancelText="No">
                        <Button type="primary" danger>
                            Delete
                        </Button>
                    </Popconfirm> 
                </div>
            </div>
        </>
    )
}


export default connect(
    state => ({
        error: state.errors.error,
    }),{ getError, deleteError }
)(withRouter(ErrorDesc))