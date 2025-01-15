import OrderDetail from "./components/OrderDetail"
import OrderList from "./components/OrderList"
import { OrderProvider } from "./contexts/OrderActiveProvider"

export default function OrdersActivePage() {
  return (
    <OrderProvider>
      <div className="h-[calc(100dvh-80px)] overflow-y-auto grid grid-cols-[350px_1fr] w-full">
        <OrderList />
        <OrderDetail />
      </div>
    </OrderProvider>
  )
}
