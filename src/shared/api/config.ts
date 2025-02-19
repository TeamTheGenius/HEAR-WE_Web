import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/`;

export const publicClient = axios.create({
  baseURL: API_BASE_URL,
});

export const privateClient = axios.create({
  baseURL: API_BASE_URL,
});
