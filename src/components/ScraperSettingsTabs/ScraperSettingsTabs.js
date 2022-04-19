import React from 'react'
import { Tabs } from 'antd'
import ScraperSettingsList from '../List/ScraperSettingsList'
import ScrapperRerun from '../ScrapperRerun/ScrapperRerun'

const ScraperSettingsTabs = () => {

    const { TabPane } = Tabs

    const callback = (key) => {
        console.log(key);
    }

    return (
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Parser Settings" key="1">
                <ScraperSettingsList />
            </TabPane>
            <TabPane tab="Scrapper Rerun" key="2">
                <ScrapperRerun />
            </TabPane>
        </Tabs>
    )
}

export default ScraperSettingsTabs