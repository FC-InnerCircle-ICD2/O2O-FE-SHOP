import { BrowserRouter, RouteObject, useRoutes } from "react-router-dom"
import { Layout } from "@/components/layout"

import { ROUTES } from "./utils/routes"
import LoginPage from "./pages/Login"
import ActiveOrdersPage from "./pages/Orders/Active"
import CompletedOrdersPage from "./pages/Orders/Completed"
import StoreInfoPage from "./pages/Store/Info"
import StoreReviewPage from "./pages/Store/Review"
import StoreMenuPage from "./pages/Store/Menu"

const routes: RouteObject[] = [
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.COMPLETED_ORDER,
        element: <ActiveOrdersPage />,
      },
      {
        path: ROUTES.ACTIVE_ORDER,
        element: <CompletedOrdersPage />,
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

function AppRoutes() {
  const element = useRoutes(routes)
  return element
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
