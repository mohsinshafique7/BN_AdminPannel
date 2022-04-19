import { success, error } from "redux-saga-requests";
import {
  GET_SUBSCRIPTIONS,
  UPDATE_SUBSCRIPTION,
  SUBSCRIPTION_SUBSCRIBE,
  SUBSCRIPTION_UNSUBSCRIBE,
  CREATE_SUBSCRIPTION,
  DELETE_SUBSCRIPTION,
} from "./action";
import { STATE_STATUSES } from "../../utils/app";
import {deepSearch} from "../../utils/helpers" 

const initialState = {
  subscriptions: {
    locations: {},
    searchTerms: {},
    companyTaxonomies: [],
  },
  status: STATE_STATUSES.INIT,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBSCRIPTIONS: {
      return processReducer(state);
    }
    case success(GET_SUBSCRIPTIONS): {
      return {
        ...state,
        subscriptions: action.data,
        status: STATE_STATUSES.READY,
      };
    }
    case error(GET_SUBSCRIPTIONS): {
      return errorReducer(state);
    }

    case UPDATE_SUBSCRIPTION: {
      return processReducer(state);
    }
    case success(UPDATE_SUBSCRIPTION): {
      const {
        taxonomy,
        taxonomy: {
          retailer,
          id
        }
      } = action.data;
      

      const target = deepSearch("id", "children", state.subscriptions.locations[retailer.name], id)

      for (const key in taxonomy) {
        target[key] = taxonomy[key]
      }

      return {
        ...state,
        status: STATE_STATUSES.READY,
      };
    }
    case error(UPDATE_SUBSCRIPTION): {
      return errorReducer(state);
    }

    case CREATE_SUBSCRIPTION: {
      return processReducer(state);
    }
    case success(CREATE_SUBSCRIPTION): {
      const {
        taxonomy,
        taxonomy: {
          retailer: { name },
        },
      } = action.data;
      return {
        ...state,
        subscriptions: {
          ...state.subscriptions,
          searchTerms: { ...state.subscriptions.searchTerms, [name]: [...state.subscriptions.searchTerms[name], taxonomy] },
        },
        status: STATE_STATUSES.READY,
      };
    }
    case error(CREATE_SUBSCRIPTION): {
      return errorReducer(state);
    }

    case DELETE_SUBSCRIPTION: {
      return processReducer(state);
    }
    case success(DELETE_SUBSCRIPTION): {
      const {
        data: {
          retailer: { name },
        },
        meta: { id },
      } = action;

      const list = state.subscriptions.searchTerms[name].filter((item) => item.id !== id);

      return {
        ...state,
        subscriptions: {
          ...state.subscriptions,
          searchTerms: { ...state.subscriptions.searchTerms, [name]: list },
        },
        status: STATE_STATUSES.READY,
      };
    }
    case error(DELETE_SUBSCRIPTION): {
      return errorReducer(state);
    }

    case SUBSCRIPTION_SUBSCRIBE: {
      return processReducer(state);
    }
    case success(SUBSCRIPTION_SUBSCRIBE): {
      return {
        ...state,
        status: STATE_STATUSES.READY,
      };
    }
    case error(SUBSCRIPTION_SUBSCRIBE): {
      return errorReducer(state);
    }

    case SUBSCRIPTION_UNSUBSCRIBE: {
      return processReducer(state);
    }
    case success(SUBSCRIPTION_UNSUBSCRIBE): {
      return {
        ...state,
        status: STATE_STATUSES.READY,
      };
    }
    case error(SUBSCRIPTION_UNSUBSCRIBE): {
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
