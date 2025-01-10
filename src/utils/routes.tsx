import { Layout } from "@/components/layout"
import LoginPage from "@/pages/login/LoginPage"
import OrdersActivePage from "@/pages/orders/active/OrdersActivePage"
import OrdersCompletedPage from "@/pages/orders/completed/OrdersCompletedPage"
import StoreInfoPage from "@/pages/store/info/StoreInfo"
import StoreMenuPage from "@/pages/store/menu/StoreMenu"
import StoreReviewPage from "@/pages/store/review/StoreReview"
import { RouteObject } from "react-router-dom"

export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/",
  COMPLETED_ORDER: "/orders/completed",
  ACTIVE_ORDER: "/orders/active",
  STORE_INFO: "/store/info",
  STORE_REVIEW: "/store/review",
  STORE_MENU: "/store/menu",
}

export const routes: RouteObject[] = [
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <>dashboard</>,
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
        path: ROUTES.STORE_INFO,
        element: <StoreInfoPage />,
      },
      {
        path: ROUTES.STORE_REVIEW,
        element: <StoreReviewPage />,
      },
      {
        path: ROUTES.STORE_MENU,
        element: <StoreMenuPage />,
      },
    ],
  },
]
