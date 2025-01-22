import { Pagination } from "./common"

export type ApiResponse<T> = {
  status: number
  message: string
  data: T
}

export type PaginatedData<T> = {
  content: T
} & Pagination
