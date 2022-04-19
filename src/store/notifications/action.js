const path = process.env.REACT_APP_URL;

//notifications
export const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";
export const getNotifications = () => {
  return {
    type: GET_NOTIFICATIONS,
    request: {
      method: "GET",
      url: `${path}/notifications`,
    },
  };
};

export const GET_NOTIFICATION = "GET_NOTIFICATION";
export const getNotification = (id) => {
  return {
    type: GET_NOTIFICATION,
    request: {
      method: "GET",
      url: `${path}/notifications/${id}`,
    },
  };
};

export const DELETE_NOTIFICATIONS = "DELETE_NOTIFICATIONS";
export const deleteNotifications = () => {
  return {
    type: DELETE_NOTIFICATIONS,
    request: {
      method: "DELETE",
      url: `${path}/notifications`,
    },
  };
};

export const DELETE__NOTIFICATION = "DELETE__NOTIFICATION";
export const deleteNotification = (id) => {
  return {
    type: DELETE__NOTIFICATION,
    request: {
      method: "DELETE",
      url: `${path}/notifications/${id}`,
    },
    meta: {
      asPromise: true,
      id,
    },
  };
};

export const VIEWED_NOTIFICATION = "VIEWED_NOTIFICATION";
export const viewedNotification = (id) => {
  return {
    type: VIEWED_NOTIFICATION,
    request: {
      method: "PUT",
      url: `${path}/notifications/${id}`,
    },
  };
};
