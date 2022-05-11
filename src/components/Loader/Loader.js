import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import { loaderColor } from "../../utils/colors";

export const Styles = styled.div`
  display: block;
  width: 100%;
  .loader {
    text-align: center;
    margin-top: 50px;
  }
`;

export default () => {
  return (
    <Styles>
      <div data-testid="loaders">
        <Loader className="loader" type="Oval" color={loaderColor} height={100} width={100} />
      </div>
    </Styles>
  );
};
