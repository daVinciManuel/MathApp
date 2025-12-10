import axios from "axios";
const API_URL = import.meta.env.VITE_URL_BACK;

const api = axios.create({
  baseURL: API_URL || "http://localhost:5000",
  // Do not enable credentials globally — enable per-call when cookies are required.
  headers: {
    // Default header for URL encoded requests can be overridden per-call
  },
});

export default api;
