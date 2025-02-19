import { HydrationBoundary } from "@tanstack/react-query"
import { useLoaderData } from "react-router-dom"
import OrderDetail from "./components/OrderDetail"
import OrderList from "./components/OrderList"
import { OrderProvider } from "./contexts/OrderActiveProvider"
import orderActiveLoader from "./loader/orderActiveLoader"

export default function Page() {
  const { error, dehydratedState } = useLoaderData<typeof orderActiveLoader>()

  if (error) {
    return <div>{error}</div>
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      <OrderProvider>
        <div className="h-[calc(100dvh-80px)] overflow-y-auto grid grid-cols-[350px_1fr] w-full">
          <OrderList />
          <OrderDetail />
        </div>
      </OrderProvider>
    </HydrationBoundary>
  )
}
