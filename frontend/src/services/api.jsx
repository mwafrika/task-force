import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      axios.defaults.baseURL =
        process.env.BASE_URL || "http://localhost:7000/api/";
    } else {
      console.log("Token not found");
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
    if (error.response.status === 401 || !localStorage.getItem("token")) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
const apiService = async (method, url, data = {}) => {
  try {
    const response = await axios({
      method,
      url,
      data,
    });

    return response;
  } catch (error) {
    console.log("Error message:", error.response.data.message);
    throw error;
  }
};

export default apiService;
