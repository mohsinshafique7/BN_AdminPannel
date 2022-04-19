const path = process.env.REACT_APP_URL;

//Get All Weihgts
export const getAllWeihgts = (isUserWeights, id) => async (dispatch) => {
  if (isUserWeights) {
    await dispatch(getUserWeights(id));
  } else {
    await dispatch(getCompanyWeights(id));
  }
};

export const GET_USER_WEIGHTS = "GET_USER_WEIGHTS";
const getUserWeights = (id) => {
  return {
    type: GET_USER_WEIGHTS,
    request: {
      method: "GET",
      url: `${path}/admin/users/${id}/weights`,
    },
  };
};

export const GET_COMPANY_WEIGHTS = "GET_COMPANY_WEIGHTS";
const getCompanyWeights = (id) => {
  return {
    type: GET_COMPANY_WEIGHTS,
    request: {
      method: "GET",
      url: `${path}/admin/company/${id}/weights`,
    },
  };
};

//Get Example
export const getWeightExample = (isUserWeights, userId, companyId, weight) => async (dispatch) => {
  if (isUserWeights) {
    await dispatch(getUserWeightExample(userId, weight));
  } else {
    await dispatch(getCompanyWeightExample(companyId, weight));
  }
};

export const GET_USER_WEIGHT_EXAMPLE = "GET_USER_WEIGHT_EXAMPLE";
const getUserWeightExample = (id, weight) => {
  return {
    type: GET_USER_WEIGHT_EXAMPLE,
    request: {
      method: "GET",
      url: `${path}/admin/users/${id}/weights/${weight}/example`,
    },
    meta: {
      weight,
    },
  };
};

export const GET_COMPANY_WEIGHT_EXAMPLE = "GET_COMPANY_WEIGHT_EXAMPLE";
const getCompanyWeightExample = (id, weight) => {
  return {
    type: GET_COMPANY_WEIGHT_EXAMPLE,
    request: {
      method: "GET",
      url: `${path}/admin/company/${id}/weights/${weight}/example`,
    },
    meta: {
      weight,
    },
  };
};

//Create Weight
export const createWeight = (isUserWeights, userId, companyId, data, nameParam) => async (dispatch) => {
  if (isUserWeights) {
    await dispatch(createUserWeight(userId, data, nameParam));
  } else {
    await dispatch(createCompanyWeight(companyId, data, nameParam));
  }
};

export const CREATE_USER_WEIGHT = "CREATE_USER_WEIGHT";
const createUserWeight = (id, data, nameParam) => {
  return {
    type: CREATE_USER_WEIGHT,
    request: {
      method: "POST",
      url: `${path}/admin/users/${id}/weights`,
      data,
    },
    meta: {
      asPromise: true,
      nameParam,
    },
  };
};

export const CREATE_COMPANY_WEIGHT = "CREATE_COMPANY_WEIGHT";
const createCompanyWeight = (id, data, nameParam) => {
  return {
    type: CREATE_COMPANY_WEIGHT,
    request: {
      method: "POST",
      url: `${path}/admin/company/${id}/weights`,
      data,
    },
    meta: {
      asPromise: true,
      nameParam,
    },
  };
};

//Edit Weight
export const editWeight = (isUserWeights, userId, companyId, data, nameParam) => async (dispatch) => {
  if (isUserWeights) {
    await dispatch(editUserWeight(userId, data, nameParam));
  } else {
    await dispatch(editCompanyWeight(companyId, data, nameParam));
  }
};

export const EDIT_USER_WEIGHT = "EDIT_USER_WEIGHT";
const editUserWeight = (id, data, nameParam) => {
  return {
    type: EDIT_USER_WEIGHT,
    request: {
      method: "PUT",
      url: `${path}/admin/users/${id}/weights`,
      data,
    },
    meta: {
      asPromise: true,
      nameParam,
    },
  };
};

export const EDIT_COMPANY_WEIGHT = "EDIT_COMPANY_WEIGHT";
const editCompanyWeight = (id, data, nameParam) => {
  return {
    type: EDIT_COMPANY_WEIGHT,
    request: {
      method: "PUT",
      url: `${path}/admin/company/${id}/weights`,
      data,
    },
    meta: {
      asPromise: true,
      nameParam,
    },
  };
};
