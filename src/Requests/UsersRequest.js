import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { openNotification } from "../utils/helpers";
import { QueryList } from "./QueryList";
import { useDispatch } from "react-redux";
import { showErrorPopup } from "../store/error-handler/actions";
const list = QueryList();
const path = process.env.REACT_APP_URL;

export const useGetAllUsers = () => {
  const dispatch = useDispatch();
  return useQuery(
    list.getAllUsers,
    () => {
      return axios.get(`${path}/users`).then((res) => {
        return res.data;
      });
    },
    {
      onError: (error) => {
        dispatch(showErrorPopup(error.response.status));
      },
    }
  );
};
export const useGetSingleUser = (id) => {
  const dispatch = useDispatch();
  return useQuery(
    [list.getSingleUser, id],
    () => {
      return axios.get(`${path}/users/${id}`).then((res) => {
        return res.data;
      });
    },
    {
      onError: (error) => {
        dispatch(showErrorPopup(error.response.status));
      },
    }
  );
};
export const useCreateUsers = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      return axios.post(`${path}/users`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllUsers);
      },
      onError: (error) => {
        openNotification("error", error.response.data.error, error.response.data.message);
      },
    }
  );
};
export const useUpdateUsers = (type) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, values }) => {
      return axios.put(`${path}/users/${id}`, values);
    },
    {
      //   onMutate: async () => {
      //   await queryClient.cancelQueries(list.getAllUsers);
      //   const previousData = await queryClient.getQueryData(list.getAllUsers);
      //   const newData = previousData?.users.filter((user) => user.id !== Number(id));
      //   queryClient.setQueryData(list.getAllUsers, () => {
      //     return {
      //       users: newData,
      //     };
      //   });
      //   return {
      //     previousData,
      //   };
      // },
      onSuccess: () => {
        queryClient.invalidateQueries(list.getSingleUser);
        queryClient.invalidateQueries(list.getAllUsers);
      },
      onError: (error) => {
        openNotification("error", error.response.data.error, error.response.data.message);
      },
    }
  );
};
export const useDeleteUsers = (history, id) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return axios.delete(`${path}/users/${id}`);
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries(list.getAllUsers);
        const previousData = await queryClient.getQueryData(list.getAllUsers);
        const newData = previousData?.users.filter((user) => user.id !== Number(id));
        queryClient.setQueryData(list.getAllUsers, () => {
          return {
            users: newData,
          };
        });
        return {
          previousData,
        };
      },
      onError: (error, data, context) => {
        queryClient.setQueryData(list.getAllUsers, context.previousData);
        openNotification("error", "Error", "Error Deleting User");
      },
      onSettled: () => {
        history.push("/users?page=0&perPage=10");
        queryClient.invalidateQueries(list.getAllUsers);
      },
    }
  );
};
export const useResetUserPassword = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, values }) => {
      return axios.post(`${path}/users/${id}/password-reset`, values);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getSingleUser);
      },
      onError: () => {
        openNotification("error", "Error", "Error Reseting User's Password");
      },
    }
  );
};
export const useGetUserHistory = ({ id, params }) => {
  const dispatch = useDispatch();
  return useQuery(
    [list.getUserHistory, params, id],
    () => {
      return axios.get(`${path}/users/${id}/history`, { params }).then((res) => {
        return res.data;
      });
    },
    {
      onError: (error) => {
        dispatch(showErrorPopup(error.response.status));
      },
    }
  );
};
