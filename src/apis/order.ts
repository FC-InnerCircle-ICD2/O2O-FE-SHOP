import { Order } from "@/types/models"
import apiClient from "./index"
import { ApiResponse, PagenatedData } from "@/types/api"
import { OrderDto } from "@/types/dtos"
import { mapOrderDtoToModel } from "@/utils/mappers/order"

type FetchOrdersParams = {
  storeId: number
  page: number
  size: number
  orderStatus?: ("NEW" | "ONGOING" | "DONE")[]
  OrderInquiryStartDate?: string
  OrderInquiryEndDate?: string
}
type FetchOrderResponse = ApiResponse<PagenatedData<OrderDto[]>>
export const fetchOrders = async (params: FetchOrdersParams): Promise<Order[]> => {
  const queryParams = {
    ...params,
    ...(params.orderStatus && { orderStatus: params.orderStatus.join(",") }), // orderStatus가 있을 때만 추가
  }

  const { status, data } = await apiClient.get<FetchOrderResponse>("/orders", {
    params: queryParams,
  })
  if (status === 200) {
    return data.data.content.map((order) => mapOrderDtoToModel(order))
  } else {
    return []
  }
}
