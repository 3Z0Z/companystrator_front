import axios from "axios";

const unauth_api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default unauth_api;