import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getScrapperError, deleteScrapperError, viewedScrapperError } from '../../store/scrapperErrors/action'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import { Popconfirm, Button, Switch } from 'antd'

const ScrapperErrorsDesc = ({
    getScrapperError,
    deleteScrapperError,
    viewedScrapperError,
    scrapperError: { createdAt, updatedAt, message, type, url, resolved, id },
    history,
    match: { params } }) => {

    useEffect(() => {
        getScrapperError(params.id)
    }, [getScrapperError, params.id])

    useEffect(() => {
        if (resolved === false) {
            viewedScrapperError(params.id)
        }
    }, [params.id, resolved, viewedScrapperError])

    const handleDelete = (id) => {
        deleteScrapperError(id)
            .then(() => {
                history.push('/notifications/page=0&perPage=10')
            })
    }

    return (
        <>
            <Button type="primary" onClick={() => history.goBack()}>
                Go Back
            </Button>
            <div className="item-title">Scrapper Error Details</div>
            <div className="item-wrapper">
                <div className="description-box">
                    <div className="title-item-desc">
                        Created At: <span>{moment(createdAt).format('MMMM Do YYYY, h:mm')}</span>
                    </div>
                    <div className="title-item-desc">
                        Updated At: <span>{moment(updatedAt).format('MMMM Do YYYY, h:mm')}</span>
                    </div>
                    <div className="title-item-desc">Name: <span>{message}</span></div>
                    <div className="title-item-desc">Stack: <span>{type}</span></div>
                    <div className="title-item-desc">Url: <a href={url} rel="noopener noreferrer" target="_blank">{url}</a></div>
                    <div className="title-item-desc">Viewed: <Switch checked={resolved} disabled /></div>
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
        scrapperError: state.scrapperErrors.scrapperError,
    }), { getScrapperError, deleteScrapperError, viewedScrapperError }
)(withRouter(ScrapperErrorsDesc))