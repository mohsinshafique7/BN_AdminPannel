import { success, error } from "redux-saga-requests";
import {
  GET_PROGUCT_GROUPS,
  GET_PROGUCT_GROUP,
  CREATE_PROGUCT_GROUP,
  EDIT_PROGUCT_GROUP,
  ADD_PROGUCT_GROUP_CORES,
  REMOVE_PROGUCT_GROUP_CORES,
} from "./action";
import { STATE_STATUSES } from "../../utils/app";

const initialState = {
  productGroups: [],
  productGroup: {
    coreProduct: [],
  },
  status: STATE_STATUSES.INIT,
};

export default (state = initialState, action) => {
  switch (action.type) {
    //productGroups
    case GET_PROGUCT_GROUPS: {
      return processReducer(state);
    }
    case success(GET_PROGUCT_GROUPS): {
      const { productGroups } = action.data;

      return {
        ...state,
        productGroups,
        status: STATE_STATUSES.READY,
      };
    }
    case error(GET_PROGUCT_GROUPS): {
      return errorReducer(state);
    }

    case GET_PROGUCT_GROUP: {
      return processReducer(state);
    }
    case success(GET_PROGUCT_GROUP): {
      const { productGroup } = action.data;

      return {
        ...state,
        productGroup,
        status: STATE_STATUSES.READY,
      };
    }
    case error(GET_PROGUCT_GROUP): {
      return errorReducer(state);
    }

    // case CREATE_PROGUCT_GROUP: {
    //   return processReducer(state);
    // }
    case success(CREATE_PROGUCT_GROUP): {
      const { productGroup } = action.data;

      return {
        ...state,
        productGroups: [...state.productGroups, productGroup],
        // status: STATE_STATUSES.READY,
      };
    }
    // case error(CREATE_PROGUCT_GROUP): {
    //   return errorReducer(state);
    // }

    // case EDIT_PROGUCT_GROUP: {
    //   return processReducer(state);
    // }
    case success(EDIT_PROGUCT_GROUP): {
      const { productGroup } = action.data;

      return {
        ...state,
        productGroup,
        // status: STATE_STATUSES.READY,
      };
    }
    // case error(EDIT_PROGUCT_GROUP): {
    //   return errorReducer(state);
    // }

    // case ADD_PROGUCT_GROUP_CORES: {
    //   return processReducer(state);
    // }
    case success(ADD_PROGUCT_GROUP_CORES): {
      const { productGroup } = action.data;

      return {
        ...state,
        productGroup,
      };
    }
    // case error(ADD_PROGUCT_GROUP_CORES): {
    //   return errorReducer(state);
    // }

    // case REMOVE_PROGUCT_GROUP_CORES: {
    //   return processReducer(state);
    // }
    case success(REMOVE_PROGUCT_GROUP_CORES): {
      const { productGroup } = action.data;

      return {
        ...state,
        productGroup,
      };
    }
    // case error(REMOVE_PROGUCT_GROUP_CORES): {
    //   return errorReducer(state);
    // }

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
