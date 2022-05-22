import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { openNotification } from "../utils/helpers";
import { useDispatch } from "react-redux";
import { showErrorPopup } from "../store/error-handler/actions";

const path = process.env.REACT_APP_URL;

const list = {
  getAllCategories: "getAllCategories",
  getSingleCategory: "getSingleCategory",
};
export const useGetAllCategories = () => {
  const dispatch = useDispatch();
  return useQuery(
    list.getAllCategories,
    () => {
      return axios.get(`${path}/admin/subscription/category`).then((res) => {
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
export const useGetSingleCategories = (id) => {
  const dispatch = useDispatch();
  return useQuery(
    [list.getSingleCategory, id],
    () => {
      return axios.get(`${path}/admin/subscription/category/${id}`).then((res) => {
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
      onError: () => {
        openNotification("error", "Error", "Error Creating Category");
      },
    }
  );
};
export const useUpdateCategory = (type) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, data }) => {
      console.log(id, data);
      return axios.put(`${path}/admin/subscription/category/${id}`, data);
    },
    {
      onSuccess: () => {
        if (type === "categoryDes") {
          queryClient.invalidateQueries(list.getSingleCategory);
        } else if (type === "list") {
          queryClient.invalidateQueries(list.getAllCategories);
        }
      },
      onError: () => {
        openNotification("error", "Error", "Need to be Fixed");
      },
    }
  );
};
export const useDeleteCategory = (history) => {
  const queryClient = useQueryClient();

  return useMutation(
    (id) => {
      return axios.delete(`${path}/admin/subscription/category/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllCategories);
        history.push("/categories?page=0&perPage=10");
      },
      onError: () => {
        openNotification("error", "Error", "Error Deleteint Category");
      },
    }
  );
};
