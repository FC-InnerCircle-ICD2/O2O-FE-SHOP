"use client"

import { Card } from "@/components/shadcn/card"
import { Separator } from "@/components/shadcn/separator"
import { DashboardData } from "@/constants/dashboard"
import { useEffect, useState } from "react"

interface SalesSummaryData {
  totalSales: number
  averageSales: number
  timeSales: number
  dailySales: number
}

const SalesSummary = ({ data }: { data: DashboardData[] }) => {
  const [sales, setSales] = useState<SalesSummaryData>({
    totalSales: 0,
    averageSales: 0,
    dailySales: 0,
    timeSales: 0,
  })
  useEffect(() => {
    const totalSales = data.reduce((acc, curr) => acc + curr.price, 0)
    const averageSales = totalSales / data.length
    const timeSales = data.reduce((acc, curr) => acc + curr.price, 0) / 24
    const dailySales = data.reduce((acc, curr) => acc + curr.price, 0) / 7

    setSales({ totalSales, averageSales, timeSales, dailySales })
  }, [data])

  return (
    <Card className="grid grid-cols-[1fr_1px_1fr_1px_1fr_1px_1fr] bg-white py-4 px-6 rounded-lg">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-semibold">
            {sales.totalSales.toLocaleString()}
            {/* {formatCurrency(sales.totalSales)} */}
            <span className="text-base ml-[0.1rem]">원</span>
          </p>
          <p className="text-sm text-gray-500">총 매출액</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Separator className="h-[70%] bg-gray-400" orientation="vertical" />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-semibold">
            {Math.round(sales.averageSales).toLocaleString()}
            {/* {formatCurrency(sales.averageSales)} */}
            <span className="text-base ml-[0.1rem]">원</span>
          </p>
          <p className="text-sm text-gray-500">평균 매출액</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Separator className="h-[70%] bg-gray-400" orientation="vertical" />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-semibold">
            {Math.round(sales.timeSales).toLocaleString()}
            {/* {formatCurrency(sales.timeSales)} */}
            <span className="text-base ml-[0.1rem]">원</span>
          </p>
          <p className="text-sm text-gray-500">시간대별 평균 매출</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Separator className="h-[70%] bg-gray-400" orientation="vertical" />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-semibold">
            {/* {sales.dailySales.toLocaleString()} */}
            {Math.round(sales.dailySales).toLocaleString()}
            {/* {formatCurrency(sales.dailySales)} */}
            <span className="text-base ml-[0.1rem]">원</span>
          </p>
          <p className="text-sm text-gray-500">일 평균 매출</p>
        </div>
      </div>
    </Card>
  )
}

export default SalesSummary
