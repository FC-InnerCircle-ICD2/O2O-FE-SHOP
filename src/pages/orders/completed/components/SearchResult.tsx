import {
  Table,
  TableBody,
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

import { Order } from "@/types/models"
import { useState } from "react"
import { useQueryParams } from "../hooks/useQueryParams"
export function SearchResult() {
  const { startDate, endDate, status: initialStatus } = useQueryParams()

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "F251232323-12321323",
      name: "보쌈정식(배추김치) 외 1개",
      status: "NEW",
      type: "DELIVERY",
      time: 1736938800,
      totalPrice: 21900,
      totalItems: 12,
      details: [
        {
          id: "6f93ea92-e26e-41fc-8f09-29de608340f0",
          price: 12900,
          menuName: "[주문폭주] 투움바 파스타 1",
          quantity: 1,
          menuPrice: 12400,
          optionGroups: [
            {
              id: "7b93ea92-e26e-12ab-8f09-29de608340n1",
              name: "피클 선택",
              options: [
                {
                  id: "9a45ea92-e26e-12ab-8f09-29de608340n1",
                  name: "상큼한 피클",
                  price: 500,
                },
              ],
            },
          ],
        },
      ],
    },
  ])
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
      {/* TODO: 검색버튼 클릭 시, 페이지 클릭 시 필터내용을 쿼리파라미터로 변환해 검색 */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
