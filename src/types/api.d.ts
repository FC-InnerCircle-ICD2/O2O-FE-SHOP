export type ApiResponse<T> = {
  status: number
  message: string
  data: T
}

export type PagenatedData<T> = {
  content: T,
  currentPage: number,
  totalPages: number,
  totalItems: number,
  hasNext: boolean
}