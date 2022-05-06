import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { QueryList } from "./QueryList";
import { showErrorPopup } from "../store/error-handler/actions";
import { useDispatch } from "react-redux";
const path = process.env.REACT_APP_URL;

const list = QueryList();
export const useGetAllRetailers = () => {
  const dispatch = useDispatch();
  return useQuery(
    list.getAllRetailers,
    () => {
      return axios.get(`${path}/admin/retailers`).then((res) => {
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
export const useGetSingleRetailers = (id) => {
  const dispatch = useDispatch();
  return useQuery(
    [list.getSingleRetailer, id],
    () => {
      return axios.get(`${path}/admin/retailers/${id}`).then((res) => {
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
export const useUpdateRetailer = (type) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, color }) => {
      return axios.put(`${path}/admin/retailers/${id}`, { color });
    },
    {
      onSuccess: () => {
        if (type === "retailerDes") {
          queryClient.invalidateQueries(list.getSingleRetailer);
        } else if (type === "list") {
          queryClient.invalidateQueries(list.getAllRetailers);
        }
      },
    }
  );
};
export const useDeleteRetailer = () => {
  return useMutation((id) => {
    console.log(id);
    return axios.delete(`${path}/admin/retailers/${id}`);
  });
};
