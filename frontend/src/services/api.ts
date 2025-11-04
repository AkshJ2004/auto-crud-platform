import axios from 'axios'

export const API = axios.create({
  baseURL: 'http://localhost:4000/api', // Note the /api prefix
})

// Auto-add token if logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})