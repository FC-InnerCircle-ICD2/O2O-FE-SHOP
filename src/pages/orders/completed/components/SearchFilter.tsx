import { useState } from "react"
import { DateRange } from "react-day-picker"
import { subDays } from "date-fns"
import { DatePickerWithRange } from "@/components/DatePicker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select"
import { Button } from "@/components/shadcn/button"
type OrderStatus = "완료" | "취소"
export function SearchFilter() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })
  const [status, setStatus] = useState<OrderStatus>()
  const handleClickSearchButton = () => {
    console.log("searched")
  }
  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="text-xl mr-4">주문일시</div>
        <DatePickerWithRange date={date} onSelect={setDate} />
      </div>
      <div className="flex items-center">
        <div className="text-xl mr-4">주문상태</div>
        <Select value={status} onValueChange={(e) => setStatus(e as OrderStatus)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="주문상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="완료">완료</SelectItem>
            <SelectItem value="취소">취소</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleClickSearchButton}>조회</Button>
    </div>
  )
}
