import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { format } from "date-fns"
import { DateRange } from "react-day-picker"

import { Button } from "@/components/Button"
import { DatePickerWithRange } from "@/components/DatePicker"
import { OrderStatus } from "@/types/common"
import { useQueryParams } from "../hooks/useQueryParams"
import { ROUTES } from "@/routes"
import { orderStatusLabels } from "@/constants/order"
import { Checkbox } from "@radix-ui/react-checkbox"
import { Tabs, TabsList } from "@/components/shadcn/tabs"
import { TabsTrigger } from "@radix-ui/react-tabs"
import { RotateCcw } from "lucide-react"

export function SearchFilter() {
  const navigate = useNavigate()
  const { startDate, endDate, status: initialStatus } = useQueryParams()

  const [date, setDate] = useState<DateRange | undefined>(undefined)
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | undefined>(undefined)

  const handleStatusChange = (value: OrderStatus | undefined) => {
    setSelectedStatus(value)
  }

  const handleClickSearchButton = () => {}

  const handleResetFilter = () => {
    // 필터 초기화: 날짜와 상태를 초기 상태로 설정
    setDate(undefined)
    setSelectedStatus(undefined)
  }

  useEffect(() => {
    const queryParams = new URLSearchParams()

    if (date?.from) queryParams.set("startDate", format(date.from, "yyyy-MM-dd"))
    if (date?.to) queryParams.set("endDate", format(date.to, "yyyy-MM-dd"))
    if (selectedStatus) queryParams.set("status", selectedStatus)

    const queryString = queryParams.toString()

    navigate(`${ROUTES.COMPLETED_ORDER}?${queryString}`)
  }, [date, selectedStatus])

  useEffect(() => {
    const initialDate: DateRange = {
      from: startDate ? new Date(startDate) : undefined,
      to: endDate ? new Date(endDate) : undefined,
    }
    setDate(initialDate)

    if (initialStatus) {
      setSelectedStatus(initialStatus)
    }
  }, [])

  return (
    <div>
      <div className="flex items-center mb-4 gap-10">
        <div className="text-base">주문일시</div>
        <DatePickerWithRange date={date} onSelect={setDate} />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-10">
          <div className="text-base">주문상태</div>
          <div className="flex flex-wrap">
            <Tabs
              defaultValue="all"
              className="w-[400px]"
              onValueChange={(value) => {
                if (value === "all") {
                  handleStatusChange(undefined)
                } else {
                  handleStatusChange(value as OrderStatus)
                }
              }}
              value={selectedStatus || "all"}
            >
              <TabsList className="grid w-full grid-cols-4 bg-muted p-1 rounded-lg h-10">
                <TabsTrigger
                  value="all"
                  className="h-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-sm font-medium transition-all"
                >
                  전체
                </TabsTrigger>
                {Object.entries(orderStatusLabels).map(([key, label]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="h-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-sm font-medium transition-all"
                  >
                    {label}
                  </TabsTrigger>
                ))}
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
