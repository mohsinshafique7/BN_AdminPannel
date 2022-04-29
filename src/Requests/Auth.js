import axios from "axios";
import { useMutation } from "react-query";
const path = process.env.REACT_APP_URL;

export const useLogin = () => {
  return useMutation((val) => {
    return axios.post(`${path}/auth/login/admin`, val).then((res) => {
      return res.data;
    });
  });
};
//  res.data)})
