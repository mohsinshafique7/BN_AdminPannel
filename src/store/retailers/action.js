const path = process.env.REACT_APP_URL;

//retailers
export const GET_RETAILERS = "GET_RETAILERS";
export const getRetailers = () => {
  return {
    type: GET_RETAILERS,
    request: {
      method: "GET",
      url: `${path}/admin/retailers`,
    },
  };
};

export const GET_RETAILER = "GET_RETAILER";
export const getRetailer = (id) => {
  return {
    type: GET_RETAILER,
    request: {
      method: "GET",
      url: `${path}/admin/retailers/${id}`,
    },
  };
};

export const CREATE_RETAILER = "CREATE_RETAILER";
export const createRetailer = (data) => {
  return {
    type: CREATE_RETAILER,
    request: {
      method: "POST",
      url: `${path}/admin/retailers`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const EDIT_RETAILER = "EDIT_RETAILER";
export const editRetailer = (data, id) => {
  return {
    type: EDIT_RETAILER,
    request: {
      method: "PUT",
      url: `${path}/admin/retailers/${id}`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const DELETE_RETAILER = "DELETE_RETAILER";
export const deleteRetailer = (id) => {
  return {
    type: DELETE_RETAILER,
    request: {
      method: "DELETE",
      url: `${path}/admin/retailers/${id}`,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};
