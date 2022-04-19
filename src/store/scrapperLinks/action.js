const path = process.env.REACT_APP_URL;

//ScrapperLinks
export const GET_SCREPPER_LINKS = "GET_SCREPPER_LINKS";
export const getScrapperLinks = () => {
  return {
    type: GET_SCREPPER_LINKS,
    request: {
      method: "GET",
      url: `${path}/admin/scrapper-links`,
    },
  };
};

export const GET_SCREPPER_LINK = "GET_SCREPPER_LINK";
export const getScrapperLink = (id) => {
  return {
    type: GET_SCREPPER_LINK,
    request: {
      method: "GET",
      url: `${path}/admin/scrapper-links/${id}`,
    },
  };
};

export const CREATE_SCREPPER_LINK = "CREATE_SCREPPER_LINK";
export const createScrapperLink = (data) => {
  return {
    type: CREATE_SCREPPER_LINK,
    request: {
      method: "POST",
      url: `${path}/admin/scrapper-links`,
      data,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const EDIT_SCREPPER_LINK = "EDIT_SCREPPER_LINK";
export const editScrapperLink = (values, id) => {
  return {
    type: EDIT_SCREPPER_LINK,
    request: {
      method: "PUT",
      url: `${path}/admin/scrapper-links/${id}`,
      data: values,
    },
  };
};

export const DELETE_SCREPPER_LINK = "DELETE_SCREPPER_LINK";
export const deleteScrapperLink = (id) => {
  return {
    type: DELETE_SCREPPER_LINK,
    request: {
      method: "DELETE",
      url: `${path}/admin/scrapper-links/${id}`,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};
