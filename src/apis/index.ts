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
export let refreshPromise: Promise<ApiResponse<any>> | null = null
const requestQueue: (() => Promise<ApiResponse<any>>)[] = []

export const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

export const mockClient = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const { userInfo } = userStore.getState()

    const token = userInfo?.accessToken ? userInfo.accessToken : null
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
    const { userInfo, setUserInfo, resetUserInfo } = userStore.getState()

    if (error.config?.url === "/auth/refresh") {
      console.log("refresh error")
      resetUserInfo()
      return Promise.reject(error)
    }

    const originalRequest = error.config
    if (!originalRequest) {
      return Promise.reject(error)
    }

    if (error.response?.status === 511) {
      if (!refreshFlag) {
        refreshFlag = true

        try {
          if (!refreshPromise) {
            refreshPromise = (async () => {
              try {
                const res = await axios
                  .create({
                    baseURL: BASE_URL,
                    timeout: 10000,
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                  .post<ApiResponse<SignInResponse>>("/auth/refresh", {
                    accessToken: userInfo?.accessToken?.replace("Bearer ", ""),
                    refreshToken: userInfo?.refreshToken?.replace("Bearer ", ""),
                  })

                setUserInfo(res.data.data)
                return res.data
              } catch (err) {
                resetUserInfo()
                refreshFlag = false
                refreshPromise = null
                throw err
              } finally {
                refreshFlag = false
                refreshPromise = null
              }
            })()
          }

          const refreshResult = await refreshPromise.catch((err) => {
            throw err
          })

          // 큐에 있는 모든 요청 재시도
          const requests = [...requestQueue]
          requestQueue.length = 0

          // 큐에 있는 모든 요청 실행
          const results = await Promise.all(requests.map((request) => request()))
          return await apiClient(originalRequest)
        } catch (refreshError) {
          requestQueue.length = 0
          refreshFlag = false
          refreshPromise = null
          throw refreshError
        }
      } else {
        // 재발급 진행 중일 때 들어온 요청들은 큐에 저장
        return new Promise((resolve) => {
          requestQueue.push(async () => {
            const result = await apiClient(originalRequest)
            return result.data
          })
        })
      }
    }
    return Promise.reject(error)
  },
)

export default apiClient
