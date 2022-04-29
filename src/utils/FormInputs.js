import _ from "lodash";
export const usersEditInputs = (companiesData) => {
  return {
    inputData: [
      { label: "First Name", name: "first_name", type: "text", required: true },
      { label: "Last Name", name: "last_name", type: "text", required: true },
      { label: "Email", name: "email", type: "email", required: true },
      { label: "User Id", name: "id", type: "text", required: true, display: false },
    ],
    selectData: [
      {
        name: "companyId",
        value: "id",
        option: "name",
        store: companiesData,
        lable: "Select company",
        required: true,
        mode: false,
      },
      {
        name: "status",
        value: "name",
        option: "name",
        store: [{ name: "active" }, { name: "inactive" }],
        lable: "Change status",
        required: true,
        mode: false,
      },
    ],
    switchData: [{ label: "Admin", name: "is_stuff", default: "active", required: false }],
  };
};
export const usersCreateInputs = (companiesData) => {
  return {
    inputData: [
      { label: "First Name", name: "first_name", type: "text", required: true },
      { label: "Last Name", name: "last_name", type: "text", required: true },
      { label: "Email", name: "email", type: "email", required: true },
    ],
    selectData: [
      {
        name: "companyId",
        value: "id",
        option: "name",
        store: companiesData,
        lable: "Select company",
        required: true,
        mode: false,
      },
      {
        name: "status",
        value: "name",
        option: "name",
        store: [{ name: "active" }, { name: "inactive" }],
        lable: "Change status",
        required: true,
        mode: false,
      },
    ],
    switchData: [{ label: "Admin", name: "is_stuff", default: "active", required: false }],
  };
};
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

export const retailerEditInput = () => {
  return {
    inputData: [
      { label: "Colour", name: "color", type: "text", required: true },
      { label: "Retailer ID", name: "id", type: "text", required: true, display: false },
    ],
  };
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

export const renderTableData = (page, perPage, dataSource) => {
  const limit = page * perPage + perPage < dataSource.length ? page * perPage + perPage : dataSource.length;
  return dataSource.slice(page * perPage, limit);
};
export const getFilter = (data, name) => {
  return _.uniq(_.map(data, name)).map((item) => {
    return { text: item, value: item };
  });
};
export const setColor = (color) => {
  return { backgroundColor: color, padding: "10px", border: "1px solid green" };
};
