"use client"

import { DatePickerWithRange } from "@/components/DatePicker"
import { Card } from "@/components/shadcn/card"
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { DateRange } from "react-day-picker"

interface SearchFilterProps {
  filter: { date: DateRange | undefined; type: "SALES" | "ORDERS" }
  onFilterChange: (key: string, value: DateRange | "SALES" | "ORDERS") => void
}

const SearchFilter = ({ filter, onFilterChange }: SearchFilterProps) => {
  const handleDateChange = (date: DateRange | undefined) => {
    if (!date) return
    onFilterChange("date", date)
  }

  const handleTypeChange = (type: "SALES" | "ORDERS") => {
    onFilterChange("type", type)
  }

  return (
    <Card className="flex flex-col gap-4 bg-white py-4 px-6 rounded-lg">
      <div className="flex items-center gap-10">
        <div className="text-base">기간 선택</div>
        <DatePickerWithRange date={filter.date} onSelect={handleDateChange} />
      </div>
      <div className="flex flex-wrap">
        <Tabs
          defaultValue={"SALES"}
          className="w-full"
          onValueChange={(value) => {
            if (value === "SALES") {
              handleTypeChange("SALES")
            } else {
              handleTypeChange("ORDERS")
            }
          }}
          value={filter.type}
        >
          <TabsList className="grid w-full grid-cols-2 bg-muted p-1 rounded-lg h-[3rem]">
            <TabsTrigger
              value={"SALES"}
              className="h-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-sm font-medium transition-all"
            >
              매출 분석
            </TabsTrigger>
            <TabsTrigger
              value={"ORDERS"}
              className="h-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-sm font-medium transition-all"
            >
              주문 분석
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </Card>
  )
}

export default SearchFilter
