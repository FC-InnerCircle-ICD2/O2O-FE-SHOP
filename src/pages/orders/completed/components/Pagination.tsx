import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/shadcn/pagination"
import { Pagination as TPagination } from "@/types/common"
import { useLocation, useNavigate } from "react-router-dom"

export function PaginationComponent({ pagination }: { pagination: TPagination }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams(location.search)

    searchParams.set("page", page.toString())

    navigate(`${location.pathname}?${searchParams.toString()}`)
  }

  const pages = Array.from({ length: pagination.totalPages }, (_, index) => index + 1)
  const showEllipsesBefore = pagination.currentPage > 3
  const showEllipsesAfter = pagination.currentPage < pagination.totalPages - 2

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            className={pagination.currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
            onClick={() => handlePageChange(pagination.currentPage - 1)}
          />
        </PaginationItem>

        {/* Display first page */}
        {pagination.currentPage > 2 && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
          </PaginationItem>
        )}

        {/* Ellipsis before */}
        {showEllipsesBefore && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Pages around the current page */}
        {pages
          .filter(
            (page) =>
              page === pagination.currentPage ||
              page === pagination.currentPage - 1 ||
              page === pagination.currentPage + 1,
          )
          .map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageChange(page)}
                className={pagination.currentPage === page ? "text-blue-500" : ""}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

        {/* Ellipsis after */}
        {showEllipsesAfter && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Display last page */}
        {pagination.currentPage < pagination.totalPages - 1 && (
          <PaginationItem>
            <PaginationLink
              className={pagination.currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
              onClick={() => handlePageChange(pagination.totalPages)}
            >
              {pagination.totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            className={
              pagination.currentPage === pagination.totalPages
                ? "opacity-50 pointer-events-none"
                : ""
            }
            onClick={() => handlePageChange(pagination.currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
