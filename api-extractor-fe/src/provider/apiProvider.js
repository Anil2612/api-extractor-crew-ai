import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Example auth token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle errors globally here
    if (error.response?.status === 401) {
      console.log("Unauthorized, redirect to login...");
      // redirect logic if needed
    }
    return Promise.reject(error);
  }
);

// Generic API functions
export const getData = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postData = async (url, payload) => {
  try {
    const response = await api.post(url, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putData = async (url, payload) => {
  try {
    const response = await api.put(url, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
