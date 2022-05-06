import { success, error } from "redux-saga-requests";
import { LOG_IN, LOG_OUT, RE_LOGIN } from "./action";
import { STATE_STATUSES } from "utils/statuses";

import { RESET_ERROR } from "store/error-handler/actions";

const initialState = {
  token: localStorage.getItem("Token") || "",
  refreshToken: localStorage.getItem("RefreshToken") || "",
  error: null,
  user: null,
  status: STATE_STATUSES.INIT,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RE_LOGIN: {
      return processReducer(state);
    }
    case success(RE_LOGIN): {
      const { token, refreshToken } = action.data;
      return {
        ...state,
        token,
        refreshToken,
        status: STATE_STATUSES.READY,
      };
    }
    case error(RE_LOGIN): {
      const error = action.error.response;
      return errorReducer(state, error);
    }

    case success(LOG_IN): {
      const { token, refreshToken, user } = action.data;
      return {
        ...state,
        token,
        refreshToken,
        user,
      };
    }

    case LOG_OUT: {
      return {
        ...state,
        token: "",
        refreshToken: "",
      };
    }

    case RESET_ERROR: {
      return {
        ...state,
        error: null,
      };
    }

    default: {
      return state;
    }
  }
};

const errorReducer = (state, error = null) => ({
  ...state,
  status: STATE_STATUSES.ERROR,
  error,
});

const processReducer = (state) => ({
  ...state,
  status: STATE_STATUSES.PENDING,
  error: null,
});
