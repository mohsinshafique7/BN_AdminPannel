import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
const path = process.env.REACT_APP_URL;

const list = {
  getAllCoreProducts: "getAllCoreProducts",
};
export const useGetAllCoreProducts = (params) => {
  return useQuery([list.getAllCoreProducts, params], () => {
    return axios.get(`${path}/coreProducts`, { params }).then((res) => {
      return res.data;
    });
  });
};
export const useUpdateCoreProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, values }) => {
      return axios.put(`${path}/coreProducts/${id}`, values);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllCoreProducts);
      },
    }
  );
};
