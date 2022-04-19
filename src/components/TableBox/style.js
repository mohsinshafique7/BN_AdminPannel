import styled from 'styled-components'
import { backgroundMainTable, borderMainTable, colorHeaderTableTitle, colorTableLink, colorTableItem } from '../../utils/colors'

export const Styles = styled.div`
  margin-top: 15px;
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
    padding: 12px 25px;
    font-size: 18px;

    & > * {
      flex-shrink: 0;
      text-align: center;
      color: ${colorTableItem};
    }
    .item-link {
      flex-grow: 1;
      flex-shrink: 1;
      text-align: left;
      color: ${colorTableLink};
    }
    .item-subscription {
      flex-shrink: 1;
      white-space: nowrap;
    }
    .item-id {
      width: 65px;
    }
    .item-color {
      width: 65px;
	  div {
		  box-sizing: border-box;
		  width: 20px;
		  height: 20px;
		  margin: auto;
	  }
    }
    .item-price {
      width: 90px;
    }
    .item-unit {
      width: 100px;
    }
    .item-date {
      width: 200px;
      text-align: right;
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
`;
