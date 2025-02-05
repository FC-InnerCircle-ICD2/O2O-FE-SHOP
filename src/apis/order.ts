import { Order } from "@/types/models"
import apiClient from "./index"
import { ApiResponse, PaginatedData } from "@/types/api"
import { OrderDto } from "@/types/dtos"
import { mapOrderDtoToModel } from "@/utils/mappers/order"
import { DEFAULT_PAGINATION } from "@/constants"
import { OrderStatus } from "@/types/common"
type FetchOrdersParams = {
  storeId: number
  page: number
  size: number
  orderStatus?: OrderStatus[]
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

type ApiResult<T> = {
  success: boolean
  message: string
  data: T
}

export const refuseOrder = async (orderId: string): Promise<ApiResult<null>> => {
  try {
    const { data } = await apiClient.patch<ApiResponse<null>>(`/orders/${orderId}/refuse`, {
      orderId,
    })
    return {
      success: data.status === 200,
      ...data,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "알 수 없는 오류가 발생했습니다.",
    }
  }
}

export const approveOrder = async (orderId: string): Promise<ApiResult<null>> => {
  try {
    const { data } = await apiClient.patch<ApiResponse<null>>(`/orders/${orderId}/approve`, {
      orderId,
    })
    return {
      success: data.status === 200,
      ...data,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "알 수 없는 오류가 발생했습니다.",
    }
  }
}

export const completeOrder = async (orderId: string): Promise<ApiResult<null>> => {
  try {
    const { data } = await apiClient.post<ApiResponse<null>>(`/orders/${orderId}/complete`)
    return {
      success: data.status === 200,
      ...data,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "알 수 없는 오류가 발생했습니다.",
    }
  }
}
