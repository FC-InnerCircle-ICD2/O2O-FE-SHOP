import { Order } from "@/types/models"
import apiClient from "./index"
import { ApiResponse, PaginatedData } from "@/types/api"
import { OrderDto } from "@/types/dtos"
import { mapOrderDtoToModel } from "@/utils/mappers/order"
import { DEFAULT_PAGINATION } from "@/constants"
import { OrderStatus } from "@/types/common"
import { orderStatusLabels } from "@/constants/order"
type FetchOrdersParams = Partial<{
  page: number
  size: number
  status: OrderStatus[]
  startDate: string
  endDate: string
}>
type FetchOrderResponse = ApiResponse<PaginatedData<OrderDto[]>>
const ALL_STATUS = Object.keys(orderStatusLabels) as OrderStatus[]

export const fetchOrders = async (
  params: FetchOrdersParams = {},
): Promise<PaginatedData<Order[]>> => {
  const {
    page = 0,
    size = 5,
    status = ALL_STATUS,
    startDate = "20250101",
    endDate = "30000101",
  } = params

  const queryParams = { page, size, startDate, endDate, status: status.join(",") }

  const { status: responseStatus, data } = await apiClient.get<FetchOrderResponse>("/orders", {
    params: queryParams,
  })
  if (responseStatus === 200) {
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

// TODO: 실패 시 에러 토스트 띄우기
export const refuseOrder = async (orderId: string): Promise<ApiResult<null>> => {
  try {
    const { data } = await apiClient.patch<ApiResponse<null>>(`/orders/${orderId}/refuse`)
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
    const { data } = await apiClient.patch<ApiResponse<null>>(`/orders/${orderId}/approve`)
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
