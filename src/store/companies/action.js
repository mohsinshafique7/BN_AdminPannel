const path = process.env.REACT_APP_URL;

//companies
export const GET_COMPANIES = "GET_COMPANIES";
export const getCompanies = () => {
  return {
    type: GET_COMPANIES,
    request: {
      method: "GET",
      url: `${path}/companies`,
    },
  };
};

export const GET_COMPANY = "GET_COMPANY";
export const getCompany = (id) => {
  return {
    type: GET_COMPANY,
    request: {
      method: "GET",
      url: `${path}/companies/${id}`,
    },
  };
};

export const GET_COMPANY_CATEGORIES = "GET_COMPANY_CATEGORIES";
export const getCompanyCategories = (id) => {
  return {
    type: GET_COMPANY_CATEGORIES,
    request: {
      method: "GET",
      url: `${path}/admin/subscription/category?subscription=true&companyId=${id}`,
    },
  };
};

export const SUBSCRIBE_COMPANY_TO_CATEGORY = "SUBSCRIBE_COMPANY_TO_CATEGORY";
export const subscribeCompanyToCategory = (data) => {
  return {
    type: SUBSCRIBE_COMPANY_TO_CATEGORY,
    request: {
      method: "POST",
      url: `${path}/admin/subscription/category/subscribe`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const UNSUBSCRIBE_COMPANY_TO_CATEGORY = "UNSUBSCRIBE_COMPANY_TO_CATEGORY";
export const unsubscribeCompanyToCategory = (data) => {
  return {
    type: UNSUBSCRIBE_COMPANY_TO_CATEGORY,
    request: {
      method: "POST",
      url: `${path}/admin/subscription/category/unsubscribe`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const CREATE_COMPANY = "CREATE_COMPANY";
export const createCompany = (data) => {
  return {
    type: CREATE_COMPANY,
    request: {
      method: "POST",
      url: `${path}/companies`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const EDIT_COMPANY = "EDIT_COMPANY";
export const editCompany = (data, id) => {
  return {
    type: EDIT_COMPANY,
    request: {
      method: "PUT",
      url: `${path}/companies/${id}`,
      data,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};

export const DELETE_COMPANY = "DELETE_COMPANY";
export const deleteCompany = (id) => {
  return {
    type: DELETE_COMPANY,
    request: {
      method: "DELETE",
      url: `${path}/companies/${id}`,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};

export const EDIT_COMPANY_MANUFACTURER = "EDIT_COMPANY_MANUFACTURER";
export const editCompanyManufacturer = (data, id) => {
  return {
    type: EDIT_COMPANY_MANUFACTURER,
    request: {
      method: "PUT",
      url: `${path}/companies/manufacturers/${id}`,
      data,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};

export const EDIT_COMPANY_RETAILER = "EDIT_COMPANY_RETAILER";
export const editCompanyReatailer = (data, id) => {
  return {
    type: EDIT_COMPANY_RETAILER,
    request: {
      method: "PUT",
      url: `${path}/companies/retailers/${id}`,
      data,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};

export const EDIT_COMPANY_SOURCE_CATEGORY = "EDIT_COMPANY_SOURCE_CATEGORY";
export const editCompanySourceCategory = (data, id) => {
  return {
    type: EDIT_COMPANY_SOURCE_CATEGORY,
    request: {
      method: "PUT",
      url: `${path}/admin/company-source-categories/${id}`,
      data,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};

export const GET_COMPANY_SECTION = "GET_COMPANY_SECTION";
export const getCompanySection = (companyId) => {
  return {
    type: GET_COMPANY_SECTION,
    request: {
      method: "GET",
      url: `${path}/admin/section`,
      params: { companyId },
    },
    meta: {
      asPromise: true,
    },
  };
};

export const SUBSCRIBE_COMPANY_SECTION = "SUBSCRIBE_COMPANY_SECTION";
export const subscribeCompanySection = (data) => {
  return {
    type: SUBSCRIBE_COMPANY_SECTION,
    request: {
      method: "POST",
      url: `${path}/admin/section/company/subscribe`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const UNSUBSCRIBE_COMPANY_SECTION = "UNSUBSCRIBE_COMPANY_SECTION";
export const unsubscribeCompanySection = (data) => {
  return {
    type: UNSUBSCRIBE_COMPANY_SECTION,
    request: {
      method: "POST",
      url: `${path}/admin/section/company/unsubscribe`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};
