import { ApiResponse } from "@/types/api"
import apiClient from "."

type ApiResult<T> = {
  success: boolean
  message: string
  data: T
}

type SignInResponse = {
  accessToken: string
  refreshToken: string
  accessTokenExpiresIn: string
  refreshTokenExpiresIn: string
}
export const signIn = async (
  signname: string,
  password: string,
): Promise<ApiResult<SignInResponse | null>> => {
  try {
    const { data } = await apiClient.post<ApiResponse<SignInResponse>>(`/login`, {
      signname,
      password,
    })
    return {
      success: data.status === 200,
      ...data,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "알 수 없는 오류가 발생했습니다.",
    }
  }
}
