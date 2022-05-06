export const categoryEditInput = (categoriesData, defaultSwitch) => {
  return {
    inputData: [
      { label: "Name", name: "name", type: "text", required: true },
      { label: "Colour", name: "color", type: "text", required: true },
      { label: "Price per", name: "pricePer", type: "text", required: false },
      { label: "Measurement Unit", name: "measurementUnit", type: "text", required: false },
      { label: "ID", name: "id", type: "text", required: false, display: false },
    ],
    selectData: [
      {
        name: "categoryId",
        value: "id",
        option: "name",
        store: categoriesData,
        lable: "Parent Category",
        required: false,
        mode: false,
        categorySelect: true,
      },
    ],
    switchData: [{ label: "Subscription", name: "subscription", default: defaultSwitch, required: false }],
  };
};
export const categoryCreateInput = (categoriesData) => {
  return {
    inputData: [
      { label: "Name", name: "name", type: "text", required: true },
      { label: "Colour", name: "color", type: "text", required: true },
      { label: "Price per", name: "pricePer", type: "text", required: false },
      { label: "Measurement Unit", name: "measurementUnit", type: "text", required: false },
    ],
    selectData: [
      {
        name: "categoryId",
        value: "id",
        option: "name",
        store: categoriesData,
        lable: "Parent category",
        required: false,
        mode: false,
        categorySelect: true,
      },
    ],
    switchData: [{ label: "Subscription", name: "subscription", default: true, required: false }],
  };
};
