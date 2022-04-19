import React from 'react'
import { Link } from "react-router-dom"
import { Empty } from 'antd'
import TableBox from '../TableBox/TableBox'
import Search from '../Search/Search'
import Loader from '../Loader/Loader'
import { STATE_STATUSES } from '../../utils/app'

const RetailerTable = ({ status, dataTable, setPage, setPerPage, page, perPage }) => {

    const sortParams = [
        { label: 'Retailer', value: 'retailer' },
    ]

    const tableHeader = () =>
        <div className="item-box header">
            <div className="item-link">Retailer</div>
        </div>

    const tableData = (item) =>
        <>
            <Link className="item-link" to={`/retailer/${[item.id]}`}>{[item.name]}</Link>
        </>

    return (
        <>
            <div className="item-title">Retailers</div>
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

export default RetailerTable