import { DashboardData, DashboardParams, SalesDashboardSummary } from "@/apis/useGetDashboard"
import SalesChart from "./SalesChart"
import SalesSummary from "./SalesSummary"

interface SalesDashboardProps {
  filter: DashboardParams
  summary: SalesDashboardSummary
  data: DashboardData[]
}

const SalesDashboard = ({ filter, summary, data }: SalesDashboardProps) => {
  return (
    <div className="flex flex-col gap-4">
      <SalesSummary summary={summary} />
      <SalesChart filter={filter} data={data} />
    </div>
  )
}

export default SalesDashboard
