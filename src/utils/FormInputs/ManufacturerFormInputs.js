export const manufacturerEditInputs = () => {
  return {
    inputData: [
      { label: "Name", name: "name", type: "text", required: true },
      { label: "Colour", name: "color", type: "text", required: true },
      { label: "User Id", name: "id", type: "text", required: true, display: false },
    ],
  };
};
export const manufacturerCreateInputs = (brandsData) => {
  return {
    inputData: [
      { label: "Name", name: "name", type: "text", required: true },
      { label: "Colour", name: "color", type: "text", required: true },
    ],
    selectData: [
      {
        name: "brands",
        value: "id",
        option: "name",
        store: brandsData,
        lable: "Brands",
        required: false,
        mode: "multiple",
      },
    ],
  };
};
export const manufacturerEditNameInputs = () => {
  return [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Colour", name: "color", type: "text", required: true },
  ];
};
export const manufacturerBrandsInputs = () => {
  return [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Colour", name: "color", type: "text", required: true },
  ];
};
export const manufacturerAddExistingBrandSelect = (data) => {
  return [
    {
      name: "brands",
      value: "id",
      option: "name",
      store: data,
      lable: "Select brands",
      required: true,
      mode: "multiple",
    },
  ];
};
