const path = process.env.REACT_APP_URL;

//subscriptions
export const GET_SUBSCRIPTIONS = "GET_SUBSCRIPTIONS";
export const getSubscriptions = (params) => {
  return {
    type: GET_SUBSCRIPTIONS,
    request: {
      method: "GET",
      url: `${path}/admin/subscription/taxonomy`,
      params,
    },
    meta: {
      asPromise: true,
    },
  };
};

export const UPDATE_SUBSCRIPTION = "UPDATE_SUBSCRIPTION";
export const updateSubscription = (id, data) => {
  return {
    type: UPDATE_SUBSCRIPTION,
    request: {
      method: "PUT",
      url: `${path}/admin/subscription/taxonomy/${id}`,
      data,
    },
  };
};

export const DELETE_SUBSCRIPTION = "DELETE_SUBSCRIPTION";
export const deleteSubscription = (id) => {
  return {
    type: DELETE_SUBSCRIPTION,
    request: {
      method: "DELETE",
      url: `${path}/admin/subscription/taxonomy/${id}`,
    },
    meta: {
      id,
    },
  };
};

export const CREATE_SUBSCRIPTION = "CREATE_SUBSCRIPTION";
export const createSubscription = (data) => {
  return {
    type: CREATE_SUBSCRIPTION,
    request: {
      method: "POST",
      url: `${path}/admin/subscription/taxonomy`,
      data,
    },
  };
};

export const SUBSCRIPTION_SUBSCRIBE = "SUBSCRIPTION_SUBSCRIBE";
export const subscriptionSubscribe = (data) => {
  return {
    type: SUBSCRIPTION_SUBSCRIBE,
    request: {
      method: "POST",
      url: `${path}/admin/subscription/taxonomy/subscribe`,
      data,
    },
  };
};

export const SUBSCRIPTION_UNSUBSCRIBE = "SUBSCRIPTION_UNSUBSCRIBE";
export const subscriptionUnsubscribe = (data) => {
  return {
    type: SUBSCRIPTION_UNSUBSCRIBE,
    request: {
      method: "POST",
      url: `${path}/admin/subscription/taxonomy/unsubscribe`,
      data,
    },
  };
};
