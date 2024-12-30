import { BrowserRouter, RouteObject, useRoutes } from "react-router-dom"
import { ROUTES } from "./utils/routes"
import { Layout } from "@/components/ui/layout"

const routes: RouteObject[] = [
  {
    path: ROUTES.LOGIN,
    element: <></>,
  },
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.COMPLETED_ORDER,
        element: <></>,
      },
      {
        path: ROUTES.ACTIVE_ORDER,
        element: <></>,
      },
      {
        path: ROUTES.STORE,
        element: <></>,
      },
      {
        path: ROUTES.MENU,
        element: <></>,
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
