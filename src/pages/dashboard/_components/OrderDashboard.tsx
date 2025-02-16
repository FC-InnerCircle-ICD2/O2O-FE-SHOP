import OrderChart from "./OrderChart"
import OrderSummary from "./OrderSummary"

const OrderDashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <OrderSummary />
      <OrderChart />
    </div>
  )
}

export default OrderDashboard
