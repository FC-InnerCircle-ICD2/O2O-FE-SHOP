import { useToast } from "@/hooks/useToast"
import userStore from "@/store/user"
import { ApiResponse } from "@/types/api"
import { useMutation } from "@tanstack/react-query"
import apiClient from "."

export type SignInResponse = {
  accessToken: string
  refreshToken: string
  accessTokenExpiresIn: string
  refreshTokenExpiresIn: string
}
export const useSignIn = () => {
  const { setUserInfo } = userStore()
  const { showNotification } = useToast()

  return useMutation({
    mutationKey: ["signIn"],
    mutationFn: async (data: { signname: string; password: string }) => {
      const { data: response } = await apiClient.post<ApiResponse<SignInResponse>>(
        `/auth/login`,
        data,
      )

      return response.data
    },
    onSuccess: (data) => {
      setUserInfo({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      })
    },
    onError: (error) => {
      console.log({ error })
      showNotification("error", "이메일 또는 비밀번호가 일치하지 않습니다.")
    },
  })
}
