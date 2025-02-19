import { Layout } from "@/components/layout"
import { SidebarProvider } from "@/components/shadcn/sidebar"
import { createBrowserRouter } from "react-router-dom"

import DashboardPage from "@/pages/dashboard/page"
import LoginPage from "@/pages/login/page"
import OrdersActivePage from "@/pages/orders/active/page"
import OrdersCompletedPage from "@/pages/orders/completed/page"
import ShopInfoPage from "@/pages/shop/info/page"
import ShopMenuPage from "@/pages/shop/menu/page"
import ShopReviewPage from "@/pages/shop/review/page"
import dashboardLoader from "./pages/dashboard/loader/dashboardLoader"
import { RequireAuth, RequireGuest } from "./utils/auth"
import { ROUTES } from "./utils/routes"

export const router = createBrowserRouter([
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
                "--sidebar-width": "16rem",
                "--sidebar-width-mobile": "16rem",
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
            loader: dashboardLoader,
          },
          {
            path: ROUTES.COMPLETED_ORDER,
            element: <OrdersCompletedPage />,
          },
          {
            path: ROUTES.ACTIVE_ORDER,
            element: <OrdersActivePage />,
            // loader: orderActiveLoader,
            // errorElement: <div>Error</div>,
            // hydrateFallbackElement: <div></div>,
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
])
