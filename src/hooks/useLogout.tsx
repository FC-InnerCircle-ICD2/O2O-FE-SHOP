import { useCallback } from "react"
import { toast } from "sonner"

import { modalStore } from "@/store/modal"
import userStore from "@/store/user"

const useLogout = () => {
  const { allHideModal } = modalStore()
  const { resetUserInfo } = userStore()

  const logout = useCallback(() => {
    allHideModal()
    resetUserInfo()
    toast.dismiss()
  }, [])
  return logout
}

export default useLogout
// TODO: 신규주문 알림 토스트 로그인한 경우일 때만 뜨도록 수정하기
