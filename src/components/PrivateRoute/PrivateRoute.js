import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => (rest.token.length ? <Component {...props} /> : <Redirect to="/" />)} />;
};

export default connect((state) => ({
  token: state.auth.token,
}))(PrivateRoute);
