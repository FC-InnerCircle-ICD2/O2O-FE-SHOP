import { DashboardData, DashboardParams, OrderDashboardSummary } from "@/apis/useGetDashboard"
import OrderChart from "./OrderChart"
import OrderSummary from "./OrderSummary"

interface OrderDashboardProps {
  filter: DashboardParams
  summary: OrderDashboardSummary
  data: DashboardData[]
}

const OrderDashboard = ({ filter, summary, data }: OrderDashboardProps) => {
  return (
    <div className="flex flex-col gap-4">
      <OrderSummary summary={summary} />
      <OrderChart filter={filter} data={data} />
    </div>
  )
}

export default OrderDashboard
