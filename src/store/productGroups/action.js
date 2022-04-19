const path = process.env.REACT_APP_URL;

//productGroups
export const GET_PROGUCT_GROUPS = "GET_PROGUCT_GROUPS";
export const getProductGroups = () => {
  return {
    type: GET_PROGUCT_GROUPS,
    request: {
      method: "GET",
      url: `${path}/admin/product-groups`,
    },
  };
};

export const GET_PROGUCT_GROUP = "GET_PROGUCT_GROUP";
export const getProductGroup = (id) => {
  return {
    type: GET_PROGUCT_GROUP,
    request: {
      method: "GET",
      url: `${path}/admin/product-groups/${id}`,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const CREATE_PROGUCT_GROUP = "CREATE_PROGUCT_GROUP";
export const createProductGroup = (data) => {
  return {
    type: CREATE_PROGUCT_GROUP,
    request: {
      method: "POST",
      url: `${path}/admin/product-groups`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const EDIT_PROGUCT_GROUP = "EDIT_PROGUCT_GROUP";
export const editProductGroup = (data, id) => {
  return {
    type: EDIT_PROGUCT_GROUP,
    request: {
      method: "PUT",
      url: `${path}/admin/product-groups/${id}`,
      data,
    },
  };
};

export const DELETE_PROGUCT_GROUP = "DELETE_PROGUCT_GROUP";
export const deleteProductGroup = (id) => {
  return {
    type: DELETE_PROGUCT_GROUP,
    request: {
      method: "DELETE",
      url: `${path}/admin/product-groups/${id}`,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};

export const ADD_PROGUCT_GROUP_CORES = "ADD_PROGUCT_GROUP_CORES";
export const addProductGroupCores = (values, id) => {
  return {
    type: ADD_PROGUCT_GROUP_CORES,
    request: {
      method: "PUT",
      url: `${path}/admin/product-groups/${id}/addCores`,
      data: values,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};

export const REMOVE_PROGUCT_GROUP_CORES = "REMOVE_PROGUCT_GROUP_CORES";
export const removeProductGroupCores = (values, id) => {
  return {
    type: REMOVE_PROGUCT_GROUP_CORES,
    request: {
      method: "PUT",
      url: `${path}/admin/product-groups/${id}/removeCores`,
      data: values,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};
