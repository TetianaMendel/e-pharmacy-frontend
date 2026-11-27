import axios from "axios";

export const api = axios.create({
  baseURL: "https://e-pharmacy-backend-lb09.onrender.com",
});