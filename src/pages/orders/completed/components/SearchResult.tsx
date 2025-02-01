import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table"
import { Pagination as TPagination } from "@/types/common"
import { Order } from "@/types/models"
import { useEffect, useState } from "react"
import { fetchOrders } from "@/apis/order"
import { DEFAULT_PAGINATION } from "@/constants"

import { PaginationComponent } from "./Pagination"
import { useQueryParams } from "../hooks/useQueryParams"
import { useSearchParams } from "react-router-dom"

// TODO: 행 클릭 시 상세정보 모달로 띄우기
export function SearchResult() {
  const [searchParams] = useSearchParams()

  const [orders, setOrders] = useState<Order[]>([])
  const [pagination, setPagination] = useState<TPagination>(DEFAULT_PAGINATION)
  const { startDate, endDate, status } = useQueryParams()

  useEffect(() => {
    const fetch = async () => {
      const { content, currentPage, hasNext, totalItems, totalPages } = await fetchOrders({
        page: 1,
        storeId: 1,
        size: 1,
        ...(startDate && { OrderInquiryStartDate: startDate }),
        ...(endDate && { OrderInquiryEndDate: endDate }),
        ...(status && { orderStatus: status }),
      })

      setOrders(content)
      setPagination({ currentPage, hasNext, totalItems, totalPages })
    }
    fetch()
  }, [searchParams])

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

      <PaginationComponent pagination={pagination} />
    </>
  )
}
