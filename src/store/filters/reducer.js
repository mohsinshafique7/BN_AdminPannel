import { SET_SEARCH_VALUE, SET_SORTED_VALUE, SET_REVERSE_VALUE, SET_EDIT_KEY_VALUE } from "./action";

const initialState = {
  sortedValue: "",
  searchValue: "",
  reverse: false,
  editingKey: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_VALUE: {
      return {
        ...state,
        searchValue: action.value,
      };
    }

    case SET_SORTED_VALUE: {
      return {
        ...state,
        sortedValue: action.value,
      };
    }

    case SET_REVERSE_VALUE: {
      return {
        ...state,
        reverse: action.value,
      };
    }
    case SET_EDIT_KEY_VALUE: {
      return {
        ...state,
        editingKey: action.value,
      };
    }

    default:
      return state;
  }
};
