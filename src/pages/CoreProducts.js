import React from "react";
import Template from "../components/Template/Template";
import CoreProductsList from "../components/List/CoreProductsList";

export default () => <Template component={<CoreProductsList pathParam={"core-products"} isMerge={false} />} />;
