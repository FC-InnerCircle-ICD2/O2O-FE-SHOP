import { Button } from "@/components/Button"
import { DatePickerWithRange } from "@/components/DatePicker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { DateRange } from "react-day-picker"
import { useNavigate } from "react-router-dom"
import { useQueryParams } from "../hooks/useQueryParams"
import { SortOrder } from "@/types/common"
import { ROUTES } from "@/routes"

export const ReviewFilters = () => {
  const { startDate, endDate, order: initialOrder } = useQueryParams()

  const navigate = useNavigate()
  const [date, setDate] = useState<DateRange | undefined>()
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest")

  useEffect(() => {
    const initialDate: DateRange = {
      from: startDate ? new Date(startDate) : undefined,
      to: endDate ? new Date(endDate) : undefined,
    }
    setDate(initialDate)
  }, [startDate, endDate])

  useEffect(() => {
    if (initialOrder) {
      setSortOrder(initialOrder)
    }
  }, [initialOrder])

  const handleClickSearchButton = () => {
    const queryParams = new URLSearchParams()

    if (date?.from) queryParams.set("startDate", format(date.from, "yyyy-MM-dd"))
    if (date?.to) queryParams.set("endDate", format(date.to, "yyyy-MM-dd"))
    if (sortOrder) queryParams.set("order", sortOrder)

    const queryString = queryParams.toString()
    navigate(`${ROUTES.SHOP_REVIEW}?${queryString}`)
  }
  return (
    <div>
      <div className="flex gap-4">
        <Select value={sortOrder} onValueChange={(o) => setSortOrder(o as SortOrder)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="정렬기준" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">최신순</SelectItem>
            <SelectItem value="rating">별점순</SelectItem>
          </SelectContent>
        </Select>
        <DatePickerWithRange date={date} onSelect={setDate} />
      </div>

      <Button
        variant={"contained"}
        color={"primary"}
        className="mt-4"
        onClick={handleClickSearchButton}
      >
        리뷰 조회
      </Button>
    </div>
  )
}
