import axios from "axios";

const setupAxiosInterceptors = () => {
  axios.defaults.baseURL = "http://localhost:5000/api/";

  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
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
      const originalRequest = error.config;

      if (
        error.response.status === 401 &&
        !originalRequest._retry &&
        localStorage.getItem("token")
      ) {
        originalRequest._retry = true;
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export default setupAxiosInterceptors;
