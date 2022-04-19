import React, { useState } from 'react'
import { Tabs } from 'antd'
import { withRouter } from 'react-router-dom'
import NotificationsList from '../List/NotificationsList'
import ScrapperErrorsList from '../List/ScrapperErrorsList'
import ProductErrorsList from '../List/ProductErrorsList'

const NotificationsTabs = ({ history, match: { params } }) => {

    const { TabPane } = Tabs

    const [activeTab] = useState(params.tab)

    const callback = (key) => {
        history.replace(`/notifications/${key}/page=0&perPage=10`)
    }

    return (
        <Tabs defaultActiveKey={activeTab} onChange={callback}>
            <TabPane tab="Notifications" key="notification">
                <NotificationsList />
            </TabPane>
            <TabPane tab="Scrapper Errors" key="scrapper">
                <ScrapperErrorsList />
            </TabPane>
            <TabPane tab="Product Errors" key="product">
                <ProductErrorsList />
            </TabPane>
        </Tabs>
    )
}

export default withRouter(NotificationsTabs)