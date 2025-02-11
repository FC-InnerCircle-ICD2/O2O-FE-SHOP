import { useState } from "react"

import { format } from "date-fns"
import { DateRange } from "react-day-picker"

import { DatePickerWithRange } from "@/components/DatePicker"
import { Tabs, TabsList } from "@/components/shadcn/tabs"
import { orderStatusLabels } from "@/constants/order"
import { OrderStatus } from "@/types/common"
import { TabsTrigger } from "@radix-ui/react-tabs"
import { RotateCcw } from "lucide-react"
import { useOrdersParams } from "../hooks/useQueryParams"

const ALL_STATUS = "CANCEL,DONE"

export function SearchFilter() {
  const { startDate, endDate, status: initialStatus, setQueryParams } = useOrdersParams()

  const [date, setDate] = useState<DateRange | undefined>({
    from: startDate ? new Date(startDate) : undefined,
    to: endDate ? new Date(endDate) : undefined,
  })
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | string>(
    initialStatus || ALL_STATUS,
  )

  const handleStatusChange = (value: OrderStatus | string) => {
    setSelectedStatus(value)

    setQueryParams({
      startDate: date?.from ? format(date.from, "yyyy-MM-dd") : "",
      endDate: date?.to ? format(date.to, "yyyy-MM-dd") : "",
      status: value,
      page: 0,
      size: 10,
    })
  }

  const handleDateChange = (date: DateRange | undefined) => {
    setDate(date)

    setQueryParams({
      startDate: date?.from ? format(date.from, "yyyy-MM-dd") : "",
      endDate: date?.to ? format(date.to, "yyyy-MM-dd") : "",
      status: selectedStatus,
      page: 0,
      size: 10,
    })
  }

  const handleResetFilter = () => {
    // 필터 초기화: 날짜와 상태를 초기 상태로 설정
    setDate(undefined)
    setSelectedStatus(ALL_STATUS)

    setQueryParams({
      startDate: "",
      endDate: "",
      status: ALL_STATUS,
      page: 0,
      size: 10,
    })
  }

  return (
    <div>
      <div className="flex items-center mb-4 gap-10">
        <div className="text-base">주문일시</div>
        <DatePickerWithRange date={date} onSelect={handleDateChange} />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-10">
          <div className="text-base">주문상태</div>
          <div className="flex flex-wrap">
            <Tabs
              defaultValue={ALL_STATUS}
              className="w-[400px]"
              onValueChange={(value) => {
                if (value === "all") {
                  handleStatusChange(ALL_STATUS)
                } else {
                  handleStatusChange(value as OrderStatus)
                }
              }}
              value={selectedStatus || ALL_STATUS}
            >
              <TabsList className="grid w-full grid-cols-3 bg-muted p-1 rounded-lg h-10">
                <TabsTrigger
                  value={ALL_STATUS}
                  className="h-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-sm font-medium transition-all"
                >
                  전체
                </TabsTrigger>
                <TabsTrigger
                  value={"DONE"}
                  className="h-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-sm font-medium transition-all"
                >
                  {orderStatusLabels["DONE"]}
                </TabsTrigger>
                <TabsTrigger
                  value={"CANCEL"}
                  className="h-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-sm font-medium transition-all"
                >
                  {orderStatusLabels["CANCEL"]}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <div className="cursor-pointer" onClick={handleResetFilter}>
          <RotateCcw className="w-5 h-5 text-gray-600" />
        </div>
      </div>
    </div>
  )
}
