import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
const path = process.env.REACT_APP_URL;

const list = {
  getAllManufacturers: "getAllManufacturers",
};
export const useGetAllManufacturers = () => {
  return useQuery(list.getAllManufacturers, () => {
    return axios.get(`${path}/admin/manufacturers`).then((res) => {
      return res.data;
    });
  });
};
export const useCreateManufacturer = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      return axios.post(`${path}/admin/manufacturers`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllManufacturers);
      },
    }
  );
};
export const useUpdateManufacturer = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, manufacturer }) => {
      console.log(id);
      console.log(manufacturer);
      return axios.put(`${path}/admin/manufacturers/${id}`, manufacturer);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllManufacturers);
      },
    }
  );
};
