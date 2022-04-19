import { SHOW_ERROR_POPUP, RESET_ERROR } from "./actions";

const initialStore = {
  error: null,
};

export default (state = initialStore, action) => {
  switch (action.type) {
    case SHOW_ERROR_POPUP: {
      return { ...state, error: action.data };
    }
    case RESET_ERROR: {
      return { ...state, error: null };
    }
    default: {
      return state;
    }
  }
};
