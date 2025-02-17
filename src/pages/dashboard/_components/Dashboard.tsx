"use client"

import { useState } from "react"
import { DateRange } from "react-day-picker"
import OrderDashboard from "./OrderDashboard"
import SalesDashboard from "./SalesDashboard"
import SearchFilter from "./SearchFilter"

const Dashboard = () => {
  const [filter, setFilter] = useState<{ date: DateRange | undefined; type: "SALES" | "ORDERS" }>({
    date: {
      from: new Date(new Date().setDate(new Date().getDate() - 6)),
      to: new Date(),
    },
    type: "SALES",
  })

  const handleFilterChange = (key: string, value: DateRange | "SALES" | "ORDERS") => {
    setFilter((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex flex-col gap-4 min-w-[900px] py-6 px-8">
      <SearchFilter filter={filter} onFilterChange={handleFilterChange} />
      {filter.type === "SALES" && <SalesDashboard />}
      {filter.type === "ORDERS" && <OrderDashboard />}
    </div>
  )
}

export default Dashboard
