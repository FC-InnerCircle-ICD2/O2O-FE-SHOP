import { OrderStatus } from "@/types/common"
import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

export interface QueryParams {
  startDate?: string
  endDate?: string
  status?: OrderStatus | string
  storeId?: string
  page?: number
  size?: number
}
// TODO: 값이 존재하지 않을 경우 기본 값으로 설정

export interface UseQueryParamsReturn extends QueryParams {
  setQueryParams: (params: Partial<QueryParams>) => void
}

export function useOrdersParams(): UseQueryParamsReturn {
  const [searchParams, setSearchParams] = useSearchParams()

  const queryParams = useMemo(() => {
    // 주문목록 조회 필터
    const startDate = searchParams.get("startDate") || undefined
    const endDate = searchParams.get("endDate") || undefined
    const status = (searchParams.get("status") as OrderStatus) || undefined

    // 페이지네이션
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : undefined
    const size = searchParams.get("size") ? parseInt(searchParams.get("size")!, 10) : undefined

    return { startDate, endDate, status, page, size }
  }, [searchParams])

  const setQueryParams = useMemo(() => {
    return (params: Partial<QueryParams>) => {
      const newParams = new URLSearchParams(searchParams)

      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined) {
          newParams.delete(key)
        } else {
          newParams.set(key, String(value))
        }
      })

      setSearchParams(newParams)
    }
  }, [searchParams, setSearchParams])

  return { ...queryParams, setQueryParams }
}
