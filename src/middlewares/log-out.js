import { showErrorPopup } from "store/error-handler/actions";

export const signOutMiddleware = (store) => (next) => (action) => {
  if (action.error && action.error.response.status === 401) {
    store.dispatch(showErrorPopup(action.error.response));
  }

  if (action.error && action.error.response.status === 403) {
    store.dispatch(showErrorPopup(action.error.response));
  }

  next(action);
};
