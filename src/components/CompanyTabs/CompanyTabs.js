import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Tabs, Button } from 'antd'
import CompanyDesc from '../Description/CompanyDesc'
import MainWeights from '../Weights/MainWeights'

const CompanyTabs = ({ company, manufacturer, history }) => {

    const { TabPane } = Tabs

    const callback = (key) => {
        console.log(key);
    }

    return (
        <>
            <Button type="primary" onClick={() => history.goBack()}>
                Go Back
            </Button>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Company" key="1">
                    <CompanyDesc />
                </TabPane>
                <TabPane tab="Weights" disabled={manufacturer && !manufacturer.length} key="2">
                    <MainWeights companyId={company.id} />
                </TabPane>
            </Tabs>
        </>
    )
}


export default connect(
    state => ({
        company: state.companies.company,
        manufacturer: state.companies.company.manufacturer,
    }), null
)(withRouter(CompanyTabs))