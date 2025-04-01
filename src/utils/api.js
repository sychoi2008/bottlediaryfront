// src/utils/api.js
import axios from "axios";

console.log("API BaseURL", process.env.REACT_APP_API_BASE_URL);

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "/api",
});

export default api;
