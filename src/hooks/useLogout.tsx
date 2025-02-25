import { useCallback } from "react"
import { toast } from "sonner"

import { modalStore } from "@/store/modal"
import userStore from "@/store/user"
import { useOrderSSE } from "./useOrderSSE"

const useLogout = () => {
  const { allHideModal } = modalStore()
  const { resetUserInfo } = userStore()
  const { closeSSE } = useOrderSSE()

  const logout = useCallback(() => {
    closeSSE()
    allHideModal()
    resetUserInfo()
    toast.dismiss()
  }, [])
  return logout
}

export default useLogout
