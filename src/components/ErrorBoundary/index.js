import React, { Component } from "react";

import { Link, Redirect } from "react-router-dom";

import "./styles.scss";
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  // state = { hasError: false, redirect: false, timer: null };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught error", error, info);
  }

  // componentDidUpdate() {
  //   if (this.state.hasError) {
  //     this.state.timer = setTimeout(() => this.setState({ redirect: true }), 5000);
  //   } else {
  //     clearTimeout(this.state.timer);
  //   }
  // }

  render() {
    // if (this.state.redirect) {
    //   this.setState({ redirect: false, hasError: false });
    //   return <Redirect to="/" />;
    // }

    if (this.state.hasError) {
      return (
        <div className="error-boundary-wrapper">
          <h1>
            There was an error on this website. Wait for a few seconds or{" "}
            <Link
              // onClick={() => {
              //   clearTimeout(this.state.timer);
              //   this.setState({ redirect: false, hasError: false });
              // }}
              to="/"
            >
              Click here
            </Link>{" "}
            to go back to the home page.
          </h1>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
