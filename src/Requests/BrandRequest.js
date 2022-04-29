import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
const path = process.env.REACT_APP_URL;

const list = {
  getAllBrands: "getAllBrands",
};
export const useGetAllBrands = () => {
  return useQuery(list.getAllBrands, () => {
    return axios.get(`${path}/admin/brands`).then((res) => {
      return res.data;
    });
  });
};
export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      return axios.post(`${path}/admin/brands`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllBrands);
      },
    }
  );
};
export const useUpdateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, values }) => {
      return axios.put(`${path}/admin/brands/${id}`, values);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllBrands);
      },
    }
  );
};
