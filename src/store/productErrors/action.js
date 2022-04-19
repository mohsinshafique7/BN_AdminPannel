const path = process.env.REACT_APP_URL;

//productErrors
export const GET_PRODUCT_ERRORS = "GET_PRODUCT_ERRORS";
export const getProductErrors = () => {
  return {
    type: GET_PRODUCT_ERRORS,
    request: {
      method: "GET",
      url: `${path}/scraper/errors/products`,
    },
  };
};

export const GET_PRODUCT_ERROR = "GET_PRODUCT_ERROR";
export const getProductError = (id) => {
  return {
    type: GET_PRODUCT_ERROR,
    request: {
      method: "GET",
      url: `${path}/scraper/errors/products/${id}`,
    },
  };
};

export const DELETE_PRODUCT_ERROR = "DELETE_PRODUCT_ERROR";
export const deleteProductError = (id) => {
  return {
    type: DELETE_PRODUCT_ERROR,
    request: {
      method: "DELETE",
      url: `${path}/scraper/errors/products/${id}`,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};

export const VIEWED_PRODUCT_ERROR = "VIEWED_PRODUCT_ERROR";
export const viewedProductError = (id) => {
  return {
    type: VIEWED_PRODUCT_ERROR,
    request: {
      method: "PUT",
      url: `${path}/scraper/errors/products/${id}`,
    },
  };
};
