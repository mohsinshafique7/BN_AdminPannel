import styled from 'styled-components'
import { backgroundMainTable, borderMainTable } from '../../utils/colors'

export const Styles = styled.div`
    .item-title {
        margin-top: 15px;
        margin-bottom: 25px;
    }
    .table-wrapper {
        background: ${backgroundMainTable};
    }
    .header-table-wrapper {
        width: 100%;
        .header-table {
            width: 100%;
            display: flex;
            align-items: center;
            background: #d6d6d6;
            .table-title {
                font-size: 16px;
                font-weight: bold;
                width: 40%;
                padding: 10px;
                text-align: center;
                border: 1px solid ${borderMainTable};
            }
            & > div:nth-child(1) {
                background: #FE6A68;
            }
            & > div:nth-child(2) {
                background: #1EC68D;
            }
        }
        .empty-box {
            width: 20%;
            @media (max-width: 2200px) {
                max-width: 260px;
            }
        }
    }
    .subheader-table-wrapper {
        width: 100%;
        display: flex;
        align-items: center;
        background: #d6d6d6;
    }
    .item-table {
        position: relative;
        display: flex;
        cursor: pointer;
        transition: all .3s;
        &:hover {
            background: #f9f9f9;
        }
    }
    .item-history.header {
        font-weight: bold;
    }
    .item-history {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 10%;
        padding: 10px;
        text-align: center;
        border: 1px solid ${borderMainTable};
        @media (max-width: 1780px) {
            padding: 10px 2px;
        }
        img {
            height: 60px;
        }
    }
    .matching-item.header {
        font-weight: bold;
    }
    .matching-item {
        width: 10%;
        padding: 10px;
        text-align: center;
        border: 1px solid ${borderMainTable};
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .pagination-controls {
        display: flex;
        justify-content: center;
        margin-top: 25px;
    }
    .empty-item {
        padding: 25px;
    }
    .loader {
        padding: 40px 25px 25px 25px;
        margin-top: 0;
    }

    .filter-box {
        margin-bottom: 20px;
        .title {
            font-weight: bold;
            font-size: 14px;
            margin-right: 8px;
        }
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
`