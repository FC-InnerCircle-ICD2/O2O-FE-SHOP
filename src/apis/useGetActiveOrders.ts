import { orderStatusLabels } from "@/constants/order"
import { ApiResponse, PaginatedData } from "@/types/api"
import { OrderStatus } from "@/types/common"
import { OrderDto } from "@/types/dtos"
import { useQuery } from "@tanstack/react-query"
import apiClient from "."

type FetchOrdersParams = Partial<{
  page: number
  size: number
  status: OrderStatus[]
  startDate: string
  endDate: string
}>
type FetchOrderResponse = ApiResponse<PaginatedData<OrderDto[]>>
const ALL_STATUS = Object.keys(orderStatusLabels) as OrderStatus[]

const useGetActiveOrders = () => {
  const { data: newOrders } = useQuery({
    queryKey: ["orders", "new"],
    queryFn: async () => {
      const { data } = await apiClient.get<FetchOrderResponse>("/orders", {
        params: {
          startDate: "",
          endDate: "",
          status: "NEW",
          page: 0,
          size: 999,
        },
      })

      return data.data.content
    },
  })

  const { data: onGoingOrders } = useQuery({
    queryKey: ["orders", "onGoing"],
    queryFn: async () => {
      const { data } = await apiClient.get<FetchOrderResponse>("/orders", {
        params: {
          startDate: "",
          endDate: "",
          status: "ONGOING",
          page: 0,
          size: 999,
        },
      })

      return data.data.content
    },
  })

  return { newOrders, onGoingOrders }
}

export default useGetActiveOrders
