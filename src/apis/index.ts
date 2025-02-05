import axios from "axios"

export const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const userIdStorage = localStorage.getItem("userIdStorage")
    const token = userIdStorage ? JSON.parse(userIdStorage)?.state?.accessToken : null
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// TODO: 토큰 만료 시 재발급
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message)
    return Promise.reject(error)
  },
)

export default apiClient
