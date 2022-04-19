import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCoreProduct, editCoreProduct } from "../../store/coreProducts/action";
import { withRouter } from "react-router-dom";
import { CoreProductDescStyles } from "./style";
import { Switch, Modal, Checkbox, Input, Button, notification } from "antd";
import Loader from "../Loader/Loader";
import { STATE_STATUSES } from "../../utils/app";
import CoreForm from "../ModalFrom/CoreForm";

import { manuallyReplaceProductCore } from "../../store/suggestions/action";

import { getProductGroups } from "../../store/productGroups/action";
import { getCategories } from "../../store/categories/action";
import { getBrands } from "../../store/manufacturersBrands/action";

const CoreProductDesc = (props) => {
  const {
    getCoreProduct,
    editCoreProduct,
    coreProduct,
    coreProduct: {
      id,
      title,
      image,
      ean,
      description,
      features,
      ingredients,
      reviewed,
      bundled,
      secondaryImages,
      eanIssues,
      disabled,
      category,
      productBrand,
      productGroup,
      brandId,
      categoryId,
      productGroupId,
      barcodes,
      size,
      productOptions,
    },
    getProductGroups,
    getCategories,
    getBrands,
    manuallyReplaceProductCore,
    status,
    history,
    match: { params },
  } = props;

  const [visible, setVisible] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [valueEan, setValueEan] = useState("");
  const [coreImage, setCoreImage] = useState("");

  console.log("size", size);

  const inputData = [
    { label: "Title", name: "title", type: "text", required: false },
    { label: "Size", name: "size", type: "number", required: false },
  ];

  const areaData = [
    { label: "Description", name: "description", required: false },
    { label: "Ingredients", name: "ingredients", required: false },
    { label: "Features", name: "features", required: false },
  ];

  const selectData = [
    {
      name: "brandId",
      value: "id",
      option: "name",
      action: getBrands,
      store: "brands",
      lable: "Change brand",
      required: false,
      mode: false,
    },
    {
      name: "categoryId",
      value: "id",
      option: "name",
      action: getCategories,
      store: "categories",
      lable: "Change category",
      required: false,
      mode: false,
    },
    {
      name: "productGroupId",
      value: "id",
      option: "name",
      action: getProductGroups,
      store: "productGroups",
      lable: "Change product group",
      required: false,
      mode: false,
    },
  ];

  const switchData = [
    { label: "Bundled", name: "bundled", default: bundled, required: false },
    { label: "SecondaryImages", name: "secondaryImages", default: secondaryImages, required: false },
    { label: "Reviewed", name: "reviewed", default: reviewed, required: false },
    { label: "Product Options", name: "productOptions", default: productOptions, required: false },
  ];

  const initialValue = {
    title,
    image,
    secondaryImages,
    description,
    features,
    ingredients,
    bundled,
    brandId,
    categoryId,
    productGroupId,
    size,
  };

  useEffect(() => {
    getCoreProduct(params.id);
  }, [getCoreProduct, params.id]);

  useEffect(() => {
    if (checkbox) {
      setValueEan(ean);
    } else {
      setValueEan("");
    }
  }, [checkbox, ean]);

  const handleType = (e) => setValueEan(e.target.value);

  const openNotification = () => {
    notification["error"]({
      message: "Error",
      description: "Incorrect EAN",
    });
  };

  const handleManually = () => {
    if (valueEan.length) {
      manuallyReplaceProductCore({ id, suggestedEan: valueEan })
        .then(() => history.goBack())
        .catch(() => openNotification());
    }
  };

  const onSendForm = (values) => {
    const data = values;
    if (coreImage.length) {
      Object.assign(data, { image: coreImage });
    }
    editCoreProduct("EDIT_CORE_PRODUCT", id, data);
  };

  const parentCategory = (parent) => {
    const parents = [];

    for (const property in parent) {
      if (property === "name") {
        parents.push(parent[property]);
        if (parent["parent"]) {
          for (const subProperty in parent["parent"]) {
            if (subProperty === "name") {
              parents.push(parent["parent"][subProperty]);
            }
          }
        }
      }
    }

    return parents.reverse();
  };

  return (
    <CoreProductDescStyles>
      <Button type="primary" onClick={() => history.goBack()}>
        Go Back
      </Button>
      <div className="item-title">Core Product Details</div>
      <div className="item-wrapper">
        <div>
          {Object.entries(coreProduct).length !== 0 && status === STATE_STATUSES.READY ? (
            <>
              {image ? <img className="core-image" src={`${image}?${+new Date().getTime()}`} alt="img" /> : null}
              <div className="item-info">{title}</div>
              <div className="item-info">
                EAN: <span>{ean}</span>
              </div>
              {description && (
                <div className="item-info">
                  Description: <span>{description}</span>
                </div>
              )}
              {features && (
                <div className="item-info">
                  Features: <span>{features}</span>
                </div>
              )}
              {ingredients && (
                <div className="item-info">
                  Ingredients: <span>{ingredients}</span>
                </div>
              )}
              <div className="item-info">
                Bundled: <Switch disabled checked={bundled} />
              </div>
              <div className="item-info">
                Secondary Images: <Switch disabled checked={secondaryImages} />
              </div>
              <div className="item-info">
                Ean Issues: <Switch disabled checked={eanIssues} />
              </div>
              <div className="item-info">
                Reviewed: <Switch disabled checked={reviewed} />
              </div>
              <div className="item-info">
                Disabled: <Switch disabled checked={disabled} />
              </div>
              <div className="item-info">
                Product Options: <Switch disabled checked={productOptions} />
              </div>
              {category && (
                <div className="item-info">
                  Category:{" "}
                  <span>
                    {category.parent && parentCategory(category.parent).map((perent) => `${perent} / `)}
                    {category.name}
                  </span>
                </div>
              )}
              {productBrand && (
                <div className="item-info">
                  Brand: <span>{productBrand.name}</span>
                </div>
              )}
              {productGroup && (
                <div className="item-info">
                  Product Groups: <span>{productGroup.name}</span>
                </div>
              )}
              <div className="item-info">
                Barcodes: <span>{barcodes.length ? barcodes.map((item) => ` ${item.barcode}, `) : "-"}</span>
              </div>
              <div className="item-info">
                Size: <span>{size.length ? `${size}` : "-"}</span>
              </div>
            </>
          ) : (
            <Loader />
          )}
        </div>

        <div>
          <CoreForm
            title={"Edit Core Product"}
            className={"core-product"}
            initialValue={initialValue}
            selectData={selectData}
            inputData={inputData}
            areaData={areaData}
            switchData={switchData}
            uploadData={true}
            handleSetImage={setCoreImage}
            onSendForm={onSendForm}
          />
          <div className="resolve-box">
            <Button type="primary" danger onClick={() => setVisible(true)}>
              Resolve Manually
            </Button>
            <Modal
              className="modal-suggestions"
              title={props.title}
              visible={visible}
              onOk={handleManually}
              onCancel={() => setVisible(false)}
              okText="Resolve"
            >
              <Input className="input-product" onChange={handleType} value={valueEan} placeholder="product ean" />
              <Checkbox onChange={() => setCheckbox(!checkbox)}>Set own product</Checkbox>
            </Modal>
          </div>
          <Button
            className="resolve-box"
            type="primary"
            onClick={() =>
              history.push(
                `/merge-product/direction=ASC&noBrand=false&notReviewed=false&noCategory=false&issues=false&order=title&page=1&perPage=10&productId=${params.id}`
              )
            }
          >
            Merge
          </Button>
        </div>
      </div>
    </CoreProductDescStyles>
  );
};

export default connect(
  (state) => ({
    coreProduct: state.coreProducts.coreProduct,
    status: state.coreProducts.status,
  }),
  { getCoreProduct, editCoreProduct, getProductGroups, getCategories, getBrands, manuallyReplaceProductCore }
)(withRouter(CoreProductDesc));
