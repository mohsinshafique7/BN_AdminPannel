const path = process.env.REACT_APP_URL;

//manufacturers
export const GET_MANUFACTURERS = "GET_MANUFACTURERS";
export const getManufacturers = () => {
  return {
    type: GET_MANUFACTURERS,
    request: {
      method: "GET",
      url: `${path}/admin/manufacturers`,
    },
  };
};

export const GET_MANUFACTURER = "GET_MANUFACTURER";
export const getManufacturer = (id) => {
  return {
    type: GET_MANUFACTURER,
    request: {
      method: "GET",
      url: `${path}/admin/manufacturers/${id}`,
    },
  };
};

export const CREATE_MANUFACTURER = "CREATE_MANUFACTURER";
export const createManufacturer = (data) => {
  return {
    type: CREATE_MANUFACTURER,
    request: {
      method: "POST",
      url: `${path}/admin/manufacturers`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const EDIT_MANUFACTURER = "EDIT_MANUFACTURER";
export const editManufacturer = (data, id) => {
  return {
    type: EDIT_MANUFACTURER,
    request: {
      method: "PUT",
      url: `${path}/admin/manufacturers/${id}`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const DELETE_MANUFACTURER = "DELETE_MANUFACTURER";
export const deleteManufacturer = (id) => {
  return {
    type: DELETE_MANUFACTURER,
    request: {
      method: "DELETE",
      url: `${path}/admin/manufacturers/${id}`,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};

//brands
export const GET_BRANDS = "GET_BRANDS";
export const getBrands = () => {
  return {
    type: GET_BRANDS,
    request: {
      method: "GET",
      url: `${path}/admin/brands`,
    },
  };
};

export const GET_FREE_BRANDS = "GET_FREE_BRANDS";
export const getFreeBrands = () => {
  return {
    type: GET_BRANDS,
    request: {
      method: "GET",
      url: `${path}/admin/brands`,
      params: { free: true },
    },
  };
};

export const GET_BRAND = "GET_BRAND";
export const getBrand = (id) => {
  return {
    type: GET_BRAND,
    request: {
      method: "GET",
      url: `${path}/admin/brands/${id}`,
    },
  };
};

export const CREATE_BRAND_MANUFACTURERS = "CREATE_BRAND_MANUFACTURERS";
export const createBrandManufacturers = (data) => {
  return {
    type: CREATE_BRAND_MANUFACTURERS,
    request: {
      method: "POST",
      url: `${path}/admin/brands`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const CREATE_BRAND_BRANDS = "CREATE_BRAND_BRANDS";
export const createBrandBrands = (data) => {
  return {
    type: CREATE_BRAND_BRANDS,
    request: {
      method: "POST",
      url: `${path}/admin/brands`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const EDIT_BRAND = "EDIT_BRAND";
export const editBrand = (data, id) => {
  return {
    type: EDIT_BRAND,
    request: {
      method: "PUT",
      url: `${path}/admin/brands/${id}`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const MANUFACTURER_DELETE_BRAND = "MANUFACTURER_DELETE_BRAND";
export const manufacturerDeleteBrand = (id) => {
  return {
    type: MANUFACTURER_DELETE_BRAND,
    request: {
      method: "DELETE",
      url: `${path}/admin/brands/${id}`,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};

export const DELETE_BRAND = "DELETE_BRAND";
export const deleteBrand = (id) => {
  return {
    type: DELETE_BRAND,
    request: {
      method: "DELETE",
      url: `${path}/admin/brands/${id}`,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};
