import { OrderStatus } from "@/types/common"
import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

export interface QueryParams {
  startDate?: string
  endDate?: string
  status?: OrderStatus[]
  storeId?: string
  page?: number
  size?: number
}

export function useQueryParams(): QueryParams {
  const [searchParams] = useSearchParams()

  return useMemo(() => {
    // 주문목록 조회 필터
    const startDate = searchParams.get("startDate") || undefined
    const endDate = searchParams.get("endDate") || undefined
    const status = (searchParams.getAll("status") as OrderStatus[]) || undefined

    // 페이지네이션
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : undefined
    const size = searchParams.get("size") ? parseInt(searchParams.get("size")!, 10) : undefined

    return { startDate, endDate, status, page, size }
  }, [searchParams])
}
