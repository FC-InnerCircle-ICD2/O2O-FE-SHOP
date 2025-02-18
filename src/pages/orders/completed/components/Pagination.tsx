import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/shadcn/pagination"
import { cn } from "@/lib/utils"
import { Pagination as TPagination } from "@/types/common"
import { useLocation, useNavigate } from "react-router-dom"
const MAX_BLOCK = 5

export function PaginationComponent({ pagination }: { pagination: TPagination }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set("page", page.toString())
    navigate(`${location.pathname}?${searchParams.toString()}`)
  }

  const pages = Array.from({ length: pagination.totalPages }, (_, index) => index)

  // 현재 페이지를 중심으로 표시할 페이지 계산
  const startPage = Math.max(0, pagination.currentPage - 2)
  const endPage = Math.min(pagination.totalPages - 1, startPage + MAX_BLOCK - 1)

  // startPage 재조정
  const visiblePages = pages.slice(Math.max(0, endPage - MAX_BLOCK + 1), endPage + 1)

  const showEllipsesAfter = endPage < pagination.totalPages - 1
  const showEllipsesBefore = startPage > 0

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              "cursor-pointer hover:bg-blue-100",
              pagination.currentPage === 0 ? "opacity-50 pointer-events-none" : "",
            )}
            onClick={() => handlePageChange(pagination.currentPage - 1)}
          />
        </PaginationItem>

        {showEllipsesBefore && (
          <>
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer hover:bg-blue-100"
                onClick={() => handlePageChange(0)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => handlePageChange(page)}
              className={cn(
                "cursor-pointer hover:bg-blue-100",
                pagination.currentPage === page ? "text-blue-500" : "",
              )}
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {showEllipsesAfter && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer hover:bg-blue-100"
                onClick={() => handlePageChange(pagination.totalPages - 1)}
              >
                {pagination.totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            className={cn(
              "cursor-pointer hover:bg-blue-100",
              pagination.currentPage === pagination.totalPages - 1
                ? "opacity-50 pointer-events-none"
                : "",
            )}
            onClick={() => handlePageChange(pagination.currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
