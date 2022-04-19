const path = process.env.REACT_APP_URL;

//errors
export const GET_ERRORS = "GET_ERRORS";
export const getErrors = () => {
  return {
    type: GET_ERRORS,
    request: {
      method: "GET",
      url: `${path}/errors`,
    },
  };
};

export const GET_ERROR = "GET_ERROR";
export const getError = (id) => {
  return {
    type: GET_ERROR,
    request: {
      method: "GET",
      url: `${path}/errors/${id}`,
    },
  };
};

export const DELETE_ERROR = "DELETE_ERROR";
export const deleteError = (id) => {
  return {
    type: DELETE_ERROR,
    request: {
      method: "DELETE",
      url: `${path}/errors/${id}`,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};

export const DELETE_ERRORS = "DELETE_ERRORS";
export const deleteErrors = () => {
  return {
    type: DELETE_ERRORS,
    request: {
      method: "DELETE",
      url: `${path}/errors`,
    },
  };
};
