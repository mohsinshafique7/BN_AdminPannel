const path = process.env.REACT_APP_URL;

//sourceCategories
export const GET_SOURCE_CATEGORIES = "GET_SOURCE_CATEGORIES";
export const getSourceCategories = () => {
  return {
    type: GET_SOURCE_CATEGORIES,
    request: {
      method: "GET",
      url: `${path}/admin/source-categories`,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const GET_SOURCE_CATEGORY = "GET_SOURCE_CATEGORY";
export const getSourceCategory = (id) => {
  return {
    type: GET_SOURCE_CATEGORY,
    request: {
      method: "GET",
      url: `${path}/admin/source-categories/${id}`,
    },
  };
};

export const CREATE_SOURCE_CATEGORY = "CREATE_SOURCE_CATEGORY";
export const createSourceCategory = (data) => {
  return {
    type: CREATE_SOURCE_CATEGORY,
    request: {
      method: "POST",
      url: `${path}/admin/source-categories`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const EDIT_SOURCE_CATEGORY = "EDIT_SOURCE_CATEGORY";
export const editSourceCategory = (data, id) => {
  return {
    type: EDIT_SOURCE_CATEGORY,
    request: {
      method: "PUT",
      url: `${path}/admin/source-categories/${id}`,
      data,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};

export const DELETE_SOURCE_CATEGORY = "DELETE_SOURCE_CATEGORY";
export const deleteSourceCategory = (id) => {
  return {
    type: DELETE_SOURCE_CATEGORY,
    request: {
      method: "DELETE",
      url: `${path}/admin/source-categories/${id}`,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};

export const GET_SOURCE_CATEGORIES_NAMES = "GET_SOURCE_CATEGORIES_NAMES";
export const getSourceCategoriesNames = () => {
  return {
    type: GET_SOURCE_CATEGORIES_NAMES,
    request: {
      method: "GET",
      url: `${path}/admin/source-categories/names/example`,
    },
  };
};

export const SET_SELECT_SOURCE_CATEGORIES = "SET_SELECT_SOURCE_CATEGORIES";
export const setSelectSourceCategories = (payload) => {
  return {
    type: SET_SELECT_SOURCE_CATEGORIES,
    data: payload,
  };
};
