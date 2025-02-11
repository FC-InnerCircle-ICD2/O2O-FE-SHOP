export type OrderStatus = "NEW" | "ONGOING" | "DONE" | "CANCEL"
export type OrderType = "DELIVERY"
export type Pagination = {
  currentPage: number
  totalPages: number
  totalItems: number
  hasNext: boolean
}

export type SortOrder = "latest" | "rating"
