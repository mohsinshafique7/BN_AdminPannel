import { success, error } from "redux-saga-requests";
import {
  GET_CORE_PRODUCTS,
  GET_CORE_PRODUCT,
  EDIT_CORE_PRODUCT,
  MERGE_CORE_PRODUCT,
  EDIT_CORE_PRODUCT_LIST,
  SET_SELECT_CORE_PRODUCTS,
} from "./action";
import { STATE_STATUSES } from "../../utils/app";

const initialState = {
  selectCoreProducts: [],
  coreProducts: {
    rows: [],
    count: 0,
  },
  coreProduct: {},
  status: STATE_STATUSES.INIT,
};

export default (state = initialState, action) => {
  switch (action.type) {
    //coreProducts
    case GET_CORE_PRODUCTS: {
      return processReducer(state);
    }
    case success(GET_CORE_PRODUCTS): {
      const { cores } = action.data;

      return {
        ...state,
        coreProducts: cores,
        status: STATE_STATUSES.READY,
      };
    }
    case error(GET_CORE_PRODUCTS): {
      return errorReducer(state);
    }

    case GET_CORE_PRODUCT: {
      return processReducer(state);
    }
    case success(GET_CORE_PRODUCT): {
      const { core } = action.data;

      return {
        ...state,
        coreProduct: core,
        status: STATE_STATUSES.READY,
      };
    }
    case error(GET_CORE_PRODUCT): {
      return errorReducer(state);
    }

    case EDIT_CORE_PRODUCT: {
      return processReducer(state);
    }
    case success(EDIT_CORE_PRODUCT): {
      const { core } = action.data;

      return {
        ...state,
        coreProduct: core,
        status: STATE_STATUSES.READY,
      };
    }
    case error(EDIT_CORE_PRODUCT): {
      return errorReducer(state);
    }

    case EDIT_CORE_PRODUCT_LIST: {
      return processReducer(state);
    }
    case success(EDIT_CORE_PRODUCT_LIST): {
      const { core } = action.data;
      const { id } = action.meta;

      const clone = [...state.coreProducts.rows];

      const foundIndex = clone.findIndex((obj) => obj.id === id);
      clone[foundIndex] = core;

      return {
        ...state,
        coreProducts: { ...state.coreProducts, rows: clone },
        status: STATE_STATUSES.READY,
      };
    }
    case error(EDIT_CORE_PRODUCT_LIST): {
      return errorReducer(state);
    }

    case SET_SELECT_CORE_PRODUCTS: {
      const ids = action.data.ids;
      const selectCoreProducts = state.coreProducts.rows.filter((c) => !ids.includes(c.id));

      return {
        ...state,
        selectCoreProducts,
        status: STATE_STATUSES.READY,
      };
    }

    case MERGE_CORE_PRODUCT: {
      return processReducer(state);
    }
    case success(MERGE_CORE_PRODUCT): {
      return {
        ...state,
        status: STATE_STATUSES.READY,
      };
    }
    case error(MERGE_CORE_PRODUCT): {
      return errorReducer(state);
    }

    default:
      return state;
  }
};

const errorReducer = (state) => ({
  ...state,
  status: STATE_STATUSES.ERROR,
});

const processReducer = (state) => ({
  ...state,
  status: STATE_STATUSES.PENDING,
});
