import { Order } from "@/types/models"
import apiClient from "./index"
import { ApiResponse, PaginatedData } from "@/types/api"
import { OrderDto } from "@/types/dtos"
import { mapOrderDtoToModel } from "@/utils/mappers/order"
import { DEFAULT_PAGINATION } from "@/constants"

type FetchOrdersParams = {
  storeId: number
  page: number
  size: number
  orderStatus?: ("NEW" | "ONGOING" | "DONE")[]
  OrderInquiryStartDate?: string
  OrderInquiryEndDate?: string
}
type FetchOrderResponse = ApiResponse<PaginatedData<OrderDto[]>>
export const fetchOrders = async (params: FetchOrdersParams): Promise<PaginatedData<Order[]>> => {
  const queryParams = {
    ...params,
    ...(params.orderStatus && { orderStatus: params.orderStatus.join(",") }), // orderStatus가 있을 때만 추가
  }

  const { status, data } = await apiClient.get<FetchOrderResponse>("/orders", {
    params: queryParams,
  })
  if (status === 200) {
    const { content, currentPage, hasNext, totalItems, totalPages } = data.data
    return {
      content: content.map((order: OrderDto) => mapOrderDtoToModel(order)),
      currentPage,
      hasNext,
      totalItems,
      totalPages,
    }
  } else {
    return { content: [], ...DEFAULT_PAGINATION }
  }
}
