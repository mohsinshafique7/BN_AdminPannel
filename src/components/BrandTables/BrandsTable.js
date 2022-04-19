import React from 'react'
import { Link } from "react-router-dom"
import moment from 'moment'
import { Empty } from 'antd'
import TableBox from '../TableBox/TableBox'
import Search from '../Search/Search'
import Loader from '../Loader/Loader'
import { STATE_STATUSES } from '../../utils/app'

const BrandsTable = ({ status, dataTable, setPage, setPerPage, page, perPage }) => {

    const sortParams = [
        { label: 'Brand', value: 'brand' },
        { label: 'Date', value: 'createdAt' },
    ]

    const tableHeader = () =>
        <div className="item-box header">
            <div className="item-link">Brand</div>
            <div className="item-date">Created At</div>
        </div>

    const tableData = (item) =>
        <>
            <Link className="item-link" to={`/brand/${[item.id]}/brand/page=0&perPage=10`}>
                {item.parent ? `${item.parent.name} / ` : null}
                {[item.name]}
            </Link>
            <div className="item-date">{moment(item.createdAt).format('MMMM Do YYYY, h:mm')}</div>
        </>

    return (
        <>
            <div className="title-core-product">Child Brands</div>
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
                                    titleParam={'name'}
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

export default BrandsTable