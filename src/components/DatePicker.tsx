"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import * as React from "react"
import { DateRange } from "react-day-picker"

import { Button } from "@/components/shadcn/button"
import { Calendar } from "@/components/shadcn/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/popover"
import { cn } from "@/lib/utils"

export type DatePickerProps = {
  date: DateRange | undefined
  onSelect: (date: DateRange | undefined) => void
}
export function DatePickerWithRange({ date, onSelect }: DatePickerProps) {
  const [tempDate, setTempDate] = React.useState<DateRange | undefined>(date)
  const [open, setOpen] = React.useState(false)

  return (
    <div className="grid gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal bg-white",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "yyyy-MM-dd")} ~ {format(date.to, "yyyy-MM-dd")}
                </>
              ) : (
                format(date.from, "yyyy-MM-dd")
              )
            ) : (
              <span>날짜 선택</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={tempDate?.from}
            selected={tempDate}
            onSelect={setTempDate}
            numberOfMonths={2}
          />
          <div className="flex justify-end gap-2 p-3">
            <Button
              variant="outline"
              onClick={() => {
                setTempDate(date)
                setOpen(false)
              }}
            >
              취소
            </Button>
            <Button
              onClick={() => {
                onSelect(tempDate)
                setOpen(false)
              }}
            >
              확인
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
