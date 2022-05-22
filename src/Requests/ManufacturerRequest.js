import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { QueryList } from "./QueryList";
import { openNotification } from "../utils/helpers";
import { useDispatch } from "react-redux";
import { showErrorPopup } from "../store/error-handler/actions";
// showErrorPopup
const path = process.env.REACT_APP_URL;
const list = QueryList();
export const useGetAllManufacturers = () => {
  const dispatch = useDispatch();
  return useQuery(
    list.getAllManufacturers,
    () => {
      return axios.get(`${path}/admin/manufacturers`).then((res) => {
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
export const useGetSingleManufacturer = (id) => {
  const dispatch = useDispatch();
  return useQuery([list.getSingleManufacturers, id], () => {
    return axios.get(`${path}/admin/manufacturers/${id}`).then(
      (res) => {
        return res.data;
      },
      {
        onError: (error) => {
          dispatch(showErrorPopup(error.response.status));
        },
      }
    );
  });
};
export const useCreateManufacturer = (type) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      return axios.post(`${path}/admin/manufacturers`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllManufacturers);
      },
      onError: () => {
        openNotification("error", "Error", "Error Creating Manufacturer");
      },
    }
  );
};
export const useCreateBrandManufacturer = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      return axios.post(`${path}/admin/brands`, data);
    },
    {
      onSuccess: () => {
        console.log("Success");
        queryClient.invalidateQueries(list.getAllBrands);
      },
      onError: () => {
        console.log("Error");
        openNotification("error", "Error", "Need to be fixed");
      },
    }
  );
};
export const useUpdateManufacturer = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, manufacturer }) => {
      return axios.put(`${path}/admin/manufacturers/${id}`, manufacturer);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getSingleManufacturers);

        queryClient.invalidateQueries(list.getAllManufacturers);
      },
      onError: () => {
        openNotification("error", "Error", "Error Updating Manufacturer");
      },
    }
  );
};
export const useDeleteManufacturer = (history) => {
  return useMutation(
    (id) => {
      return axios.delete(`${path}/admin/manufacturers/${id}`);
    },
    {
      onSuccess: () => {
        history.push("/manufacturers?page=0&perPage=10");
      },
      onError: () => {
        openNotification("error", "Error", "Error Deleting Manufacturer");
      },
    }
  );
};
