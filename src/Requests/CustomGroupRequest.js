import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { showErrorPopup } from "../store/error-handler/actions";
const path = process.env.REACT_APP_URL;

const list = {
  getAllCustomGroups: "getAllCustomGroups",
  getSingleCustomGroups: "getSingleCustomGroups",
};
export const useGetAllCustomGroups = () => {
  const dispatch = useDispatch();
  return useQuery(
    list.getAllCustomGroups,
    () => {
      return axios.get(`${path}/admin/product-groups`).then((res) => {
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
export const useCreateCustomGroup = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      console.log("Data", data);
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
export const useDeleteCustomGroup = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id) => {
      return axios.delete(`${path}/admin/product-groups/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllCustomGroups);
      },
    }
  );
};
export const useAddCoreProductsCustomGroup = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, values }) => {
      return axios.put(`${path}/admin/product-groups/${id}/addCores`, values);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllCustomGroups);
        queryClient.invalidateQueries(list.getSingleCustomGroups);
      },
    }
  );
};
export const useGetSingleCustomGroups = (id) => {
  const dispatch = useDispatch();
  return useQuery(
    [list.getSingleCustomGroups, id],
    () => {
      console.log("triggered");
      return axios.get(`${path}/admin/product-groups/${id}`).then((res) => {
        return res.data;
      });
    },
    {
      enabled: false,
      onError: (error) => {
        dispatch(showErrorPopup(error.response.status));
      },
    }
  );
};
