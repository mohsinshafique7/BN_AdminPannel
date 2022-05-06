import React from "react";
import { withRouter } from "react-router-dom";

import "../../App.scss";
const FallBack = ({ history, error, resetErrorBoundary }) => {
  return (
    <div className="error-boundary-wrapper">
      <h1>There was an error on this website.</h1>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default withRouter(FallBack);
