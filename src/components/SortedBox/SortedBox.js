import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Radio, Checkbox } from 'antd'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { setSortedValue, setReverseValue } from '../../store/filters/action'

export const Styles = styled.div`
    margin-bottom: 15px;
    .title {
        font-weight: bold;
        font-size: 16px;
        margin-right: 10px;
    }
    .ant-checkbox-wrapper {
        margin-left: 15px;
        font-weight: bold;
    }
`

const SortedBox = (props) => {

    const { sortParams, sortedValue, setSortedValue, setReverseValue } = props

    useEffect(() => {
        setSortedValue(sortParams[0].value)
    }, [setSortedValue])

    const handleSizeChange = e => {
        setSortedValue(e.target.value)
    }

    const handleReverseChange = e => {
        setReverseValue(e.target.checked)
    }

    return (
        <Styles>
            <span className="title">Sort By:</span>
            <Radio.Group value={sortedValue} onChange={handleSizeChange}>
                {sortParams.map((item, index) =>
                    <Radio.Button key={index} value={item.value}>{item.label}</Radio.Button>
                )}
            </Radio.Group>
            <Checkbox
                onChange={handleReverseChange}
            >
                Reverse
            </Checkbox>
        </Styles>

    )
}

export default connect(
    state => ({
        sortedValue: state.filters.sortedValue,
    }), { setSortedValue, setReverseValue }
)(withRouter(SortedBox))
