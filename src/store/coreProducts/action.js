const path = process.env.REACT_APP_URL;

//coreProducts
export const GET_CORE_PRODUCTS = "GET_CORE_PRODUCTS";
export const getCoreProducts = (params) => {
  return {
    type: GET_CORE_PRODUCTS,
    request: {
      method: "GET",
      url: `${path}/coreProducts`,
      params,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const GET_CORE_PRODUCT = "GET_CORE_PRODUCT";
export const getCoreProduct = (id) => {
  return {
    type: GET_CORE_PRODUCT,
    request: {
      method: "GET",
      url: `${path}/coreProducts/${id}`,
    },
  };
};

export const EDIT_CORE_PRODUCT = "EDIT_CORE_PRODUCT";
export const EDIT_CORE_PRODUCT_LIST = "EDIT_CORE_PRODUCT_LIST";
export const editCoreProduct = (actionType, id, data) => {
  return {
    type: actionType,
    request: {
      method: "PUT",
      url: `${path}/coreProducts/${id}`,
      data,
    },
    meta: {
      id,
      asPromise: true,
    },
  };
};

export const MERGE_CORE_PRODUCT = "MERGE_CORE_PRODUCT";
export const mergeCoreProduct = (data) => {
  return {
    type: MERGE_CORE_PRODUCT,
    request: {
      method: "POST",
      url: `${path}/coreProducts/merge`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const SET_SELECT_CORE_PRODUCTS = "SET_SELECT_CORE_PRODUCTS";
export const setSelectCoreProducts = (payload) => {
  return {
    type: SET_SELECT_CORE_PRODUCTS,
    data: payload,
  };
};
