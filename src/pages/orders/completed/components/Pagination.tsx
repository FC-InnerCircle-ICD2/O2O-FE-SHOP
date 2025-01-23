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
export function PaginationComponent({ pagination }: { pagination: TPagination }) {
  const pages = Array.from({ length: pagination.totalPages }, (_, index) => index + 1)
  const showEllipsesBefore = pagination.currentPage > 3
  const showEllipsesAfter = pagination.currentPage < pagination.totalPages - 2

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>

        {/* Display first page */}
        {pagination.currentPage > 2 && (
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        )}

        {/* Ellipsis before if the current page is far enough */}
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
                href="#"
                className={pagination.currentPage === page ? "text-blue-500" : ""}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

        {/* Ellipsis after if the current page is far enough */}
        {showEllipsesAfter && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Display last page */}
        {pagination.currentPage < pagination.totalPages - 1 && (
          <PaginationItem>
            <PaginationLink href="#">{pagination.totalPages}</PaginationLink>
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
