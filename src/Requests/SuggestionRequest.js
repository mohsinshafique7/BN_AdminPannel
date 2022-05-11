import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { QueryList } from "./QueryList";
import { openNotification } from "../utils/helpers";
// import { useDispatch } from "react-redux";
// import { showErrorPopup } from "../store/error-handler/actions";
// showErrorPopup
const path = process.env.REACT_APP_URL;
const list = QueryList();

export const useManuallyReplaceCoreProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      return axios.post(`${path}/products/core_replace_manually`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getSingleCoreProduct);
      },
      onError: () => {
        openNotification("error", "Error", "Error Resolving Manually");
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
export const useUpdateManufacturer = (type) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, manufacturer }) => {
      return axios.put(`${path}/admin/manufacturers/${id}`, manufacturer);
    },
    {
      onSuccess: () => {
        if (type === "single") {
          queryClient.invalidateQueries(list.getSingleManufacturers);
        } else if (type === "list") {
          queryClient.invalidateQueries(list.getAllManufacturers);
        }
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
        history.push("/manufacturers/page=0&perPage=10");
      },
      onError: () => {
        openNotification("error", "Error", "Error Deleting Manufacturer");
      },
    }
  );
};
