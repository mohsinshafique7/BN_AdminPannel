const path = process.env.REACT_APP_URL;

//userSourceCategories
export const GET_USER_SOURCE_CATEGORIES = "GET_USER_SOURCE_CATEGORIES";
export const getUserSourceCategories = (id) => {
  return {
    type: GET_USER_SOURCE_CATEGORIES,
    request: {
      method: "GET",
      url: `${path}/admin/user-source-categories/users/${id}`,
    },
  };
};

export const CREATE_USER_SOURCE_CATEGORY = "CREATE_USER_SOURCE_CATEGORY";
export const createUserSourceCategory = (data) => {
  return {
    type: CREATE_USER_SOURCE_CATEGORY,
    request: {
      method: "POST",
      url: `${path}/admin/user-source-categories`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const EDIT_USER_SOURCE_CATEGORY = "EDIT_USER_SOURCE_CATEGORY";
export const editUserSourceCategory = (id, data) => {
  return {
    type: EDIT_USER_SOURCE_CATEGORY,
    request: {
      method: "PUT",
      url: `${path}/admin/user-source-categories/${id}`,
      data,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};

export const DELETE_USER_SOURCE_CATEGORY = "DELETE_USER_SOURCE_CATEGORY";
export const deleteUserSourceCategory = (userId, id) => {
  return {
    type: DELETE_USER_SOURCE_CATEGORY,
    request: {
      method: "DELETE",
      url: `${path}/admin/user-source-categories/${userId}/${id}`,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};
