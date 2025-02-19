"use client"

import useGetDashboard, {
  DashboardParams,
  OrderDashboardSummary,
  SalesDashboardSummary,
} from "@/apis/useGetDashboard"
import { DashboardData } from "@/constants/dashboard"
import { useEffect, useState } from "react"
import { DateRange } from "react-day-picker"
import OrderDashboard from "./OrderDashboard"
import SalesDashboard from "./SalesDashboard"
import SearchFilter from "./SearchFilter"

const Dashboard = () => {
  const today = new Date()
  const weekAgo = new Date(today)
  weekAgo.setDate(today.getDate() - 6)

  const [filter, setFilter] = useState<DashboardParams>({
    date: {
      from: weekAgo,
      to: today,
    },
    type: "SALES",
  })
  const [data, setData] = useState<DashboardData[]>([])

  const { data: dashboardData } = useGetDashboard(filter)

  const handleFilterChange = (key: string, value: DateRange | "SALES" | "ORDERS") => {
    if (typeof value === "object" && value !== null) {
      setFilter((prev) => ({
        ...prev,
        startDate: value.from?.toISOString().replace(/-/g, ""),
        endDate: value.to?.toISOString().replace(/-/g, ""),
      }))
    } else {
      setFilter((prev) => ({ ...prev, type: value }))
    }
  }

  useEffect(() => {
    console.log("data", dashboardData)
  }, [dashboardData])

  return (
    <div className="flex flex-col gap-4 min-w-[900px] py-6 px-8">
      <SearchFilter filter={filter} onFilterChange={handleFilterChange} />
      {dashboardData && filter.type === "SALES" && (
        <SalesDashboard
          filter={filter}
          summary={dashboardData.summary as SalesDashboardSummary}
          data={dashboardData.data}
        />
      )}
      {dashboardData && filter.type === "ORDERS" && (
        <OrderDashboard
          filter={filter}
          summary={dashboardData.summary as OrderDashboardSummary}
          data={dashboardData.data}
        />
      )}
    </div>
  )
}

export default Dashboard
