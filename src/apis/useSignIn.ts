import { ApiResponse } from "@/types/api"
import apiClient from "."
import { useMutation } from "@tanstack/react-query"
import userStore from "@/store/user"
import { useToast } from "@/hooks/useToast"
import { AxiosError } from "axios"

type SignInResponse = {
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
      setUserInfo(data)
    },
    onError: () => {
      showNotification("error", "이메일 또는 비밀번호가 일치하지 않습니다.")
    },
  })
}
