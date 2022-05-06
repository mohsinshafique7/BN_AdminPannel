import _ from "lodash";

export const CoreProductEditInput = (brandsData, categoriesData) => {
  return {
    selectData: [
      {
        name: "brandId",
        value: "id",
        option: "name",
        store: brandsData,
        lable: "Brand",
        required: false,
        mode: false,
      },
      {
        name: "categoryId",
        value: "id",
        option: "name",
        store: categoriesData,
        lable: "Category",
        required: false,
        mode: false,
      },
    ],
    inputData: [
      { label: "Title", name: "title", type: "text", required: false },
      { label: "Size", name: "size", type: "number", required: false },
      { label: "Id", name: "id", type: "number", required: false, display: false },
    ],
    areaData: [
      { label: "Description", name: "description", required: false, display: false },
      { label: "Ingredients", name: "ingredients", required: false, display: false },
      { label: "Features", name: "features", required: false, display: false },
    ],
    switchData: [
      { label: "Bundled", name: "bundled", default: true, required: false },
      { label: "SecondaryImages", name: "secondaryImages", default: true, required: false, display: false },
      { label: "Reviewed", name: "reviewed", default: true, required: false },
    ],
  };
};
