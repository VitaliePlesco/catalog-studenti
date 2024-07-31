import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_NEXTJS_ENV === "development" ? 'http://localhost:5000/api' : "https://catalog-studenti-uskl.onrender.com/api";

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});