import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getScrapperSetting, updateScrapperSetting, createScrapperSetting } from '../../store/scraperSettings/action'
import { withRouter } from 'react-router-dom'
import ReactJson from 'react-json-view'
import { Button } from 'antd'

const ScraperSettingsDesc = (props) => {

    const { getScrapperSetting,
        scraperSetting,
        initialSettingJson,
        updateScrapperSetting,
        createScrapperSetting,
        match: { params },
        history } = props

    const [ jsonDataEdit, setJsonDataEdit ] = useState({})
    const [ jsonDataCreate, setJsonDataCreate ] = useState({})

    useEffect(() => {
        getScrapperSetting({ retailer: params.param })
    }, [getScrapperSetting, params.param])

    const handleEdit = (edit) => {
        setJsonDataEdit(edit.updated_src)
    }

    const updateJson = () => {
        const data = { settings: jsonDataEdit }
        const param = { retailer: params.param }

        updateScrapperSetting(param, data)
    }

    const handleCreate = (create) => {
        setJsonDataCreate(create.updated_src)
    }

    const createJsone = () => {
        const param = { retailer: params.param }

        createScrapperSetting(param, jsonDataCreate)
    }

    return (
        <>
            <Button type="primary" onClick={() => history.goBack()}>
                Go Back
            </Button>
            <div className="item-title">Parser Settings Details</div>
            <div className="item-wrapper">
                <div className="editor-json">
                    { 
                        Object.entries(scraperSetting).length !== 0 ?
                        <ReactJson
                            // theme="monokai"
                            src={scraperSetting.settings}
                            onEdit={handleEdit}
                            onAdd={handleEdit}
                            onDelete={handleEdit}
                            displayDataTypes={true}
                        /> 
                        :
                        <ReactJson 
                            src={initialSettingJson}
                            onEdit={handleCreate}
                            onAdd={handleCreate}
                            onDelete={handleCreate}
                            displayDataTypes={true}
                        />
                    }
                </div>
                {
                    Object.entries(jsonDataEdit).length !== 0 &&
                    <Button onClick={updateJson} type="primary">
                        Update
                    </Button>
                }
                {
                    Object.entries(jsonDataCreate).length !== 0 &&
                    <Button onClick={createJsone} type="primary">
                        Create
                    </Button>
                }
            </div>
        </>
    )
}

export default connect(
    state => ({
        scraperSetting: state.scraperSettings.scraperSetting,
        initialSettingJson: state.scraperSettings.initialSettingJson,
    }),{ getScrapperSetting, updateScrapperSetting, createScrapperSetting }
)(withRouter(ScraperSettingsDesc))