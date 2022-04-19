import React, { useState, useEffect } from 'react'
import { Form, Switch } from 'antd'

const SwitchBox = ({ item }) => {

    const [switchChecked, setSwitchChecked] = useState(null)

    useEffect(() => {
        setSwitchChecked(item.default)
    }, [item.default])

    return (
        <Form.Item
            label={item.label}
            name={item.name}
            rules={[{ required: item.required, message: `Please input ${item.label}!` }]}
        >
            <Switch
                checked={switchChecked}
                onChange={setSwitchChecked}
            />
        </Form.Item>
    )
}

export default SwitchBox