import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://161.97.154.119/intern-api/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

export default axiosInstance;
