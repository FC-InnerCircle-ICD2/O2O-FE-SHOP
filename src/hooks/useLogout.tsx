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
