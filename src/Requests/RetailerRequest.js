import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
const path = process.env.REACT_APP_URL;

const list = {
  getAllRetailers: "getAllRetailers",
};
export const useGetAllRetailers = () => {
  return useQuery(list.getAllRetailers, () => {
    return axios.get(`${path}/admin/retailers`).then((res) => {
      return res.data;
    });
  });
};
export const useCreateRetailer = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      return axios.post(`${path}/admin/retailers`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllRetailers);
      },
    }
  );
};
export const useUpdateRetailer = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, color }) => {
      return axios.put(`${path}/admin/retailers/${id}`, { color });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllRetailers);
      },
    }
  );
};
