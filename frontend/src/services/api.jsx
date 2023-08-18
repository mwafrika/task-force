import axios from "axios";

const setupAxiosInterceptors = () => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;

  axios.defaults.baseURL = "http://localhost:5000/api/";

  axios.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 401 || !localStorage.getItem("token")) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
