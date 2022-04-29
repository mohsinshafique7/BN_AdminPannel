import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
const path = process.env.REACT_APP_URL;

const list = {
  getAllCustomGroups: "getAllCustomGroups",
};
export const useGetAllCustomGroups = () => {
  return useQuery(list.getAllCustomGroups, () => {
    return axios.get(`${path}/admin/product-groups`).then((res) => {
      return res.data;
    });
  });
};
export const useCreateCustomGroup = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      return axios.post(`${path}/admin/product-groups`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllCustomGroups);
      },
    }
  );
};
export const useUpdateCustomGroup = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, values }) => {
      return axios.put(`${path}/admin/product-groups/${id}`, values);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllCustomGroups);
      },
    }
  );
};
