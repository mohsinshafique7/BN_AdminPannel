import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { openNotification } from "../utils/helpers";
import { useDispatch } from "react-redux";
import { showErrorPopup } from "../store/error-handler/actions";
const path = process.env.REACT_APP_URL;

const list = {
  getAllCoreProducts: "getAllCoreProducts",
  getSingleCoreProduct: "getSingleCoreProduct",
};
export const useGetAllCoreProducts = (params) => {
  const dispatch = useDispatch();
  return useQuery(
    [list.getAllCoreProducts, params],
    () => {
      return axios.get(`${path}/coreProducts`, { params }).then((res) => {
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
export const useGetSingleCoreProduct = (id) => {
  const dispatch = useDispatch();
  return useQuery(
    [list.getSingleCoreProduct, id],
    () => {
      return axios.get(`${path}/coreProducts/${id}`).then((res) => {
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
export const useMergeCoreProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      console.log(data);
      return axios.post(`${path}/coreProducts/merge`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllCoreProducts);
      },
      onError: (error) => {
        openNotification("error", `${error.response.data.error}`, `${error.response.data.message}`);
      },
    }
  );
};
export const useUpdateCoreProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, values }) => {
      console.log(id, values);
      return axios.put(`${path}/coreProducts/${id}`, values);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllCoreProducts);
        queryClient.invalidateQueries(list.getSingleCoreProduct);
      },
    }
  );
};
