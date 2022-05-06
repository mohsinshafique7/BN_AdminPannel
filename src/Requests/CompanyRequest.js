import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { QueryList } from "./QueryList";
import { openNotification } from "../utils/helpers";
import { useDispatch } from "react-redux";
import { showErrorPopup } from "../store/error-handler/actions";
const path = process.env.REACT_APP_URL;

const list = QueryList();
export const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  return useQuery(
    list.getAllCompanies,
    () => {
      return axios.get(`${path}/companies`).then((res) => {
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
export const useGetSingleCompany = (id) => {
  const dispatch = useDispatch();
  return useQuery(
    [list.getsingleCompany, id],
    () => {
      return axios.get(`${path}/companies/${id}`).then((res) => {
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
export const useGetCompanyCategories = (id) => {
  const dispatch = useDispatch();
  return useQuery(
    [list.getSingleCompanyCategories, id],
    () => {
      return axios.get(`${path}/admin/subscription/category?subscription=true&companyId=${id}`).then((res) => {
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
      onError: () => {
        openNotification("error", "Error", "Error Creating Company");
      },
    }
  );
};
export const useUpdateCompany = (type) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, data }) => {
      console.log(id, data);
      return axios.put(`${path}/companies/${id}`, data);
    },
    {
      onSuccess: () => {
        if (type === "list") {
          queryClient.invalidateQueries(list.getAllCompanies);
        } else if (type === "single") {
          queryClient.invalidateQueries(list.getsingleCompany);
        }
      },
      onError: () => {
        openNotification("error", "Error", "Error Updating Company");
      },
    }
  );
};
export const useDeleteCompany = (history) => {
  const queryClient = useQueryClient();
  return useMutation(
    (id) => {
      return axios.delete(`${path}/companies/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllCompanies);
        history.push("/companies/page=0&perPage=10");
      },
      onError: () => {
        openNotification("error", "Error", "Error Deleting Company");
      },
    }
  );
};

export const useUpdateCompanyManufacturers = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, data }) => {
      return axios.put(`${path}/companies/manufacturers/${id}`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllCompanies);

        queryClient.invalidateQueries(list.getsingleCompany);
      },
    }
  );
};
export const useUpdateCompanyRetailers = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, data }) => {
      return axios.put(`${path}/companies/retailers/${id}`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(list.getAllCompanies);

        queryClient.invalidateQueries(list.getsingleCompany);
      },
    }
  );
};
