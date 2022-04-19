import amazon from "assets/images//retailers/amazon.svg";
import asda from "assets/images//retailers/asda.svg";
import morrisons from "assets/images//retailers/morrisons.svg";
import sainsburys from "assets/images//retailers/sainsburys.svg";
import tesco from "assets/images//retailers/tesco.svg";
import waitrose from "assets/images//retailers/waitrose.svg";
import iceland from "assets/images//retailers/iceland.svg";
import ocado from "assets/images//retailers/ocado.svg";
import amazon_fresh from "assets/images//retailers/amazon_fresh.svg";
import coop from "assets/images//retailers/coop.svg";
import bm from "assets/images//retailers/b&m.svg";
import home_bargains from "assets/images//retailers/home_bargains.svg";

export const getRetailerImg = (retailer) => {
  const images = {
    amazon,
    asda,
    morrisons,
    sainsburys,
    tesco,
    waitrose,
    iceland,
    ocado,
    "amazon fresh": amazon_fresh,
    amazon_fresh,
    coop,
    "b&m": bm,
    "home_bargains": home_bargains,
  };

  return images[retailer];
};
