export type OrderStatus = "NEW" | "ONGOING" | "DONE"
export type OrderType = "DELIVERY"
export type Pagination = {
  currentPage: number
  totalPages: number
  totalItems: number
  hasNext: boolean
}
