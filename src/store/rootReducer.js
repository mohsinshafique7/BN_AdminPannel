import { combineReducers } from "redux";

import auth from "./auth/reducer";
import filters from "./filters/reducer";
import manufacturersBrands from "./manufacturersBrands/reducer";
import retailers from "./retailers/reducer";
import users from "./users/reducer";
import categories from "./categories/reducer";
import productGroups from "./productGroups/reducer";
import scrapperLinks from "./scrapperLinks/reducer";
import weights from "./weights/reducer";
import companies from "./companies/reducer";
import sourceCategories from "./sourceCategories/reducer";
import userSourceCategories from "./userSourceCategories/reducer";
import suggestions from "./suggestions/reducer";
import coreProducts from "./coreProducts/reducer";
import errors from "./errors/reducer";
import notifications from "./notifications/reducer";
import scrapperErrors from "./scrapperErrors/reducer";
import productErrors from "./productErrors/reducer";
import scraperSettings from "./scraperSettings/reducer";
import subscriptions from "./subscriptions/reducer";
import errorHandler from "./error-handler/reducers";

export default combineReducers({
  auth,
  filters,
  manufacturersBrands,
  retailers,
  users,
  categories,
  productGroups,
  scrapperLinks,
  weights,
  companies,
  sourceCategories,
  userSourceCategories,
  suggestions,
  coreProducts,
  errors,
  notifications,
  scrapperErrors,
  productErrors,
  scraperSettings,
  subscriptions,
  errorHandler,
});
