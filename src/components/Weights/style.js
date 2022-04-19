import styled from 'styled-components'

export const Styles = styled.div`
    .weights-wrapper {
        width: 100%; 
        display: flex;
        align-items: flex-start;
    }
    .item-wrapper {
        margin-top: 0;
        flex-direction: column;
    }
    .item-title {
        margin-top: 25px;
    }
    .edit-weight {
        margin-left: 25px;
    }
    .weight-info-box {
        width: 100%;
        .weight-info {
            display: flex;
            align-items: center;
            font-size: 18px;
            text-transform: capitalize;
            .lable {
                max-width: 220px;
                width: 100%;
                font-weight: bold;
            }
            .value {
                margin-left: 25px;
            }
        }
        .ant-collapse.ant-collapse-icon-position-left {
            margin-bottom: 25px;
            font-size: 16px;
            text-transform: capitalize;
        }
    }
    .error-message-weight {
        font-size: 14px;
        color: red;
        display: block;
        margin: 10px auto;
        text-align: center;
    }
    .empty-item {
        width: 100%;
        background: #fff;
        padding: 50px;
    }
    .btn-weight {
        margin-left: 25px;
        margin-top: 25px;
    }
    .locations-fields {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .field-box {
            width: 100%;
            margin-top: 25px;
        }
        .remove-fields-btn {
            height: 45px;
            font-size: 20px;
            margin-left: 25px;
        }
    }
    .add-fields-btn {
        margin-bottom: 30px;
        margin-top: 10px;
    }
    // .form-wrapper {
    //     display: flex;
    //     flex-direction: column-reverse;
    // }

    #weight {
        width: 100%;
        .ant-col.ant-form-item-label {
            min-width: 320px;
            text-align: left;
            text-transform: capitalize;
            label {
                font-size: 16px;
            }
        }
    }


    .form-wrapper {
        .ant-collapse.ant-collapse-icon-position-left {
            margin-bottom: 25px;
            margin-bottom: 25px;
            font-size: 16px;
            text-transform: capitalize;
        }
    }
`