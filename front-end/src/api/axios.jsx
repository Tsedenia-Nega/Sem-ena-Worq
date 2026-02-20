import axios from "axios";

export const BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: `${BASE_URL}/sem&worq`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const IMAGE_PATH = `${BASE_URL}/uploads`;

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${BASE_URL}/sem&worq/refresh-token`, 
          {},
          { withCredentials: true },
        );

        if (res.status === 200) {
          const newToken = res.data.token;
          localStorage.setItem("token", newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        
        localStorage.clear();
        window.location.href = "/management-portal-xyz/login";
        return Promise.reject(refreshError);
      }
    }

    
    if (error.response?.status === 403) {
      localStorage.clear();
      window.location.href = "/management-portal-xyz/login";
    }

    return Promise.reject(error);
  },
);

export default api;
