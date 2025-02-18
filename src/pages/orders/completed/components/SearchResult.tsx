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
import Label from "@/components/Label"
import { Card } from "@/components/shadcn/card"
import { orderStatusLabels } from "@/constants/order"
import useModal from "@/hooks/useModal"
import { OrderDto } from "@/types/dtos"
import { formatDateTime } from "@/utils/format"
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
    status = "REFUSE,DONE",
  } = useOrdersParams()

  const [pagination, setPagination] = useState<TPagination>(DEFAULT_PAGINATION)
  const [params, setParams] = useState<OrdersParams | undefined>(undefined)

  const { data, isPending } = useGetOrders(params)

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
    <Card className="px-6 pt-2 pb-4 rounded-lg bg-white w-full h-fit">
      <Table>
        <colgroup>
          <col width="15%" />
          <col width="10%" />
          <col width="45%" />
          <col width="15%" />
          <col width="15%" />
        </colgroup>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">주문번호</TableHead>
            <TableHead className="text-center">상태</TableHead>
            <TableHead className="text-center">메뉴</TableHead>
            <TableHead className="text-center">주문금액</TableHead>
            <TableHead className="text-center">주문시각</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              </TableCell>
            </TableRow>
          ) : data && data.content.length > 0 ? (
            data.content.map((order, key) => (
              <TableRow key={key} onClick={() => handleRowClick(order)}>
                <TableCell className="min-w-[180px] text-left text-[15px] leading-[15px] py-3 text-gray-800">
                  {order.orderId}
                </TableCell>
                <TableCell className="min-w-[80px] text-center text-base py-3 text-gray-800">
                  <Label
                    status={order.orderStatus === "DONE" ? "done" : "refuse"}
                    value={orderStatusLabels[order.orderStatus]}
                  />
                </TableCell>
                <TableCell className="max-w-[720px] text-center text-base truncate py-3 text-gray-800">
                  {order.orderMenuInquiryResponses[0].menuName}{" "}
                  <span className="text-sm text-gray-500">
                    [
                    {order.orderMenuInquiryResponses[0].orderMenuOptionGroupInquiryResponses
                      .map(
                        (options) =>
                          `${
                            options.orderMenuOptionGroupName
                          }: ${options.orderMenuOptionInquiryResponses
                            .map((res) => res.menuOptionName)
                            .join(",")}`,
                      )
                      .join("/")}
                    ]
                  </span>
                </TableCell>
                <TableCell className="min-w-[100px] text-base text-center py-3 text-gray-800">
                  {order.totalPrice.toLocaleString()}{" "}
                  <span className="text-xs font-medium">원</span>
                </TableCell>
                <TableCell className="min-w-[150px] text-center text-[15px] leading-[15px] text-gray-800 py-3">
                  {formatDateTime(order.orderTime)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="p-6 text-center">
                검색 결과가 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {data && data.content.length > 0 && (
        <PaginationComponent
          pagination={{
            currentPage: data.currentPage,
            hasNext: data.hasNext,
            totalItems: data.totalItems,
            totalPages: data.totalPages,
          }}
        />
      )}
    </Card>
  )
}
