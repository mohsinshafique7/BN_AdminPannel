import CoreForm from "components/ModalFrom/CoreForm";
import React from "react";

export default function Testscroll({ record, formInputs, setCoreImage, handleCoreProductEdit }) {
  return (
    <>
      <CoreForm
        title={"Edit"}
        // className={"core-product"}
        initialValue={{
          id: record.key,
          title: record.name,
          image: record.image,
          ean: record.ean,
          secondaryImages: record.secondaryImages,
          description: record.description,
          features: record.features,
          ingredients: record.ingredients,
          bundled: record.bundled,
          brandId: record.brandId,
          categoryId: record.categoryId,
          size: record.size,
          productOptions: record.productOptions,
          reviewed: record.reviewed,
        }}
        selectData={formInputs.selectData}
        inputData={formInputs.inputData}
        areaData={formInputs.areaData}
        switchData={formInputs.switchData}
        uploadData={true}
        handleSetImage={setCoreImage}
        onSendForm={handleCoreProductEdit}
      />
    </>
  );
}
