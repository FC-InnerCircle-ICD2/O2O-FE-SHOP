import { useEffect, useState } from "react"
import { DateRange } from "react-day-picker"
import { subDays, format } from "date-fns"
import { useSearchParams, useNavigate } from "react-router-dom"
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

export function SearchFilter() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // 기본 상태값 설정
  const [date, setDate] = useState<DateRange | undefined>()
  const [status, setStatus] = useState<OrderStatus | undefined>()

  useEffect(() => {
    // URL 쿼리 파라미터 읽어서 상태 업데이트
    const startDate = searchParams.get("start_date")
    const endDate = searchParams.get("end_date")
    const statusParam = searchParams.get("status") as OrderStatus | null

    if (startDate || endDate) {
      setDate((prev) => ({
        ...prev,
        from: startDate ? new Date(startDate) : prev?.from,
        to: endDate ? new Date(endDate) : prev?.to,
      }))
    }
    
    if (statusParam) {
      setStatus(statusParam)
    }
  }, [searchParams])

  const handleClickSearchButton = () => {
    const queryParams: Record<string, string> = {}

    if (date?.from) queryParams.start_date = format(date.from, "yyyy-MM-dd")
    if (date?.to) queryParams.end_date = format(date.to, "yyyy-MM-dd")
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
