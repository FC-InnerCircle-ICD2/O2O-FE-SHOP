import { ApiResponse } from "@/types/api"
import { formatDateToString } from "@/utils/format"
import { useQuery } from "@tanstack/react-query"
import { DateRange } from "react-day-picker"
import apiClient from "."

export interface SalesDashboardSummary {
  totalPrice: number
  avgPrice: number
  avgPricePerDay: number
  avgPricePerTime: number
}

export interface OrderDashboardSummary {
  avgOrderPerDay: number
  cancelOrders: number
  cancelRate: number
  totalOrder: number
}

export interface DashboardData {
  menu: string
  orderTime: string
  price: number
  status: "DONE" | "CANCEL"
}

interface DashboardResponse {
  summary: SalesDashboardSummary | OrderDashboardSummary
  data: DashboardData[]
}

export interface DashboardParams {
  date: DateRange | undefined
  type: "SALES" | "ORDERS"
}

export const getDashboard = async (params?: DashboardParams) => {
  try {
    const today = new Date()
    const sevenDaysAgo = new Date(today)
    sevenDaysAgo.setDate(today.getDate() - 6)

    const response = await apiClient.get<ApiResponse<DashboardResponse>>("/dashboard", {
      params: {
        startDate: params?.date?.from
          ? formatDateToString(params.date.from)
          : formatDateToString(sevenDaysAgo),
        endDate: params?.date?.to ? formatDateToString(params.date.to) : formatDateToString(today),
        type: params?.type || "SALES",
      },
    })

    return response.data.data
  } catch (error) {
    throw new Error("Failed to fetch orders")
  }
}

const useGetDashboard = (params: DashboardParams) => {
  return useQuery({
    queryKey: ["dashboard", params],
    queryFn: () => {
      return getDashboard(params)
    },
  })
}

export default useGetDashboard
