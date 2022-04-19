import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import qs from "query-string"
import Loader from '../Loader/Loader'
import { Pagination, Empty, Input, Modal, Checkbox, Radio, Button, Popconfirm } from 'antd'
import { getSuggestionsHistory, revertMapping } from '../../store/suggestions/action'
import { Styles } from './Styles'
import { STATE_STATUSES } from '../../utils/app'

const SuggestionHistory = (props) => {

    const inputs = [
        { name: 'title', type: 'text', placeholder: 'Product Title' },
        { name: 'ean', type: 'text', placeholder: 'EAN' },
        { name: 'code', type: 'text', placeholder: 'Core Product ID' },
    ]

    const { getSuggestionsHistory, logs, count, match: { params }, history, status, revertMapping } = props

    const [queryParams, setQueryParams] = useState(qs.parse(params.page))

    const [visible, setVisible] = useState(false)
    const [modalItem, setModalItem] = useState({})

    useEffect(() => {
        const queryString = qs.stringify(queryParams);
        history.replace(`/mapping-suggestions/history/${queryString}`)
    }, [queryParams, history])

    useEffect(() => {
        getSuggestionsHistory(queryParams)
    }, [getSuggestionsHistory, queryParams])

    const onChangePage = (page, pageSize) => {
        setQueryParams(queryParams => {
            return {
                ...queryParams, page
            }
        })
    }

    const onChangePerPage = (page, perPage) => {
        setQueryParams(queryParams => {
            return {
                ...queryParams, perPage
            }
        })
    }

    const handleSearch = (e) => {
        const { name, value } = e.target

        setQueryParams(queryParams => {
            return {
                ...queryParams, [name]: value, page: 1
            }
        })
    }

    const handleReverseChange = e => {
        let direction = e.target.checked ? 'DESC' : 'ASC'

        setQueryParams(queryParams => {
            return {
                ...queryParams, direction,
            }
        })
    }

    const handleToggleOrder = e => {
        setQueryParams(queryParams => {
            return {
                ...queryParams, type: e.target.value,
            }
        })
    }

    const handleRevert = (item) => {
        revertMapping({ logId: item.id})
          .then(() => window.location.reload(false))
          .catch(e => console.log('error', e))
    }

    const handleModal = (item) => {
        setModalItem(item)
        setVisible(true)
    }

    const roundingNumber = (value) => {
        const number = Number(value)

        if (Number.isInteger(number)) {
            if (number === 1) {
                return `${number}00%`
            } else {
                return `${number}%`
            }
        } else {
            return `${parseInt(number.toFixed(2) * 100)}%`
        }
    }

    return (
        <Styles>
            <div className="item-title">Mapping History</div>

            <div className="filter-box">
                <span className="title">Search:</span>
            </div>

            {inputs.map((item, index) =>
                <div key={index} className="wrapper-form-item">
                    <div className="lable-item">{item.placeholder}</div>
                    <Input
                        value={queryParams[item.name]}
                        name={item.name}
                        type={item.type}
                        placeholder={item.placeholder}
                        onChange={handleSearch}
                    />
                </div>)}

            <div className="sorted-box">
                <br/>
                <span className="title">Filter:</span>
                <Radio.Group value={JSON.parse(queryParams.type)} onChange={handleToggleOrder}>
                    <Radio.Button value={null}>All Matched</Radio.Button>
                    <Radio.Button value={true}>Manually Matched</Radio.Button>
                    <Radio.Button value={false}>Auto Matched</Radio.Button>
                </Radio.Group>
                <Checkbox
                    checked={queryParams.direction === 'DESC'}
                    onChange={handleReverseChange}
                >
                    Reverse Order
                </Checkbox>
            </div>

            {
                logs ?
                    <>
                        <div className="table-wrapper">
                            <div className="header-table-wrapper">
                                <div className="header-table">
                                    <div className="table-title">Mapped From</div>
                                    <div className="table-title">Mapped To</div>
                                    <div className="empty-box"></div>
                                </div>
                                <div className="subheader-table-wrapper">
                                    <div className="item-history header">Image</div>
                                    <div className="item-history header">Core Product ID</div>
                                    <div className="item-history header">Product Title</div>
                                    <div className="item-history header">Retailer Product ID</div>
                                    <div className="item-history header">Image</div>
                                    <div className="item-history header">Core Product ID</div>
                                    <div className="item-history header">Product Title</div>
                                    {/* <div className="item-history header">Retailer Id</div> */}
                                    <div className="item-history header">EAN</div>
                                    <div className="matching-item header">Matching Type</div>
                                    <div className="matching-item header">Date Matched</div>
                                </div>
                            </div>
                            <div className="table-body-wrapper">
                                {
                                    status === STATE_STATUSES.READY ?
                                        logs.length ?
                                            logs.map((item, index) =>
                                                <div className="item-table"  key={index}>
                                                    <div onClick={() => handleModal(item)} className="item-history">
                                                        <img src={item.wrongimage} alt="product" />
                                                    </div>
                                                    <div className="item-history">
                                                        <Popconfirm
                                                          onConfirm={() => handleRevert(item)}
                                                          title={`Are you sure you want to revert mapping ${item.ean}？`} okText="Yes" cancelText="No">
                                                            <Button className="ant-btn-primary" danger>Revert {item.wrongid}</Button>
                                                        </Popconfirm>

                                                    </div>
                                                    <div onClick={() => handleModal(item)} className="item-history">{item.wrongtitle}</div>
                                                    <div onClick={() => handleModal(item)} className="item-history">{item.wrongretailercode}</div>

                                                    <div onClick={() => handleModal(item)} className="item-history">
                                                        <img src={item.rightimage} alt="product" />
                                                    </div>
                                                    <div onClick={() => handleModal(item)} className="item-history">{item.rightid}</div>
                                                    <div onClick={() => handleModal(item)} className="item-history">{item.righttitle}</div>
                                                    {/* <div className="item-history">{item.rightretailercode}</div> */}
                                                    <div onClick={() => handleModal(item)} className="item-history">{item.ean}</div>
                                                    <div onClick={() => handleModal(item)} className="matching-item">{item.matchingtype ? "Manual" : "Auto"}</div>
                                                    <div onClick={() => handleModal(item)} className="matching-item">{moment(item.createdAt).format('MMMM Do YYYY')}</div>
                                                </div>) :
                                            <div className="empty-item">
                                                <Empty />
                                            </div> : <Loader />
                                }
                            </div>
                        </div>
                        <Pagination
                            className="pagination-controls"
                            total={count * Number(queryParams.perPage)}
                            showTotal={total => `Total ${total} items`}
                            pageSize={Number(queryParams.perPage)}
                            current={Number(queryParams.page)}
                            onChange={onChangePage}
                            onShowSizeChange={onChangePerPage}
                        />
                    </> : <Loader />
            }
            <Modal
                className="modal-history-wrapper"
                title="Details"
                visible={visible}
                onCancel={() => setVisible(false)}
            >
                <div className="details-wrapper">
                    <div className="details-image-box">
                        <div className="details-img">
                            <img src={modalItem.wrongimage} alt="product" />
                        </div>
                        <div className="details-img">
                            <img src={modalItem.rightimage} alt="product" />
                        </div>
                    </div>
                    <div className="details-table-box">
                        <div className="details-table head">
                            <div>Image</div>
                            <div>Title</div>
                            <div>Ingredients</div>
                            <div>Nutritional</div>
                            <div>Size</div>
                            <div>Price</div>
                        </div>
                        <div className="details-table">
                            <div>{roundingNumber(modalItem.matchimage)}</div>
                            <div>{roundingNumber(modalItem.matchtitle)}</div>
                            <div>{roundingNumber(modalItem.matchingredients)}</div>
                            <div>{roundingNumber(modalItem.matchnutritional)}</div>
                            <div>{roundingNumber(modalItem.matchweight)}</div>
                            <div>{roundingNumber(modalItem.matchprice)}</div>
                        </div>
                    </div>

                </div>
            </Modal>
        </Styles>
    )
}

export default connect(
    state => ({
        logs: state.suggestions.suggestionsHistory.logs,
        count: state.suggestions.suggestionsHistory.count,
        status: state.suggestions.status,
    }), { getSuggestionsHistory, revertMapping }
)(withRouter(SuggestionHistory))
