import { BrowserRouter, useRoutes } from "react-router-dom"
import { routes } from "@/routes"
import "@styles/fonts.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function AppRoutes() {
  const element = useRoutes(routes)
  return element
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
