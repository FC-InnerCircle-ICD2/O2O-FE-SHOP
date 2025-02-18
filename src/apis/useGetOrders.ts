import { ApiResponse, PaginatedData } from "@/types/api"
import { OrderDto } from "@/types/dtos"
import { useQuery } from "@tanstack/react-query"
import apiClient from "."

export interface OrdersParams {
  page: number
  size: number
  status: string
  startDate: string
  endDate: string
}

const useGetOrders = (params: OrdersParams | undefined) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<PaginatedData<OrderDto[]>>>("/orders", {
        params,
      })

      return data.data
    },
    enabled: !!params,
  })
}

export default useGetOrders
