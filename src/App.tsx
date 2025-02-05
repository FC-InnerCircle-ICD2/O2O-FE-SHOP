import { BrowserRouter, useRoutes } from "react-router-dom"
import { routes } from "@/routes"
import "@styles/fonts.css"

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
