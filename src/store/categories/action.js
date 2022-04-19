const path = process.env.REACT_APP_URL;

//categories
export const GET_CATEGORIES = "GET_CATEGORIES";
export const getCategories = () => {
  return {
    type: GET_CATEGORIES,
    request: {
      method: "GET",
      url: `${path}/admin/subscription/category`,
    },
  };
};

export const GET_CATEGORY = "GET_CATEGORY";
export const getCategory = (id) => {
  return {
    type: GET_CATEGORY,
    request: {
      method: "GET",
      url: `${path}/admin/subscription/category/${id}`,
    },
  };
};

export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const createCategory = (data) => {
  return {
    type: CREATE_CATEGORY,
    request: {
      method: "POST",
      url: `${path}/admin/subscription/category`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const EDIT_CATEGORY = "EDIT_CATEGORY";
export const editCategory = (values, id) => {
  return {
    type: EDIT_CATEGORY,
    request: {
      method: "PUT",
      url: `${path}/admin/subscription/category/${id}`,
      data: values,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};

export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const deleteCategory = (id) => {
  return {
    type: DELETE_CATEGORY,
    request: {
      method: "DELETE",
      url: `${path}/admin/subscription/category/${id}`,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};
