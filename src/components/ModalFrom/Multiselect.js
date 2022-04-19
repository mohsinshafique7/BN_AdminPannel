import React, { useEffect } from 'react'
import { Select } from 'antd'
import { connect } from 'react-redux'

const Multiselect = (props) => {
    const { Option } = Select

    const { initialValue, action } = props

    useEffect(() => {
        action()
    }, [action])

    const handleChange = (values) => {
        props.setSelectList(props.name, values.join())
    }

    return (
        <div
            className="wrapper-form-item">
            <div className="lable-item">{props.placeholder}</div>
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder={props.placeholder}
                onChange={handleChange}
                defaultValue={initialValue ? initialValue.split(',').map(item => Number(item)) : undefined}
                optionLabelProp="label"
                optionFilterProp="label"
            >
                {props[props.store] && props[props.store].length &&
                    props[props.store].sort((a, b) => {
                        if(a[props.option] && b[props.option]){
                            if (a[props.option].toLowerCase() < b[props.option].toLowerCase()) { return -1 }
                            if (a[props.option].toLowerCase() > b[props.option].toLowerCase()) { return 1 }
                        }
                        return 0
                    }).map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                {item.breadcrumbs ?
                                    <Option value={item[props.value]} label={item[props.option]}>
                                        {item.breadcrumbs.length ? item.breadcrumbs.map(crumb => `${crumb} / `) : null}
                                        {item[props.option]}
                                    </Option>
                                    : item.parent ?
                                        <Option value={item[props.value]} label={item[props.option]}>
                                            {`${item.parent.name} / `}
                                            {item[props.option]}
                                        </Option>
                                        :
                                        <Option value={item[props.value]} label={item[props.option]}>{item[props.option]}</Option>
                                }
                            </React.Fragment>
                        )
                    })
                }
            </Select>
        </div>
    )
}

export default connect(
    state => ({
        categories: state.categories.categories,
        brands: state.manufacturersBrands.brands,
        productGroups: state.productGroups.productGroups,
        manufacturers: state.manufacturersBrands.manufacturers,
        coreProducts: state.coreProducts.coreProducts.rows,
        users: state.users.users
    }), null
)(Multiselect)