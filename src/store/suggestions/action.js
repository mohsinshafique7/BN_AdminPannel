const path = process.env.REACT_APP_URL;

//mappingSuggestions
export const GET_SUGGESTIONS = "GET_SUGGESTIONS";

export const getSuggestions = (params) => {
  return {
    type: GET_SUGGESTIONS,
    request: {
      method: "GET",
      url: `${path}/mapping-suggestion`,
      params,
    },
  };
};

export const GET_SUGGESTION = "GET_SUGGESTION";
export const getSuggestion = (id) => {
  return {
    type: GET_SUGGESTION,
    request: {
      method: "GET",
      url: `${path}/mapping-suggestion/${id}`,
    },
  };
};

export const PRODUCT_CORE_REPLACE = "PRODUCT_CORE_REPLACE";
export const productCoreReplace = (data) => {
  return {
    type: PRODUCT_CORE_REPLACE,
    request: {
      method: "POST",
      url: `${path}/products/core_replace`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const MANUALLY_REPLACE_PRODUCT_CORE = "MANUALLY_REPLACE_PRODUCT_CORE";
export const manuallyReplaceProductCore = (data) => {
  return {
    type: MANUALLY_REPLACE_PRODUCT_CORE,
    request: {
      method: "POST",
      url: `${path}/products/core_replace_manually`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const GET_SUGGESTIONS_HISTORY = "GET_SUGGESTIONS_HISTORY";
export const getSuggestionsHistory = (params) => {
  return {
    type: GET_SUGGESTIONS_HISTORY,
    request: {
      method: "GET",
      url: `${path}/mapping-suggestion/logs/all`,
      params,
    },
  };
};

export const REVERT_MAPPING = "REVERT MAPPING";
export const revertMapping = (data) => {
  return {
    type: REVERT_MAPPING,
    request: {
      method: "POST",
      url: `${path}/mapping-suggestion/cancel`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};
