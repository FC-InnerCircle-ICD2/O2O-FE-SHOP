import { DatePickerWithRange } from "@/components/DatePicker"
import { Card } from "@/components/shadcn/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs"
import { cn } from "@/lib/utils"
import { SortOrder } from "@/types/common"
import { format } from "date-fns"
import { useEffect, useRef, useState } from "react"
import { DateRange } from "react-day-picker"
import { useQueryParams } from "../hooks/useQueryParams"

export const ReviewFilters = () => {
  const { startDate, endDate, order, answerType, setQueryParams } = useQueryParams()

  const stickyRef = useRef<HTMLDivElement>(null)
  const [isSticky, setIsSticky] = useState(false)
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

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    if (stickyRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (timeoutId) return

            if (entry.isIntersecting) {
              setIsSticky(false)
            } else {
              setIsSticky(true)
            }

            timeoutId = setTimeout(() => {
              timeoutId = null
            }, 100)
          })
        },
        {
          rootMargin: "0px",
          threshold: 1,
        },
      )

      observer.observe(stickyRef.current)

      return () => {
        observer.disconnect()
        if (timeoutId) {
          clearTimeout(timeoutId)
        }
      }
    }
  }, [])

  return (
    <Card
      ref={stickyRef}
      className={cn(
        "flex flex-col gap-4 sticky -top-7 z-10 p-6 bg-white rounded-lg transition-all duration-200 ease-in-out",
        isSticky && "shadow-lg rounded-none p-4 flex-row items-center -ml-8 -mr-8",
      )}
    >
      <div className="flex gap-4">
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
        className="w-full"
        value={currentAnswerType}
        onValueChange={(value: string) => {
          handleAnswerTypeChange(value as "all" | "unAnswered")
        }}
      >
        <TabsList className={cn("flex gap-2 w-full h-[3rem]", isSticky && "h-[2rem]")}>
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
    </Card>
  )
}
