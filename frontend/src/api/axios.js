// File to configure Axios.
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ecommerce-project-0asp.onrender.com',
    withCredentials: true
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
    // Do something before request is sent
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  }, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

export default instance;