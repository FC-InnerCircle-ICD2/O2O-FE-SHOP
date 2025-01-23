import { useEffect, useState } from "react"
import { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import { DatePickerWithRange } from "@/components/DatePicker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select"
import { Button } from "@/components/Button"
import { orderStatusLabels } from "@/constants/order"
import { OrderStatus } from "@/types/common"
import { useQueryParams } from "../hooks/useQueryParams" // 훅을 가져옵니다.

export function SearchFilter() {
  const navigate = useNavigate()
  const { startDate, endDate, status: initialStatus } = useQueryParams()

  const [date, setDate] = useState<DateRange | undefined>()
  const [status, setStatus] = useState<OrderStatus | undefined>()

  useEffect(() => {
    if (startDate || endDate) {
      setDate({
        from: startDate ? new Date(startDate) : undefined,
        to: endDate ? new Date(endDate) : undefined,
      })
    }

    if (initialStatus) {
      setStatus(initialStatus)
    }
  }, [startDate, endDate, initialStatus])

  const handleClickSearchButton = () => {
    const queryParams: Record<string, string> = {}

    if (date?.from) queryParams.startDate = format(date.from, "yyyy-MM-dd")
    if (date?.to) queryParams.endDate = format(date.to, "yyyy-MM-dd")
    if (status) queryParams.status = status

    const queryString = new URLSearchParams(queryParams).toString()
    navigate(`/orders/completed?${queryString}`)
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="text-base mr-4">주문일시</div>
        <DatePickerWithRange date={date} onSelect={setDate} />
      </div>

      <div className="flex items-center ">
        <div className="text-base mr-4">주문상태</div>
        <Select value={status} onValueChange={(e) => setStatus(e as OrderStatus)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="주문상태" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(orderStatusLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-8">
        <Button onClick={handleClickSearchButton}>조회</Button>
      </div>
    </div>
  )
}
