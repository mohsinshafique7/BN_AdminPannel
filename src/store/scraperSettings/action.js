const path = process.env.REACT_APP_URL;

//scraperSettings
export const GET_SCRAPPER_SETTINGS = "GET_SCRAPPER_SETTINGS";
export const getScrapperSetting = (params) => {
  return {
    type: GET_SCRAPPER_SETTINGS,
    request: {
      method: "GET",
      url: `${path}/scraper/settings`,
      params,
    },
  };
};

export const UPDATE_SCRAPPER_SETTINGS = "UPDATE_SCRAPPER_SETTINGS";
export const updateScrapperSetting = (params, data) => {
  return {
    type: UPDATE_SCRAPPER_SETTINGS,
    request: {
      method: "PUT",
      url: `${path}/scraper/settings`,
      params,
      data,
    },
  };
};

export const CREATE_SCRAPPER_SETTINGS = "CREATE_SCRAPPER_SETTINGS";
export const createScrapperSetting = (params, data) => {
  return {
    type: CREATE_SCRAPPER_SETTINGS,
    request: {
      method: "POST",
      url: `${path}/scraper/settings`,
      params,
      data,
    },
  };
};

export const RETAILER_DROP_TODAY = "RETAILER_DROP_TODAY";
export const reatailerDropToday = (data) => {
  return {
    type: RETAILER_DROP_TODAY,
    request: {
      method: "POST",
      url: `${path}/admin/retailers/drop_today`,
      data,
    },
  };
};

export const SCRAPPER_RUN = "SCRAPPER_RUN";
export const scrapperRun = (data) => {
  return {
    type: SCRAPPER_RUN,
    request: {
      method: "POST",
      url: `${path}/scraper/run`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const SET_RESULT = "SET_RESULT";
export const setResult = (value) => {
  return {
    type: SET_RESULT,
    value,
  };
};
