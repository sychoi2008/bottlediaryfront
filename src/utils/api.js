// src/utils/api.js
import axios from "axios";

console.log("API BaseURL", process.env.REACT_APP_API_BASE_URL);

const api = axios.create({
  baseURL: "/api", // 프론트에선 /api 붙여서 요청 → 프록시로 전달됨
});

export default api;
