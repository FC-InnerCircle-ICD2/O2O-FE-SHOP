import { OrderStatus } from "@/types/common"
import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

export interface QueryParams {
  startDate?: string // ISO 형식 문자열로 날짜 전달
  endDate?: string
  status?: OrderStatus // 사용자 정의 OrderStatus 타입
  storeId?: string
  page?: number
  size?: number
}

export function useQueryParams(): QueryParams {
  const [searchParams] = useSearchParams()

  return useMemo(() => {
    const startDate = searchParams.get("start_date") || undefined
    const endDate = searchParams.get("end_date") || undefined
    const status = (searchParams.get("status") as OrderStatus) || undefined
    const storeId = searchParams.get("storeId") || undefined

    // 숫자 파라미터 처리 (페이지 번호와 사이즈)
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : undefined
    const size = searchParams.get("size") ? parseInt(searchParams.get("size")!, 10) : undefined

    return { startDate, endDate, status, storeId, page, size }
  }, [searchParams])
}
