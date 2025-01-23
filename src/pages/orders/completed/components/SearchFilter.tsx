import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { format } from "date-fns"
import { DateRange } from "react-day-picker"

import { Button } from "@/components/Button"
import { Checkbox } from "@/components/shadcn/checkbox"
import { DatePickerWithRange } from "@/components/DatePicker"
import { OrderStatus } from "@/types/common"
import { orderStatusLabels } from "@/constants/order"
import { useQueryParams } from "../hooks/useQueryParams"

export function SearchFilter() {
  const navigate = useNavigate()
  const { startDate, endDate, status: initialStatus } = useQueryParams()

  const [date, setDate] = useState<DateRange | undefined>()
  const [selectedStatuses, setSelectedStatuses] = useState<OrderStatus[]>([])

  useEffect(() => {
    const initialDate: DateRange = {
      from: startDate ? new Date(startDate) : undefined,
      to: endDate ? new Date(endDate) : undefined,
    }
    setDate(initialDate)
  }, [startDate, endDate])

  useEffect(() => {
    if (initialStatus) {
      setSelectedStatuses(initialStatus)
    }
  }, [initialStatus])

  const handleStatusChange = (value: OrderStatus) => {
    setSelectedStatuses((prevStatuses) =>
      prevStatuses.includes(value)
        ? prevStatuses.filter((status) => status !== value)
        : [...prevStatuses, value],
    )
  }

  const handleClickSearchButton = () => {
    const queryParams = new URLSearchParams()

    if (date?.from) queryParams.set("startDate", format(date.from, "yyyy-MM-dd"))
    if (date?.to) queryParams.set("endDate", format(date.to, "yyyy-MM-dd"))
    selectedStatuses.forEach((status) => queryParams.append("status", status))

    const queryString = queryParams.toString()
    navigate(`/orders/completed?${queryString}`)
  }

  const handleResetFilter = () => {
    // 필터 초기화: 날짜와 상태를 초기 상태로 설정
    setDate(undefined)
    setSelectedStatuses([])
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="text-base mr-4">주문일시</div>
        <DatePickerWithRange date={date} onSelect={setDate} />
      </div>

      <div className="flex items-center mb-4">
        <div className="text-base mr-4">주문상태</div>
        <div className="flex flex-wrap">
          {Object.entries(orderStatusLabels).map(([key, label]) => (
            <div key={key} className="mr-4">
              <Checkbox
                id={key}
                checked={selectedStatuses.includes(key as OrderStatus)}
                onCheckedChange={() => handleStatusChange(key as OrderStatus)}
              />
              <label htmlFor={key}>{label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Button onClick={handleResetFilter} variant={"grayFit"}>
          초기화
        </Button>
        <Button onClick={handleClickSearchButton}>조회</Button>
      </div>
    </div>
  )
}
