import { useOrderSSE } from "@/hooks/useOrderSSE"
import userStore from "@/store/user"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { ROUTES } from "./routes"

export const RequireGuest = () => {
  const navigate = useNavigate()
  const { userInfo } = userStore()

  useEffect(() => {
    if (userInfo?.accessToken) {
      navigate(ROUTES.DASHBOARD, { replace: true })
    }
  }, [userInfo?.accessToken, navigate])

  return <Outlet />
}
export const RequireAuth = () => {
  const { reconnectSSE } = useOrderSSE()
  const navigate = useNavigate()
  const { userInfo } = userStore()

  useEffect(() => {
    if (!userInfo || !userInfo?.accessToken) {
      navigate(ROUTES.LOGIN, { replace: true })
      return
    }

    reconnectSSE(userInfo)
  }, [userInfo, navigate])

  return <Outlet />
}
