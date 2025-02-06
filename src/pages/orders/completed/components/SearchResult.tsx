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
import useModal from "@/hooks/useModal"
import OrderDetail from "./OrderDetail"

export function SearchResult() {
  const [searchParams] = useSearchParams()
  const { show } = useModal()

  const [orders, setOrders] = useState<Order[]>([])
  const [pagination, setPagination] = useState<TPagination>(DEFAULT_PAGINATION)
  const { startDate, endDate, status } = useQueryParams()
  const handleRowClick = (order: Order) => {
    show({
      content: <OrderDetail order={order} />,
      useAnimation: true,
    })
  }
  useEffect(() => {
    if (searchParams.size <= 0) return
    const fetch = async () => {
      const { content, currentPage, hasNext, totalItems, totalPages } = await fetchOrders({
        page: 0,
        size: 10,
        startDate,
        endDate,
        status: ["DONE"],
      })
      // TODO: 시작, 종료일 yyyyMMdd 형식으로 맞추기

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
            <TableRow key={key} onClick={() => handleRowClick(order)}>
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
