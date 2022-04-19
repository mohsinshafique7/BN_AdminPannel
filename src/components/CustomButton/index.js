import React from "react";
import Loader from "react-loader-spinner";

import { BUTTONS_TYPE } from "constants/buttons-type.constants";

import { backgroundMainTable } from "utils/colors";

import "./styles.scss";

const CustomButton = ({ title, onClick, style, type, color, disabled, isLoading }) => {
  return (
    <div className="custom-button-wrapper">
      <button
        className={`custom-button ${type}`}
        onClick={disabled ? () => {} : onClick}
        disabled={disabled || isLoading}
        style={type === BUTTONS_TYPE.SOLID ? { background: color } : null}
      >
        {isLoading ? <Loader className="spinner" type="Oval" color={backgroundMainTable} height={16} width={16} /> : title}
      </button>
    </div>
  );
};

export default CustomButton;
