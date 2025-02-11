import { ApiResponse } from "@/types/api"
import axios, { AxiosError } from "axios"
import userStore from "../store/user"
import { SignInResponse } from "./useSignIn"

type ApiResult<T> = {
  success: boolean
  message: string
  data: T
}

let refreshFlag = false
let refreshPromise: Promise<any> | null = null
const requestQueue: (() => Promise<any>)[] = []

export const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`

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
  async (error: AxiosError) => {
    // token 만료 error를 일으킨 원래 요청
    const originalRequest = error.config
    if (!originalRequest) {
      return Promise.reject(error)
    }

    // 토큰 만료 시 재발급
    if (error.response?.status === 511) {
      if (!refreshFlag) {
        const { accessToken, refreshToken, setUserInfo, resetUserInfo } = userStore.getState()
        refreshFlag = true

        try {
          if (!refreshPromise) {
            refreshPromise = apiClient
              .post<ApiResponse<SignInResponse>>("/auth/refresh", {
                accessToken: accessToken?.replace("Bearer ", ""),
                refreshToken: refreshToken?.replace("Bearer ", ""),
              })
              .then((res) => {
                setUserInfo(res.data.data)
              })
              .catch((err) => {
                resetUserInfo()
              })
              .finally(() => {
                refreshFlag = false
                refreshPromise = null
              })
          }

          await refreshPromise

          // 큐에 있는 모든 요청 재시도
          const requests = [...requestQueue]
          requestQueue.length = 0

          // 큐에 있는 모든 요청 실행
          const results = await Promise.all(requests.map((request) => request()))

          // 원래 실패했던 요청 재시도
          return await apiClient(originalRequest)
        } catch (refreshError) {
          // 토큰 재발급 실패 시 로그아웃 처리 등
          requestQueue.length = 0
          return Promise.reject(refreshError)
        }
      } else {
        // 재발급 진행 중일 때 들어온 요청들은 큐에 저장
        return new Promise((resolve) => {
          requestQueue.push(async () => {
            return resolve(await apiClient(originalRequest))
          })
        })
      }
    }

    return Promise.reject(error)
  },
)

export default apiClient
