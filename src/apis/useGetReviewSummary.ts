import { ApiResponse } from "@/types/api"
import { useQuery } from "@tanstack/react-query"
import apiClient from "."

interface ReviewsSummary {
  totalRating: number
  quantityRating: number
  tasteRating: number
  reviewCount: number
}

const useGetReviewSummary = () => {
  return useQuery({
    queryKey: ["reviewSummary"],
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<ReviewsSummary>>("reviews/summary")

      return res.data.data
    },
  })
}

export default useGetReviewSummary
