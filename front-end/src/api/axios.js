import axios from "axios";

// 1. Create the instance
const api = axios.create({
  baseURL: "http://localhost:5000/sem&worq",
  withCredentials: true, // Required for HttpOnly Cookies (Refresh Token)
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Request Interceptor: Attach Access Token to every outgoing request
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

// 3. Response Interceptor: Handle Token Expiration (401 errors)
api.interceptors.response.use(
  (response) => response, // If request is successful, just return the response
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 (Unauthorized) and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to get a new Access Token using the Refresh Token cookie
        const res = await axios.post(
          "http://localhost:5000/sem&worq/refresh-token",
          {},
          { withCredentials: true },
        );

        if (res.status === 200) {
          const newToken = res.data.token;
          localStorage.setItem("token", newToken);

          // Update the header and retry the original failed request
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, session is truly dead - log out user
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
