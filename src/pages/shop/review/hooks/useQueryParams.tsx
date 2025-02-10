import { OrderStatus, SortOrder } from "@/types/common"
import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

export interface QueryParams {
  startDate?: string
  endDate?: string
  order?: SortOrder
  storeId?: string
  page?: number
  size?: number
}

export function useQueryParams(): QueryParams {
  // TODO: 값이 존재하지 않을 경우 기본 값으로 설정
  const [searchParams] = useSearchParams()

  return useMemo(() => {
    // 리뷰목록 조회 필터
    const startDate = searchParams.get("startDate") || undefined
    const endDate = searchParams.get("endDate") || undefined
    const order = (searchParams.get("order") as SortOrder) || undefined

    // 페이지네이션
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : undefined
    const size = searchParams.get("size") ? parseInt(searchParams.get("size")!, 10) : undefined

    return { startDate, endDate, order, page, size }
  }, [searchParams])
}
