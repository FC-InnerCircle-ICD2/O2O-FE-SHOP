import { useQuery } from "@tanstack/react-query"
import React from "react"
import apiClient, { mockClient } from "."
import { ApiResponse } from "@/types/api"

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
      const res = await mockClient.get<ApiResponse<ReviewsSummary>>("reviews/summary")

      return res.data.data
    },
  })
}

export default useGetReviewSummary
