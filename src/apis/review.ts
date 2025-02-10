import { Review, ReviewStats } from "@/types/models"
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

export const fetchReviews = async (): Promise<ApiResult<Review[]>> => {
  try {
    const { data } = await apiClient.get<ApiResponse<Review[]>>("/reviews")
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

export const fetchReviewStats = async (): Promise<ApiResult<ReviewStats>> => {
  try {
    const { data } = await apiClient.get<ApiResponse<ReviewStats>>(`/reviews/stats`)
    return {
      success: data.status === 200,
      data: data.data,
      message: data.message,
    }
  } catch (error) {
    return {
      success: false,
      data: { quantity: 0, taste: 0, delivery: 0 },
      message: "알 수 없는 오류가 발생했습니다.",
    }
  }
}

export const createReply = async (reviewId: number, content: string): Promise<ApiResult<null>> => {
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

export const updateReply = async (
  reviewId: number,
  replyId: number,
  content: string,
): Promise<ApiResult<null>> => {
  try {
    const { data } = await apiClient.put<ApiResponse<null>>(
      `/reviews/${reviewId}/reply/${replyId}`,
      { content },
    )
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

export const deleteReply = async (reviewId: number, replyId: number): Promise<ApiResult<null>> => {
  try {
    const { data } = await apiClient.delete<ApiResponse<null>>(
      `/reviews/${reviewId}/reply/${replyId}`,
    )
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
