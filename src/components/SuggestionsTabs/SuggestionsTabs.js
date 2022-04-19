import React, { useState } from 'react'
import { Tabs } from 'antd'
import { withRouter } from 'react-router-dom'
import SuggestionsList from '../List/SuggestionsList'
import SuggestionHistory from '../SuggestionHistory/SuggestionHistory'

const SuggestionsTabs = ({ history, match: { params } }) => {

    const { TabPane } = Tabs

    const [activeTab] = useState(params.tab)

    const callback = (key) => {
        if (key === 'mapping')
            history.replace(`/mapping-suggestions/${key}/page=1&perPage=10`)
        else
            history.replace(`/mapping-suggestions/${key}/page=1&perPage=10&direction=ASC&type`)

    }

    return (
        <Tabs defaultActiveKey={activeTab} onChange={callback}>
            <TabPane tab="Mapping Suggestions" key="mapping">
                <SuggestionsList />
            </TabPane>
            <TabPane tab="Mapping History" key="history">
                <SuggestionHistory />
            </TabPane>
        </Tabs>
    )
}

export default withRouter(SuggestionsTabs)