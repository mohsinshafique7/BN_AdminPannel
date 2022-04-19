import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

const SignInRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            rest.token.length ?
                <Redirect to="/users/page=0&perPage=10" />
            :  <Component {...props} />
        )} />
    );
};

export default connect(
  state => ({
    token: state.auth.token
  })
)(SignInRoute)
