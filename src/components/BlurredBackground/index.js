import React from "react";

import "./styles.scss";

const BlurredBackground = ({ children }) => {
  return <div className="blurred-background">{children}</div>;
};

export default BlurredBackground;
