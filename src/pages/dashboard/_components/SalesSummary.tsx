"use client"

import { SalesDashboardSummary } from "@/apis/useGetDashboard"
import { Card } from "@/components/shadcn/card"
import { Separator } from "@/components/shadcn/separator"

const SalesSummary = ({ summary }: { summary: SalesDashboardSummary }) => {
  return (
    <Card className="grid grid-cols-[1fr_1px_1fr_1px_1fr_1px_1fr] bg-white py-4 px-6 rounded-lg">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-semibold">
            {summary.totalPrice.toLocaleString()}
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
            {Math.round(summary.avgPrice).toLocaleString()}
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
            {Math.round(summary.avgPricePerTime).toLocaleString()}
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
            {Math.round(summary.avgPricePerDay).toLocaleString()}
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
