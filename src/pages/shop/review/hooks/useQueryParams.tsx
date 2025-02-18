import { SortOrder } from "@/types/common"
import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

export interface QueryParams {
  startDate?: string
  endDate?: string
  sort?: SortOrder
  answerType?: "ALL" | "OWNER_NOT_ANSWERED"
}

export interface UseQueryParamsReturn extends QueryParams {
  setQueryParams: (params: Partial<QueryParams>) => void
}

export function useQueryParams(): UseQueryParamsReturn {
  // TODO: 값이 존재하지 않을 경우 기본 값으로 설정
  const [searchParams, setSearchParams] = useSearchParams()

  const queryParams = useMemo(() => {
    // 리뷰목록 조회 필터
    const startDate = searchParams.get("startDate") || undefined
    const endDate = searchParams.get("endDate") || undefined
    const sort = (searchParams.get("sort") as SortOrder) || "LATEST"
    const answerType = (searchParams.get("answerType") as "ALL" | "OWNER_NOT_ANSWERED") || "ALL"

    return { startDate, endDate, sort, answerType }
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
