import { Layout } from "@/components/layout"
import { SidebarProvider } from "@/components/shadcn/sidebar"
import { RouteObject } from "react-router-dom"

import DashboardPage from "@/pages/dashboard/page"
import LoginPage from "@/pages/login/page"
import OrdersActivePage from "@/pages/orders/active/page"
import OrdersCompletedPage from "@/pages/orders/completed/page"
import ShopInfoPage from "@/pages/shop/info/page"
import ShopMenuPage from "@/pages/shop/menu/page"
import ShopReviewPage from "@/pages/shop/review/page"

export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/",
  ORDER: "/orders",
  COMPLETED_ORDER: "/orders/completed",
  ACTIVE_ORDER: "/orders/active",
  SHOP_INFO: "/shop/info",
  SHOP_REVIEW: "/shop/review",
  SHOP_MENU: "/shop/menu",
}

import { useNavigate, Outlet } from "react-router-dom"
import userStore from "@/store/user"
import { useEffect } from "react"
import { useOrderSSE } from "./hooks/useOrderSSE"

const RequireGuest = () => {
  const navigate = useNavigate()
  const { accessToken } = userStore()

  useEffect(() => {
    if (accessToken) {
      navigate(ROUTES.ACTIVE_ORDER, { replace: true })
    }
  }, [accessToken, navigate])

  return <Outlet />
}
const RequireAuth = () => {
  useOrderSSE()
  const navigate = useNavigate()
  const { accessToken } = userStore()

  useEffect(() => {
    if (!accessToken) {
      navigate(ROUTES.LOGIN, { replace: true })
    }
  }, [accessToken, navigate])

  return <Outlet />
}

export default RequireAuth

export const routes: RouteObject[] = [
  {
    element: <RequireGuest />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: (
          <SidebarProvider
            style={
              {
                "--sidebar-width": "20rem",
                "--sidebar-width-mobile": "20rem",
                "--sidebar-width-icon": "8rem",
              } as React.CSSProperties
            }
          >
            <Layout />
          </SidebarProvider>
        ),
        children: [
          {
            path: ROUTES.DASHBOARD,
            element: <DashboardPage />,
          },
          {
            path: ROUTES.COMPLETED_ORDER,
            element: <OrdersCompletedPage />,
          },
          {
            path: ROUTES.ACTIVE_ORDER,
            element: <OrdersActivePage />,
          },
          {
            path: ROUTES.SHOP_INFO,
            element: <ShopInfoPage />,
          },
          {
            path: ROUTES.SHOP_REVIEW,
            element: <ShopReviewPage />,
          },
          {
            path: ROUTES.SHOP_MENU,
            element: <ShopMenuPage />,
          },
        ],
      },
    ],
  },
]
