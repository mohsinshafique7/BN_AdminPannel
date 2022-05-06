import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { showErrorPopup } from "../store/error-handler/actions";
const path = process.env.REACT_APP_URL;

const list = {
  getAllSourceCategories: "getAllSourceCategories",
  getSingleCustomGroups: "getSingleCustomGroups",
};
export const useGetAllSourceCategories = () => {
  const dispatch = useDispatch();
  return useQuery(
    list.getAllSourceCategories,
    () => {
      return axios.get(`${path}/admin/source-categories`).then((res) => {
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
