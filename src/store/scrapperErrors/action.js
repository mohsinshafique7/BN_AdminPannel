const path = process.env.REACT_APP_URL;

//scrapperError
export const GET_SCRAPPER_ERROS = "GET_SCRAPPER_ERROS";
export const getScrapperErrors = () => {
  return {
    type: GET_SCRAPPER_ERROS,
    request: {
      method: "GET",
      url: `${path}/scraper/errors/scraper`,
    },
  };
};

export const GET_SCRAPPER_ERROR = "GET_SCRAPPER_ERROR";
export const getScrapperError = (id) => {
  return {
    type: GET_SCRAPPER_ERROR,
    request: {
      method: "GET",
      url: `${path}/scraper/errors/scraper/${id}`,
    },
  };
};

export const DELETE_SCRAPPER_ERROR = "DELETE_SCRAPPER_ERROR";
export const deleteScrapperError = (id) => {
  return {
    type: DELETE_SCRAPPER_ERROR,
    request: {
      method: "DELETE",
      url: `${path}/scraper/errors/scraper/${id}`,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};

export const VIEWED_SCRAPPER_ERROR = "VIEWED_SCRAPPER_ERROR";
export const viewedScrapperError = (id) => {
  return {
    type: VIEWED_SCRAPPER_ERROR,
    request: {
      method: "PUT",
      url: `${path}/scraper/errors/scraper/${id}`,
    },
  };
};
