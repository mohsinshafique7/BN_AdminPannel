import React, { useState, useEffect } from "react"
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'

const CustomDynamicForm = ({ objectIndex, initialFields }) => {
    const [inputFields, setInputFields] = useState([])

    useEffect(() => {
        if(initialFields) {
            const modifyFields = []

            initialFields.forEach((itemObj, indexObj) => {
                let object = {}

                for(const propery in itemObj) {
                    Object.assign(object,  { [`${propery}_${objectIndex}_${indexObj}`]: '' } )
                }

                modifyFields.push(object)
            })

            setInputFields(modifyFields)
        }
    }, [initialFields, objectIndex])

    const handleAddFields = () => {
        const values = [...inputFields]

        const randonIndex = Math.random()

        values.push({ 
            [`label_${objectIndex}_${randonIndex}`]: '', 
            [`level_${objectIndex}_${randonIndex}`]: '', 
            [`checkList_${objectIndex}_${randonIndex}`]: '', 
        })

        setInputFields(values)
    }

    const handleRemoveFields = index => {
        const values = [...inputFields]
        values.splice(index, 1)

        setInputFields(values)
    }

    return (
        <>
            {inputFields.length ? 
                inputFields.map((inputField, indexField) => (
                    <div className="locations-fields" key={`${objectIndex}_${inputField}~${indexField}`}>
                        <div className="field-box">
                            { Object.keys(inputField).map((item, index) => 
                                  <Form.Item
                                      key={`${objectIndex}_${index}`}
                                      label={item.split('_')[0]}
                                      name={item}
                                      rules={[{ required: true, message: `Please input ${item.split('_')[0]}!` }]}
                                  >
                                      <Input 
                                          placeholder={item.split('_')[0]} 
                                          type={item.split('_')[0] === 'level' ? "number" : "text"}
                                      />
                                  </Form.Item>
                            )}
                        </div>
                        <MinusCircleOutlined 
                          key={`${objectIndex}_${indexField}`}
                          className="remove-fields-btn"
                          onClick={() => handleRemoveFields(indexField)} 
                        />
                    </div>
                )) : null
            }
            <Button 
                key={objectIndex}
                className="add-fields-btn"
                onClick={() => handleAddFields()}
            >
                <PlusOutlined />
                Add Fields Locations
            </Button>
        </>
    )
}

export default CustomDynamicForm


