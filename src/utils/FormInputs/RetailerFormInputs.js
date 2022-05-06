export const retailerEditInput = () => {
  return [
    { label: "Colour", name: "color", type: "text", required: true },
    { label: "Retailer ID", name: "id", type: "text", required: true, display: false },
  ];
};
export const retailerCreateInput = () => {
  return {
    inputData: [
      { label: "Name", name: "name", type: "text", required: true },
      { label: "Colour", name: "color", type: "text", required: true },
    ],
  };
};
export const categoryEditInput = (categoriesData) => {
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
    switchData: [{ label: "Subscription", name: "subscription", default: true, required: false }],
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
export const CustomGroupEditInput = (usersData, companiesData) => {
  return {
    inputData: [
      { label: "Name", name: "name", type: "text", required: true },
      { label: "Id", name: "id", type: "text", required: true, display: false },
    ],

    selectData: [
      { name: "userId", value: "id", option: "email", store: usersData, lable: "User", required: false, mode: false },
      {
        name: "companyId",
        value: "id",
        option: "name",
        store: companiesData,
        lable: "Company",
        required: false,
        mode: false,
      },
    ],
  };
};
export const CompanyEditInput = () => {
  return {
    inputData: [
      { label: "Name", name: "name", type: "text", required: true },
      { label: "Id", name: "id", display: false, type: "text", required: true },
    ],
    selectDate: [{ label: "Start Date", name: "filtersStartDate" }],
  };
};
export const CompanyCreateInput = () => {
  return {
    inputData: [{ label: "Name", name: "name", type: "text", required: true }],
    selectDate: [{ label: "Start Date", name: "filtersStartDate" }],
  };
};
export const CoreProductEditInput = (brandsData, categoriesData) => {
  return {
    selectData: [
      {
        name: "brandId",
        value: "id",
        option: "name",
        store: brandsData,
        lable: "Change brand",
        required: false,
        mode: false,
      },
      {
        name: "categoryId",
        value: "id",
        option: "name",
        store: categoriesData,
        lable: "Change category",
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
      { label: "Description", name: "description", required: false },
      { label: "Ingredients", name: "ingredients", required: false },
      { label: "Features", name: "features", required: false },
    ],
    switchData: [
      { label: "Bundled", name: "bundled", default: true, required: false },
      { label: "SecondaryImages", name: "secondaryImages", default: true, required: false },
      { label: "Reviewed", name: "reviewed", default: true, required: false },
    ],
  };
};
