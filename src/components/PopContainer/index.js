import React from "react";

import CLOSE_BTN from "assets/images/close-btn.svg";

import "./styles.scss";

export const PopupContainer = ({ onClose, children, style, isLoading }) => {
  return (
    <div className="popup-container" style={style}>
      <img src={CLOSE_BTN} alt="" onClick={isLoading ? () => {} : () => onClose()} style={{ cursor: isLoading ? "not-allowed" : null }} />
      {children}
    </div>
  );
};
