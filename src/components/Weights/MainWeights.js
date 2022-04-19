import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllWeihgts } from '../../store/weights/action'
import { Tabs } from 'antd'
import { weightsTabs } from './tabs'
import { Styles } from './style'

const MainWeights = ({
    userId,
    companyId,
    getAllWeihgts,
    dataAllWeights
}) => {

    const { TabPane } = Tabs

    const [weightsName, setWeightsName] = useState([])
    const [isUserWeights, setIsUserWeights] = useState(null)

    useEffect(() => {
        if (userId) {
            getAllWeihgts(true, userId)
            setIsUserWeights(true)
        }
        if (companyId) {
            getAllWeihgts(false, companyId)
            setIsUserWeights(false)
        }
    }, [userId, companyId, getAllWeihgts])

    useEffect(() => {
        if (dataAllWeights) {
            const names = dataAllWeights.map(weight => weight.name)
            setWeightsName(names)
        }
    }, [dataAllWeights])

    const clickTab = (key) => {
        console.log(key);
    }

    return (
        <Styles>
            <div className="item-title weights">Weights</div>
            <div className="item-wrapper">
                <Tabs defaultActiveKey="1" onChange={clickTab}>
                    {weightsTabs.map((weight, index) =>
                        <TabPane tab={weight.title} key={index + 1}>
                            {weight.component(weightsName.includes(weight.nameParam), dataAllWeights, weight.nameParam, isUserWeights)}
                        </TabPane>)}
                </Tabs>
            </div>
        </Styles>
    )
}

export default connect(
    state => ({
        dataAllWeights: state.weights.dataAllWeights
    }), { getAllWeihgts }
)(MainWeights)
