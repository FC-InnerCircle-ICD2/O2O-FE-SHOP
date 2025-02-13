import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table"
import { DEFAULT_PAGINATION } from "@/constants"
import { Pagination as TPagination } from "@/types/common"
import { useEffect, useState } from "react"

import useGetOrders, { OrdersParams } from "@/apis/useGetOrders"
import useModal from "@/hooks/useModal"
import { OrderDto } from "@/types/dtos"
import { useOrdersParams } from "../hooks/useQueryParams"
import OrderDetail from "./OrderDetail"
import { PaginationComponent } from "./Pagination"

export function SearchResult() {
  const { show } = useModal()
  const {
    page = 0,
    size = 10,
    startDate = "",
    endDate = "",
    status = "CANCEL,DONE",
  } = useOrdersParams()

  const [pagination, setPagination] = useState<TPagination>(DEFAULT_PAGINATION)
  const [params, setParams] = useState<OrdersParams | undefined>(undefined)

  const { data, isLoading } = useGetOrders(params)

  const handleRowClick = (order: OrderDto) => {
    show({
      content: <OrderDetail order={order} />,
      useAnimation: true,
    })
  }

  useEffect(() => {
    const params = {
      page,
      size,
      startDate,
      endDate,
      status,
    }

    setParams(params)
  }, [page, size, startDate, endDate, status])

  return (
    <div className="p-6 rounded-lg bg-white w-full">
      <Table>
        <colgroup>
          <col width="20%" />
          <col width="10%" />
          <col width="55%" />
          <col width="15%" />
        </colgroup>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">주문시각</TableHead>
            <TableHead className="text-center">상태</TableHead>
            <TableHead className="text-center">메뉴</TableHead>
            <TableHead className="text-center">주문금액</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.content.length > 0 ? (
            data.content.map((order, key) => (
              <TableRow key={key} onClick={() => handleRowClick(order)}>
                <TableCell className="font-medium text-center">{order.orderTime}</TableCell>
                <TableCell className="text-center">{order.orderStatus}</TableCell>
                <TableCell className="text-center">{order.orderName}</TableCell>
                <TableCell className="text-center">{order.totalPrice}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                주문이 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {data && data.content.length > 0 && (
        <>
          <PaginationComponent pagination={pagination} />
        </>
      )}
    </div>
  )
}
