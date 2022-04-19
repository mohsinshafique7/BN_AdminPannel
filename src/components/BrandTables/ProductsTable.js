import React from 'react'
import { Link } from "react-router-dom"
import moment from 'moment'
import { Empty } from 'antd'
import TableBox from '../TableBox/TableBox'
import Search from '../Search/Search'
import Loader from '../Loader/Loader'
import { STATE_STATUSES } from '../../utils/app'

const ProductsTable = ({ status, dataTable, setPage, setPerPage, page, perPage }) => {

    const sortParams = [
        { label: 'Core Product', value: 'coreProduct' },
        { label: 'EAN', value: 'ean' },
        { label: 'Date', value: 'createdAt' },
    ]

    const tableHeader = () =>
        <div className="item-box header">
            <div className="item-link">Core Product</div>
            <div className="item-id">EAN</div>
            <div className="item-date">Created At</div>
        </div>

    const tableData = (item) =>
        <>
            <Link className="item-link" to={`/core-product/${[item.id]}`}>{[item.title]}</Link>
            <div className="item-id">{[item.ean]}</div>
            <div className="item-date">{moment(item.createdAt).format('MMMM Do YYYY, h:mm')}</div>
        </>

    return (
        <>
            <div className="title-core-product">Core Products</div>
            {
                status !== STATE_STATUSES.PENDING
                    ?
                    <>
                        {dataTable && dataTable.length ?
                            <>
                                <Search />
                                <TableBox
                                    data={dataTable}
                                    tableHeader={tableHeader}
                                    tableData={tableData}
                                    titleParam={'title'}
                                    sortParams={sortParams}
                                    page={Number(page)}
                                    perPage={Number(perPage)}
                                    setPage={setPage}
                                    setPerPage={setPerPage}
                                />
                            </>
                            :
                            <div className="empty-item">
                                <Empty />
                            </div>
                        }
                    </>
                    :
                    <Loader />
            }
        </>
    )
}

export default ProductsTable