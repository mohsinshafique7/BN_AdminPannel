import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SignInRoute from "./components/SignInRoute/SignInRoute";
import SignIn from "./pages/SignIn";
import Users from "./pages/Users";
import User from "./pages/User";
import Manufacturers from "./pages/Manufacturers";
import Manufacturer from "./pages/Manufacturer";
import Brands from "./pages/Brands";
import Brand from "./pages/Brand";
import Retailers from "./pages/Retailers";
import Retailer from "./pages/Retailer";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import ProductGroups from "./pages/ProductGroups";
import ProductGroup from "./pages/ProductGroup";
import CreateProductGroup from "./pages/CreateProductGroup";
import MergeProduct from "./pages/MergeProduct";
import ScrapperLinks from "./pages/ScrapperLinks";
import ScrapperLink from "./pages/ScrapperLink";
import Companies from "./pages/Companies";
import Company from "./pages/Company";
import SourceCategories from "./pages/SourceCategories";
import SourceCategory from "./pages/SourceCategory";
import Suggestions from "./pages/Suggestions";
import Suggestion from "./pages/Suggestion";
import CoreProducts from "./pages/CoreProducts";
import CoreProduct from "./pages/CoreProduct";
import Errors from "./pages/Errors";
import Error from "./pages/Error";
import Notifications from "./pages/Notifications";
import Notification from "./pages/Notification";
import Subscriptions from "./pages/Subscriptions";
import ScrapperError from "./pages/ScrapperError";
import ProductError from "./pages/ProductError";
import ScraperSettings from "./pages/ScraperSettings";
import ScraperSetting from "./pages/ScraperSetting";
import NotFoundPage from "components/NotFoundPage";
import ErrorPopup from "components/ErrorPopup";
import { resetError } from "store/error-handler/actions";
import { ErrorBoundary } from "react-error-boundary";
import FallBack from "components/Error-Boundary/FallBack";
const Routers = () => {
  const { error } = useSelector((state) => state.errorHandler);
  console.log("error", error);
  const dispatch = useDispatch();

  const errorHandler = (error, errorInfo) => {
    console.log(error);
    console.log(errorInfo);
    //   return <ErrorPopup
    //   tokenHasExpired={error.status === 401}
    //   cantVerifyToken={error.status === 403}
    //   cancelHandler={() => dispatch(resetError())}
    // />
  };
  return (
    <Router>
      <ErrorBoundary
        FallbackComponent={FallBack}
        onError={errorHandler}
        onReset={() => {
          console.log("Error Reset");
        }}
      >
        <Switch>
          <SignInRoute exact path="/" component={SignIn} />
          <PrivateRoute exact path="/users/:param" component={Users} />
          <PrivateRoute exact path="/user/:id" component={User} />
          <PrivateRoute exact path="/manufacturers/:param" component={Manufacturers} />
          <PrivateRoute exact path="/manufacturer/:id/:param" component={Manufacturer} />
          <PrivateRoute exact path="/brands/:param" component={Brands} />
          <PrivateRoute exact path="/brand/:id/:tab/:param" component={Brand} />
          <PrivateRoute exact path="/retailers/:param" component={Retailers} />
          <PrivateRoute exact path="/retailer/:id" component={Retailer} />
          <PrivateRoute exact path="/categories/:param" component={Categories} />
          <PrivateRoute exact path="/category/:id/:param" component={Category} />
          <PrivateRoute exact path="/product-groups/:param" component={ProductGroups} />
          <PrivateRoute exact path="/product-group/:id" component={ProductGroup} />
          <PrivateRoute exact path="/create-product-group/:id" component={CreateProductGroup} />
          <PrivateRoute exact path="/merge-product/:page" component={MergeProduct} />
          <PrivateRoute exact path="/scrapper-links/:param" component={ScrapperLinks} />
          <PrivateRoute exact path="/scrapper-link/:id" component={ScrapperLink} />
          <PrivateRoute exact path="/companies/:param" component={Companies} />
          <PrivateRoute exact path="/company/:id/:tab/:param" component={Company} />
          <PrivateRoute exact path="/source-categories/:param" component={SourceCategories} />
          <PrivateRoute exact path="/source-category/:id" component={SourceCategory} />
          <PrivateRoute exact path="/mapping-suggestions/:tab/:page" component={Suggestions} />
          <PrivateRoute exact path="/mapping-suggestion/:id" component={Suggestion} />
          <PrivateRoute exact path="/core-products/:page" component={CoreProducts} />
          <PrivateRoute exact path="/core-product/:id" component={CoreProduct} />
          <PrivateRoute exact path="/errors/:param" component={Errors} />
          <PrivateRoute exact path="/error/:id" component={Error} />
          <PrivateRoute exact path="/notifications/:tab/:param" component={Notifications} />
          <PrivateRoute exact path="/notification/:id" component={Notification} />
          <PrivateRoute exact path="/subscriptions" component={Subscriptions} />
          <PrivateRoute exact path="/scrapper-error/:id" component={ScrapperError} />
          <PrivateRoute exact path="/product-error/:id" component={ProductError} />
          <PrivateRoute exact path="/scraper-settings/:param" component={ScraperSettings} />
          <PrivateRoute exact path="/scraper-setting/:param" component={ScraperSetting} />
          <Route component={NotFoundPage} />
        </Switch>
        {!!error ? (
          <ErrorPopup tokenHasExpired={error === 401} cantVerifyToken={error === 403} cancelHandler={() => dispatch(resetError())} />
        ) : null}
      </ErrorBoundary>
    </Router>
  );
};

export default Routers;
