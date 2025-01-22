import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table"
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
import { Order } from "@/types/models"
import { useEffect, useState } from "react"
import { fetchOrders } from "@/apis/order"
import { DEFAULT_PAGINATION } from "@/constants"

export function SearchResult() {
  const [orders, setOrders] = useState<Order[]>([])
  const [pagination, setPagination] = useState<TPagination>(DEFAULT_PAGINATION)

  useEffect(() => {
    const fetch = async () => {
      const { content, currentPage, hasNext, totalItems, totalPages } = await fetchOrders({
        page: 1,
        storeId: 1,
        size: 1,
      })

      setOrders(content)
      setPagination({ currentPage, hasNext, totalItems, totalPages })
    }
    fetch()
  }, [])

  // Calculate the range of pages to display (for simplicity, display up to 5 pages)
  const pages = Array.from({ length: pagination.totalPages }, (_, index) => index + 1)
  const showEllipsesBefore = pagination.currentPage > 3
  const showEllipsesAfter = pagination.currentPage < pagination.totalPages - 2

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">주문시각</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>메뉴</TableHead>
            <TableHead className="text-right">주문금액</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, key) => (
            <TableRow key={key}>
              <TableCell className="font-medium">{order.time}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell className="text-right">{order.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              // disabled={pagination.currentPage === 1}
            />
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
            <PaginationNext
              href="#"
              // disabled={!pagination.hasNext}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
