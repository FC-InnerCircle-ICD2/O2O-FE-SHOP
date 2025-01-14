import OrderDetail from "./components/OrderDetail"
import OrderList from "./components/OrderList"
import { OrderProvider } from "./contexts/OrderActiveProvider"

export default function OrdersActivePage() {
  return (
    <OrderProvider>
      <div className="flex flex-1 h-full">
        <OrderList />
        <OrderDetail />
      </div>
    </OrderProvider>
  )
}
