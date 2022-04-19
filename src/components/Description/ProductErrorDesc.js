import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getProductError, deleteProductError, viewedProductError } from '../../store/productErrors/action'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import { Popconfirm, Button, Switch, Pagination } from 'antd'

const ProductErrorDesc = ({
    getProductError,
    deleteProductError,
    viewedProductError,
    productError: { createdAt, updatedAt, type, resolved, id, products },
    history,
    match: { params } }) => {

    const [renderItems, setRenderItems] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)

    const [productsList, setProductsList] = useState([])

    useEffect(() => {
        if (products && products.length) {
            setProductsList(products)
        }
    }, [products])

    const limit = ((currentPage * renderItems) + renderItems < productsList.length) ?
        (currentPage * renderItems) + renderItems : productsList.length

    const renderData = productsList.slice(currentPage * renderItems, limit)

    const onChangePage = (page, pageSize) => {
        setCurrentPage(page - 1)
    }

    const onChangeSize = (page, pageSize) => {
        setRenderItems(pageSize)
    }

    useEffect(() => {
        getProductError(params.id)
    }, [getProductError, params.id])

    useEffect(() => {
        if (resolved === false) {
            viewedProductError(params.id)
        }
    }, [params.id, resolved, viewedProductError])

    const handleDelete = (id) => {
        deleteProductError(id)
            .then(() => {
                history.push('/notifications/page=0&perPage=10')
            })
    }

    return (
        <>
            <Button type="primary" onClick={() => history.goBack()}>
                Go Back
            </Button>
            <div className="item-title">Product Error Details</div>
            <div className="item-wrapper">
                <div className="description-box product">
                    <div className="title-item-desc">
                        Created At: <span>{moment(createdAt).format('MMMM Do YYYY, h:mm')}</span>
                    </div>
                    <div className="title-item-desc">
                        Updated At: <span>{moment(updatedAt).format('MMMM Do YYYY, h:mm')}</span>
                    </div>
                    <div className="title-item-desc">Name: <span>{type}</span></div>
                    <div className="title-item-desc">Viewed: <Switch checked={resolved} disabled /></div>
                    {
                        renderData.length ?
                            <div>
                                <div className="product-item-wrapper">
                                    {renderData.map((item, index) =>
                                        <div key={index} className="product-item">
                                            <a href={item.href} rel="noopener noreferrer" target="_blank">
                                                <img src={item.productImage} alt="product" />
                                            </a>
                                            <div>
                                                <div>{item.productTitle}</div>
                                                <div>{item.promotionDescription}</div>
                                                <div>{item.ean}</div>
                                                <div>{item.sourceType}</div>
                                                <div>{item.productBrand}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <Pagination
                                    className="pagination-controls"
                                    total={productsList.length}
                                    showTotal={total => `Total ${total} items`}
                                    pageSize={renderItems}
                                    defaultCurrent={1}
                                    onChange={onChangePage}
                                    onShowSizeChange={onChangeSize}
                                />
                            </div> : null
                    }
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
        productError: state.productErrors.productError,
    }), { getProductError, deleteProductError, viewedProductError }
)(withRouter(ProductErrorDesc))