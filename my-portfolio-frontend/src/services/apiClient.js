import axios from "axios";

/**
 * Centralized API Client powered by Axios
 * Provides base URL configuration, default timeouts, standardized headers,
 * request/response interceptors, and error normalization.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
const DEFAULT_TIMEOUT_MS = 60000;

export class ApiError extends Error {
  constructor(message, status = 0, data = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
    this.isNetworkError = status === 0;
  }
}

// Create configured Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: DEFAULT_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Response interceptor to extract clean data or format unified ApiError
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
      const timeoutMs = error.config?.timeout || DEFAULT_TIMEOUT_MS;
      return Promise.reject(
        new ApiError(`Request timed out after ${timeoutMs}ms`, 0, { timeout: true })
      );
    }

    if (error.response) {
      const { status, data } = error.response;
      const message =
        data?.message ||
        (Array.isArray(data?.errors) ? data.errors[0] : null) ||
        `Request failed with status code ${status}`;
      return Promise.reject(new ApiError(message, status, data));
    }

    // Network / offline error
    return Promise.reject(
      new ApiError(
        error.message || "Unable to reach server. Please check your network connection.",
        0,
        { originalError: error }
      )
    );
  }
);

export const apiClient = {
  get: (endpoint, config = {}) => axiosInstance.get(endpoint, config),
  post: (endpoint, body, config = {}) => axiosInstance.post(endpoint, body, config),
  getBaseUrl: () => API_BASE_URL,
  axios: axiosInstance,
};

export default apiClient;
