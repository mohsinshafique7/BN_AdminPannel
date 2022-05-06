import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { CoreProductDescStyles } from "./style";
import { Switch, Modal, Checkbox, Input, Button } from "antd";
import Loader from "../Loader/Loader";
import CoreForm from "../ModalFrom/CoreForm";

// import { manuallyReplaceProductCore } from "../../store/suggestions/action";
import { useGetSingleCoreProduct, useMergeCoreProduct } from "../../Requests/CoreProductRequest";
import { useGetAllBrands } from "../../Requests/BrandRequest";
import { useGetAllCategories } from "../../Requests/CategoryRequest";
import { useGetAllCustomGroups } from "../../Requests/CustomGroupRequest";
const CoreProductDesc = (props) => {
  const {
    history,
    match: { params },
  } = props;

  const [visible, setVisible] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [valueEan, setValueEan] = useState("");
  const [coreImage, setCoreImage] = useState("");
  const { isLoading: coreProductIsLoading, data: coreProductData } = useGetSingleCoreProduct(params.id);
  const { data: brandsData } = useGetAllBrands();
  const { data: categoriesData } = useGetAllCategories();
  const { data: customGroupsData } = useGetAllCustomGroups();
  const { mutate: mergeProduct } = useMergeCoreProduct();
  const inputData = [
    { label: "Title", name: "title", type: "text", required: false },
    { label: "Size", name: "size", type: "number", required: false },
  ];

  const mergeInputData = [
    { label: "Base EAN", name: "baseEan", type: "text", required: true },
    { label: "Target EAN", name: "targetEan", type: "text", required: true },
  ];
  const mergeInitialValue = {
    baseEan: coreProductData?.core?.ean,
  };

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
      store: brandsData?.brands,
      lable: "Change brand",
      required: false,
      mode: false,
    },
    {
      name: "categoryId",
      value: "id",
      option: "name",
      store: categoriesData?.categories,

      lable: "Change category",
      required: false,
      mode: false,
    },
    {
      name: "productGroupId",
      value: "id",
      option: "name",
      store: customGroupsData?.productGroups,
      lable: "Change product group",
      required: false,
      mode: false,
    },
  ];

  const switchData = [
    { label: "Bundled", name: "bundled", default: coreProductData?.core?.bundled, required: false },
    { label: "SecondaryImages", name: "secondaryImages", default: coreProductData?.core?.secondaryImages, required: false },
    { label: "Reviewed", name: "reviewed", default: coreProductData?.core?.reviewed, required: false },
    { label: "Product Options", name: "productOptions", default: coreProductData?.core?.productOptions, required: false },
  ];

  const initialValue = {
    title: coreProductData?.core?.title,
    image: coreProductData?.core?.image,
    secondaryImages: coreProductData?.core?.secondaryImages,
    description: coreProductData?.core?.description,
    features: coreProductData?.core?.features,
    ingredients: coreProductData?.core?.ingredients,
    bundled: coreProductData?.core?.bundled,
    brandId: coreProductData?.core?.brandId,
    categoryId: coreProductData?.core?.categoryId,
    productGroupId: coreProductData?.core?.productGroupId,
    size: coreProductData?.core?.size,
  };

  // useEffect(() => {
  //   getCoreProduct(params.id);
  // }, [getCoreProduct, params.id]);

  useEffect(() => {
    if (checkbox) {
      setValueEan(coreProductData?.core?.ean);
    } else {
      setValueEan("");
    }
  }, [checkbox, coreProductData]);

  const handleType = (e) => setValueEan(e.target.value);

  const handleManually = () => {
    // if (valueEan.length) {
    //   manuallyReplaceProductCore({ id, suggestedEan: valueEan })
    //     .then(() => history.goBack())
    //     .catch(() => openNotification());
    // }
    console.log("Handle Manually");
  };

  const onSendForm = (values) => {
    console.log(coreImage);
    // const data = values;
    // if (coreImage.length) {
    //   Object.assign(data, { image: coreImage });
    // }
    // editCoreProduct("EDIT_CORE_PRODUCT", id, data);
    console.log("Edit Core Product");
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
  const handleMergeProducts = (values) => {
    const { baseEan, targetEan } = values;
    mergeProduct({
      baseId: Number(baseEan),
      secondaryIds: targetEan.toString(),
    });
  };
  return (
    <CoreProductDescStyles>
      <Button type="primary" onClick={() => history.goBack()}>
        Go Back
      </Button>
      <div className="item-title">Core Product Details</div>
      <div className="item-wrapper">
        <div>
          {!coreProductIsLoading && Object.entries(coreProductData?.core).length !== 0 ? (
            <>
              {coreProductData?.core?.image ? (
                <img className="core-image" src={`${coreProductData?.core?.image}?${+new Date().getTime()}`} alt="img" />
              ) : null}
              <div className="item-info">{coreProductData?.core?.title}</div>
              <div className="item-info">
                EAN: <span>{coreProductData?.core?.ean}</span>
              </div>
              {coreProductData?.core?.description && (
                <div className="item-info">
                  Description: <span>{coreProductData?.core?.description}</span>
                </div>
              )}
              {coreProductData?.core?.features && (
                <div className="item-info">
                  Features: <span>{coreProductData?.core?.features}</span>
                </div>
              )}
              {coreProductData?.core?.ingredients && (
                <div className="item-info">
                  Ingredients: <span>{coreProductData?.core?.ingredients}</span>
                </div>
              )}
              <div className="item-info">
                Bundled: <Switch disabled checked={coreProductData?.core?.bundled} />
              </div>
              <div className="item-info">
                Secondary Images: <Switch disabled checked={coreProductData?.core?.secondaryImages} />
              </div>
              <div className="item-info">
                Ean Issues: <Switch disabled checked={coreProductData?.core?.eanIssues} />
              </div>
              <div className="item-info">
                Reviewed: <Switch disabled checked={coreProductData?.core?.reviewed} />
              </div>
              <div className="item-info">
                Disabled: <Switch disabled checked={coreProductData?.core?.disabled} />
              </div>
              <div className="item-info">
                Product Options: <Switch disabled checked={coreProductData?.core?.productOptions} />
              </div>
              {coreProductData?.core?.category && (
                <div className="item-info">
                  Category:{" "}
                  <span>
                    {coreProductData?.core?.category.parent &&
                      parentCategory(coreProductData?.core?.category.parent).map((perent) => `${perent} / `)}
                    {coreProductData?.core?.category.name}
                  </span>
                </div>
              )}
              {coreProductData?.core?.productBrand && (
                <div className="item-info">
                  Brand: <span>{coreProductData?.core?.productBrand.name}</span>
                </div>
              )}
              {coreProductData?.core?.productGroup && (
                <div className="item-info">
                  Product Groups: <span>{coreProductData?.core?.productGroup.name}</span>
                </div>
              )}
              <div className="item-info">
                Barcodes:{" "}
                <span>
                  {coreProductData?.core?.barcodes.length ? coreProductData?.core?.barcodes.map((item) => ` ${item.barcode}, `) : "-"}
                </span>
              </div>
              <div className="item-info">
                Size: <span>{coreProductData?.core?.size.length ? `${coreProductData?.core?.size}` : "-"}</span>
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
          <br />
          <CoreForm
            title={"Merge"}
            className={"core-product"}
            initialValue={mergeInitialValue}
            inputData={mergeInputData}
            onSendForm={handleMergeProducts}
          />
        </div>
      </div>
    </CoreProductDescStyles>
  );
};

export default withRouter(CoreProductDesc);
