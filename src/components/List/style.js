import styled from 'styled-components'
import { backgroundMainTable, borderMainTable, colorHeaderTableTitle, colorTableLink, colorTableItem } from '../../utils/colors'

export const CoreListStyles = styled.div`
    margin-top: 15px;
    .item-title {
        margin-bottom: 25px;
    }
    .sorted-box {
        margin-bottom: 20px;
        .title {
            font-weight: bold;
            font-size: 14px;
            margin-right: 15px;
        }
        .ant-checkbox-wrapper {
            margin-left: 15px;
        }
    }
    .filter-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .filter-box {
            margin-right: 50px;
            p {
                margin-bottom: 5px;
                font-weight: bold;
                font-size: 14px;
            }
        }
    }
    .table-wrapper-box {
        background: #fff;
        .loader {
            margin: 0;
            padding: 25px 0;
        }
    }
    .item-box.header div {
        font-weight: bold;
        color: ${colorHeaderTableTitle};
    }
    .item-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid ${borderMainTable};
        background: ${backgroundMainTable};
        padding: 10px 25px;
        font-size: 16px;
        .item-link {
            width: 65%;
            text-align: left;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            overflow-x: auto;
            word-wrap: break-word;
            color: ${colorTableLink}
        }
        .item-id {
            width: 25%;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${colorTableItem}
        }
        .item-length {
            width: 10%;
            justify-content: center;
            display: flex;
            align-items: center;
            color: ${colorTableItem}
        }
        .item-edit.product {
            width: 5%;
            justify-content: center;
            display: flex;
            align-items: center;
            color: ${colorTableItem}
        }
        .item-image.product {
            width: 8%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            overflow-x: auto;
            margin: 0 10px;
            img {
                max-width: 100%;
            }
        }
        .item-link.product {
            width: 35%;
        }
        .item-id.product {
            width: 25%;
            justify-content: flex-start;
            text-align: left;
            margin: 0 10px;
        }
        .item-length.product {
            width: 15%;
        }

        .item-ean.product {
            width: 7%;
            justify-content: center;
            display: flex;
            align-items: center;
            color: ${colorTableItem}
        }

        .item-date.product {
            width: 15%;
            justify-content: flex-end;
            display: flex;
            align-items: center;
        }
    }
    .empty-item {
        width: 100%;
        background: #fff;
        padding: 50px;
    }
    .pagination-controls {
        display: flex;
        justify-content: center;
        margin-top: 25px;
    }
    .item-path {
        width: 80%
    }
    .item-date {
        width: 20%
    }
    .item-title.history {
        margin-top: 25px;
    }
`
