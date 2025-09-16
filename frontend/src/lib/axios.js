import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://portfolio-backend-p6be.onrender.com/api', // backend URL
  withCredentials: true,
});
