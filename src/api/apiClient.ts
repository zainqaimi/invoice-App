// src/api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // JSON server ka base URL
});

export default api;
