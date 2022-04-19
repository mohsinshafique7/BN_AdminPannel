const path = process.env.REACT_APP_URL;

export const GET_USERS = "GET_USERS";
export const getUsers = () => {
  return {
    type: GET_USERS,
    request: {
      method: "GET",
      url: `${path}/users`,
    },
  };
};

export const GET_USER = "GET_USER";
export const getUser = (id) => {
  return {
    type: GET_USER,
    request: {
      method: "GET",
      url: `${path}/users/${id}`,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const CREATE_USER = "CREATE_USER";
export const createUser = (data) => {
  return {
    type: CREATE_USER,
    request: {
      method: "POST",
      url: `${path}/users`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const EDIT_USER = "EDIT_USER";
export const editUser = (id, data) => {
  return {
    type: EDIT_USER,
    request: {
      method: "PUT",
      url: `${path}/users/${id}`,
      data,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};

export const DELETE_USER = "DELETE_USER";
export const deleteUser = (id) => {
  return {
    type: DELETE_USER,
    request: {
      method: "DELETE",
      url: `${path}/users/${id}`,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};

export const RESET_PASSWORD = "RESET_PASSWORD";
export const resetPassword = (id, data) => {
  return {
    type: RESET_PASSWORD,
    request: {
      method: "POST",
      url: `${path}/users/${id}/password-reset`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const GET_USER_HISTORY = "GET_USER_HISTORY";
export const getUserHistory = (id, params) => {
  return {
    type: GET_USER_HISTORY,
    request: {
      method: "GET",
      url: `${path}/users/${id}/history`,
      params,
    },
  };
};
