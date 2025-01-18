import { Layout } from "@/components/layout"
import { SidebarProvider } from "@/components/ui/sidebar"
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

export const routes: RouteObject[] = [
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    element: (
      <SidebarProvider
        style={{
          "--sidebar-width": "26rem",
          "--sidebar-width-mobile": "26rem",
          "--sidebar-width-icon": "8rem",
        }}
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
]
