import { Review, ReviewRatings } from "@/types/models"
import apiClient from "."

type ApiResponse<T> = {
  status: number
  data: T
  message: string
}

type ApiResult<T> = {
  success: boolean
  data: T
  message?: string
}

interface FetchReviewsParams {
  page: number
  size: number
  startDate?: string
  endDate?: string
  order?: string
}

export const fetchReviews = async ({
  page,
  size,
  startDate,
  endDate,
  order,
}: FetchReviewsParams): Promise<ApiResult<Review[]>> => {
  try {
    const { data } = await apiClient.get<ApiResponse<Review[]>>("/reviews", {
      params: { page, size, startDate, endDate, order },
    })
    return {
      success: data.status === 200,
      data: data.data,
      message: data.message,
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: "알 수 없는 오류가 발생했습니다.",
    }
  }
}

export const fetchReviewStats = async (): Promise<ApiResult<ReviewRatings>> => {
  try {
    const { data } = await apiClient.get<ApiResponse<ReviewRatings>>(`/reviews/stats`)
    return {
      success: data.status === 200,
      data: data.data,
      message: data.message,
    }
  } catch (error) {
    return {
      success: false,
      data: { total: 0, quantity: 0, taste: 0, delivery: 0 },
      message: "알 수 없는 오류가 발생했습니다.",
    }
  }
}

export const createReply = async (reviewId: string, content: string): Promise<ApiResult<null>> => {
  try {
    const { data } = await apiClient.post<ApiResponse<null>>(`/reviews/${reviewId}/reply`, {
      content,
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

export const registerReply = async (
  reviewId: string,
  content: string,
): Promise<ApiResult<null>> => {
  try {
    const { data } = await apiClient.post<ApiResponse<null>>(`/reviews/${reviewId}/reply`, {
      content,
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

export const deleteReply = async (reviewId: string): Promise<ApiResult<null>> => {
  try {
    const { data } = await apiClient.delete<ApiResponse<null>>(`/reviews/${reviewId}/reply`)
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
