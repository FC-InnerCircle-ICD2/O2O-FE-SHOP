import { DashboardData } from "@/constants/dashboard"
import SalesChart from "./SalesChart"
import SalesSummary from "./SalesSummary"

interface SalesDashboardProps {
  data: DashboardData[]
}

const SalesDashboard = ({ data }: SalesDashboardProps) => {
  return (
    <div className="flex flex-col gap-4">
      <SalesSummary data={data} />
      <SalesChart data={data} />
    </div>
  )
}

export default SalesDashboard
