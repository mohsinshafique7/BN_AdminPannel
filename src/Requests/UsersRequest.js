import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
const path = process.env.REACT_APP_URL;

const list = {
  getAllUsers: "getAllUsers",
};
export const useGetAllUsers = () => {
  return useQuery(list.getAllUsers, () => {
    return axios.get(`${path}/users`).then((res) => {
      return res.data;
    });
  });
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
    }
  );
};
export const useUpdateUsers = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, values }) => {
      return axios.put(`${path}/users/${id}`, values);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllUsers);
      },
    }
  );
};
