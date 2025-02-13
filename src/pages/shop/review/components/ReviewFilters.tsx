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
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs"

export const ReviewFilters = () => {
  const { startDate, endDate, order, answerType, setQueryParams } = useQueryParams()

  const navigate = useNavigate()
  const [date, setDate] = useState<DateRange | undefined>({
    from: startDate ? new Date(startDate) : undefined,
    to: endDate ? new Date(endDate) : undefined,
  })
  const [sortOrder, setSortOrder] = useState<SortOrder>(order || "latest")
  const [currentAnswerType, setCurrentAnswerType] = useState<"all" | "unAnswered">(
    answerType || "all",
  )

  const handleDateChange = (value: DateRange | undefined) => {
    setDate(value)

    setQueryParams({
      startDate: value?.from ? format(value.from, "yyyy-MM-dd") : "",
      endDate: value?.to ? format(value.to, "yyyy-MM-dd") : "",
      order: sortOrder,
      answerType: currentAnswerType,
    })
  }

  const handleSortOrderChange = (value: SortOrder) => {
    setSortOrder(value)

    setQueryParams({
      startDate: date?.from ? format(date.from, "yyyy-MM-dd") : "",
      endDate: date?.to ? format(date.to, "yyyy-MM-dd") : "",
      order: value,
      answerType: currentAnswerType,
    })
  }

  const handleAnswerTypeChange = (value: "all" | "unAnswered") => {
    setCurrentAnswerType(value)

    setQueryParams({
      startDate: date?.from ? format(date.from, "yyyy-MM-dd") : "",
      endDate: date?.to ? format(date.to, "yyyy-MM-dd") : "",
      order: sortOrder,
      answerType: value,
    })
  }

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="flex gap-4 pb-5">
        <Select value={sortOrder} onValueChange={(o) => handleSortOrderChange(o as SortOrder)}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="정렬기준" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">최신순</SelectItem>
            <SelectItem value="rating">별점순</SelectItem>
          </SelectContent>
        </Select>
        <DatePickerWithRange date={date} onSelect={handleDateChange} />
      </div>
      <Tabs
        defaultValue="all"
        value={currentAnswerType}
        onValueChange={(value: string) => {
          handleAnswerTypeChange(value as "all" | "unAnswered")
        }}
      >
        <TabsList className="flex gap-2 w-full h-[3rem]">
          <TabsTrigger
            value="all"
            className="w-1/2 h-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-sm font-medium transition-all"
          >
            전체
          </TabsTrigger>
          <TabsTrigger
            value="unAnswered"
            className="w-1/2 h-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-sm font-medium transition-all"
          >
            미답변
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
