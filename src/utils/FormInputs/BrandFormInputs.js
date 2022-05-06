export const brandsEditInputs = (manufacturerData, brandsData) => {
  return {
    inputData: [
      { label: "Name", name: "name", type: "text", required: true },
      { label: "Colour", name: "color", type: "text", required: true },
      { label: "User Id", name: "id", type: "text", required: true, display: false },
    ],
    selectData: [
      {
        name: "manufacturerId",
        value: "id",
        option: "name",
        store: manufacturerData,
        lable: "Change manufacturer",
        required: false,
        mode: false,
      },
      {
        name: "brandId",
        value: "id",
        option: "name",
        store: brandsData,
        lable: "Change brand",
        required: false,
        mode: false,
        brandSelect: true,
      },
    ],
  };
};
export const brandsCreateInputs = (manufacturerData, brandsData) => {
  return {
    inputData: [
      { label: "Name", name: "name", type: "text", required: true },
      { label: "Colour", name: "color", type: "text", required: true },
    ],
    selectData: [
      {
        name: "manufacturerId",
        value: "id",
        option: "name",
        store: manufacturerData,
        lable: "Change manufacturer",
        required: false,
        mode: false,
      },
      {
        name: "brandId",
        value: "id",
        option: "name",
        store: brandsData,
        lable: "Change brand",
        required: false,
        mode: false,
        brandSelect: true,
      },
    ],
  };
};
