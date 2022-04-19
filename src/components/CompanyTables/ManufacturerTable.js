import React from 'react'
import { Link } from "react-router-dom"
import moment from 'moment'
import { Empty } from 'antd'
import TableBox from '../TableBox/TableBox'
import Search from '../Search/Search'
import Loader from '../Loader/Loader'
import { STATE_STATUSES } from '../../utils/app'

const ManufacturerTable = ({ status, dataTable, setPage, setPerPage, page, perPage }) => {

    const sortParams = [
        { label: 'Brand', value: 'brand' },
        { label: 'Date', value: 'createdAt' },
    ]

    const tableHeader = () =>
        <div className="item-box header">
            <div className="item-link">Brand</div>
            <div className="item-id">ID</div>
            <div className="item-date">Created At</div>
        </div>

    const tableData = (item) =>
        <>
            <Link className="item-link" to={`/brand/${[item.id]}/brand/page=0&perPage=10`}>{[item.name]}</Link>
            <div className="item-id">{[item.id]}</div>
            <div className="item-date">{moment(item.createdAt).format('MMMM Do YYYY, h:mm')}</div>
        </>

    return (
        <>
            <div className="item-title manufacturers">Manufacturers</div>
            {
                status !== STATE_STATUSES.PENDING
                    ?
                    <>
                        {dataTable && dataTable.length ?
                            dataTable.map((item, index) =>
                                <div key={index}>
                                    <div className="manufacture-item">Manufacture: <span>{item.name}</span></div>
                                    <div className="brands-title">Brands</div>
                                    <Search />
                                    <TableBox
                                        data={item.brands}
                                        tableHeader={tableHeader}
                                        tableData={tableData}
                                        titleParam={'name'}
                                        sortParams={sortParams}
                                        page={Number(page)}
                                        perPage={Number(perPage)}
                                        setPage={setPage}
                                        setPerPage={setPerPage}
                                    />
                                </div>
                            )
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

export default ManufacturerTable