const path = process.env.REACT_APP_URL;

export const LOG_IN = "LOG_IN";
const logIn = (values) => {
  return {
    type: LOG_IN,
    request: {
      method: "POST",
      url: `${path}/auth/login/admin`,
      data: values,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const requestLogIn = (values) => async (dispatch) => {
  await dispatch(logIn(values)).then((data) => {
    const {
      data: { token, refreshToken },
    } = data;
    localStorage.setItem("Token", token);
    localStorage.setItem("RefreshToken", refreshToken);
  });
};

export const LOG_OUT = "LOG_OUT";
export const logOut = () => {
  localStorage.clear();
  return {
    type: LOG_OUT,
  };
};

export const RE_LOGIN = "RE_LOGIN";
export const relogin = (data) => {
  return {
    type: RE_LOGIN,
    request: {
      url: `${path}/auth/refresh-token`,
      method: "POST",
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const requestReLogIn = (values) => async (dispatch) => {
  await dispatch(relogin(values)).then((response) => {
    const { token, refreshToken } = response.data;
    localStorage.setItem("Token", token);
    localStorage.setItem("RefreshToken", refreshToken);
  });
};
