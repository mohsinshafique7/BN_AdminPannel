import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
const path = process.env.REACT_APP_URL;

const list = {
  getAllCompanies: "getAllCompanies",
};
export const useGetAllCompanies = () => {
  return useQuery(list.getAllCompanies, () => {
    return axios.get(`${path}/companies`).then((res) => {
      return res.data;
    });
  });
};
export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      return axios.post(`${path}/companies`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllCompanies);
      },
    }
  );
};
export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, data }) => {
      console.log(id, data);
      return axios.put(`${path}/companies/${id}`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllCompanies);
      },
    }
  );
};
