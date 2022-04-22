export const SET_SEARCH_VALUE = "SET_SEARCH_VALUE";
export const setSearchValue = (value) => {
  return {
    type: SET_SEARCH_VALUE,
    value,
  };
};

export const SET_SORTED_VALUE = "SET_SORTED_VALUE";
export const setSortedValue = (value) => {
  return {
    type: SET_SORTED_VALUE,
    value,
  };
};

export const SET_REVERSE_VALUE = "SET_REVERSE_VALUE";
export const setReverseValue = (value) => {
  return {
    type: SET_REVERSE_VALUE,
    value,
  };
};

export const SET_EDIT_KEY_VALUE = "SET_EDIT_KEY_VALUE";
export const setEditKeyValue = (value) => {
  return {
    type: SET_EDIT_KEY_VALUE,
    value,
  };
};
