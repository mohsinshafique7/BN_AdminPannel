import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { QueryList } from "./QueryList";
import { openNotification } from "../utils/helpers";
import { useDispatch } from "react-redux";
import { showErrorPopup } from "../store/error-handler/actions";

const path = process.env.REACT_APP_URL;

const list = QueryList();
export const useGetAllBrands = () => {
  const dispatch = useDispatch();
  return useQuery(
    list.getAllBrands,
    () => {
      return axios.get(`${path}/admin/brands`).then((res) => {
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
export const useGetSingleBrand = (id) => {
  const dispatch = useDispatch();
  return useQuery(
    [list.getSingleBrand, id],
    () => {
      return axios.get(`${path}/admin/brands/${id}`).then((res) => {
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
      onError: () => {
        openNotification("error", "Error", "Error Creating Brand");
      },
    }
  );
};

export const useUpdateBrand = (type) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, values }) => {
      return axios.put(`${path}/admin/brands/${id}`, values);
    },
    {
      onSuccess: () => {
        if (type === "list") {
          queryClient.invalidateQueries(list.getAllBrands);
        } else if (type === "single") {
          queryClient.invalidateQueries(list.getSingleBrand);
        }
      },
      onError: () => {
        openNotification("error", "Error", "Error Updating Brand");
      },
    }
  );
};

export const useDeleteBrand = (type, history) => {
  console.log(type);
  const queryClient = useQueryClient();
  return useMutation(
    (id) => {
      return axios.delete(`${path}/admin/brands/${id}`);
    },
    {
      onSuccess: () => {
        if (type === "manufacturerDes") {
          queryClient.invalidateQueries(list.getSingleManufacturers);
        } else {
          queryClient.invalidateQueries(list.getAllBrands);
        }
        history.push("/brands/page=0&perPage=10");
      },
      onError: () => {
        openNotification("error", "Error", "Error Deleting Brand");
      },
    }
  );
};
