import { success, error } from "redux-saga-requests";
import {
  GET_COMPANIES,
  GET_COMPANY,
  GET_COMPANY_CATEGORIES,
  CREATE_COMPANY,
  EDIT_COMPANY,
  DELETE_COMPANY,
  EDIT_COMPANY_MANUFACTURER,
  EDIT_COMPANY_RETAILER,
  EDIT_COMPANY_SOURCE_CATEGORY,
  SUBSCRIBE_COMPANY_TO_CATEGORY,
  UNSUBSCRIBE_COMPANY_TO_CATEGORY,
  GET_COMPANY_SECTION,
} from "./action";
import { STATE_STATUSES } from "../../utils/app";

const initialState = {
  companies: [],
  company: {},
  categories: [],
  sections: {
    companySections: [],
    sections: [],
  },
  companyCategories: [],
  status: STATE_STATUSES.INIT,
};

export default (state = initialState, action) => {
  switch (action.type) {
    //companies
    case GET_COMPANIES:
    case GET_COMPANY_CATEGORIES:
    case SUBSCRIBE_COMPANY_TO_CATEGORY:
    case UNSUBSCRIBE_COMPANY_TO_CATEGORY: {
      return processReducer(state);
    }
    case success(GET_COMPANIES): {
      const { companies } = action.data;

      return {
        ...state,
        companies,
        status: STATE_STATUSES.READY,
      };
    }

    case success(GET_COMPANY_CATEGORIES): {
      const { companyCategories, categories } = action.data;

      return {
        ...state,
        companyCategories,
        categories,
        status: STATE_STATUSES.READY,
      };
    }

    case success(SUBSCRIBE_COMPANY_TO_CATEGORY):
    case success(UNSUBSCRIBE_COMPANY_TO_CATEGORY): {
      return {
        ...state,
        status: STATE_STATUSES.READY,
      };
    }
    case error(GET_COMPANIES):
    case error(GET_COMPANY_CATEGORIES):
    case error(SUBSCRIBE_COMPANY_TO_CATEGORY):
    case error(UNSUBSCRIBE_COMPANY_TO_CATEGORY): {
      return errorReducer(state);
    }

    case GET_COMPANY: {
      return processReducer(state);
    }
    case success(GET_COMPANY): {
      const { company } = action.data;

      return {
        ...state,
        company,
        status: STATE_STATUSES.READY,
      };
    }
    case error(GET_COMPANY): {
      return errorReducer(state);
    }

    case CREATE_COMPANY: {
      return processReducer(state);
    }
    case success(CREATE_COMPANY): {
      return {
        ...state,
        companies: [...state.companies, action.data],
        status: STATE_STATUSES.READY,
      };
    }
    case error(CREATE_COMPANY): {
      return errorReducer(state);
    }

    case EDIT_COMPANY: {
      return processReducer(state);
    }
    case success(EDIT_COMPANY): {
      const { company } = action.data;

      return {
        ...state,
        company,
        status: STATE_STATUSES.READY,
      };
    }
    case error(EDIT_COMPANY): {
      return errorReducer(state);
    }

    case DELETE_COMPANY: {
      return processReducer(state);
    }
    case success(DELETE_COMPANY): {
      const companies = state.companies.filter((item) => item.id !== action.meta.id);

      return {
        ...state,
        companies,
        status: STATE_STATUSES.READY,
      };
    }
    case error(DELETE_COMPANY): {
      return errorReducer(state);
    }

    case EDIT_COMPANY_MANUFACTURER: {
      return processReducer(state);
    }
    case success(EDIT_COMPANY_MANUFACTURER): {
      return {
        ...state,
        company: action.data.result,
        status: STATE_STATUSES.READY,
      };
    }
    case error(EDIT_COMPANY_MANUFACTURER): {
      return errorReducer(state);
    }

    case EDIT_COMPANY_RETAILER: {
      return processReducer(state);
    }
    case success(EDIT_COMPANY_RETAILER): {
      return {
        ...state,
        company: action.data.result,
        status: STATE_STATUSES.READY,
      };
    }
    case error(EDIT_COMPANY_RETAILER): {
      return errorReducer(state);
    }
    case EDIT_COMPANY_SOURCE_CATEGORY: {
      return processReducer(state);
    }
    case success(EDIT_COMPANY_SOURCE_CATEGORY): {
      const { company } = action.data;

      return {
        ...state,
        company,
        status: STATE_STATUSES.READY,
      };
    }
    case error(EDIT_COMPANY_SOURCE_CATEGORY): {
      return errorReducer(state);
    }

    case GET_COMPANY_SECTION: {
      return processReducer(state);
    }
    case success(GET_COMPANY_SECTION): {
      const { result } = action.data;

      return {
        ...state,
        sections: result,
        status: STATE_STATUSES.READY,
      };
    }
    case error(GET_COMPANY_SECTION): {
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
