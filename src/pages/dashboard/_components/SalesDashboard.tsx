import SalesChart from "./SalesChart"
import SalesSummary from "./SalesSummary"

const SalesDashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <SalesSummary />
      <SalesChart />
    </div>
  )
}

export default SalesDashboard
