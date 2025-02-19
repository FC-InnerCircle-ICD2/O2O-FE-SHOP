import "@styles/fonts.css"
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes"

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
      <HydrationBoundary>
        <RouterProvider router={router} />
      </HydrationBoundary>
    </QueryClientProvider>
  )
}

export default App
