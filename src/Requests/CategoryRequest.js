import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
const path = process.env.REACT_APP_URL;

const list = {
  getAllCategories: "getAllCategories",
};
export const useGetAllCategories = () => {
  return useQuery(list.getAllCategories, () => {
    return axios.get(`${path}/admin/subscription/category`).then((res) => {
      return res.data;
    });
  });
};
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      return axios.post(`${path}/admin/subscription/category`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllCategories);
      },
    }
  );
};
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, data }) => {
      return axios.put(`${path}/admin/subscription/category/${id}`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllCategories);
      },
    }
  );
};
