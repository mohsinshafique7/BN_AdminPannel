export const RESET_ERROR = "RESET_ERROR";
export const resetError = () => {
  return {
    type: RESET_ERROR,
  };
};

export const SHOW_ERROR_POPUP = "SHOW_ERROR_POPUP";
export const showErrorPopup = (error = null) => {
  return {
    type: SHOW_ERROR_POPUP,
    data: error,
  };
};
