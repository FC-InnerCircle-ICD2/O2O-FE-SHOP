"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts"

import { DashboardData, DashboardParams } from "@/apis/useGetDashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/chart"
import { useEffect, useState } from "react"

const CHART_COLORS = [
  "#6366F1", // indigo-500 - 중간 파랑
  "#10B981", // emerald-500 - 중간 녹색
  "#EF4444", // red-500 - 중간 빨강
  "#F59E0B", // amber-500 - 중간 주황
  "#EC4899", // pink-500 - 중간 핑크
  "#64748B", // slate-500 - 중간 슬레이트 블루 (기타 항목용)
]

const chartConfig = {
  orders: {
    label: "주문",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface OrderChartProps {
  filter: DashboardParams
  data: DashboardData[]
}

const OrderChart = ({ filter, data }: OrderChartProps) => {
  const [dailyData, setDailyData] = useState<{ date: string; orders: number }[]>([])
  const [timeData, setTimeData] = useState<{ time: string; orders: number }[]>([])
  const [dayData, setDayData] = useState<{ day: string; orders: number }[]>([])
  const [menuData, setMenuData] = useState<{ menu: string; orders: number }[]>([])
  const [menuConfig, setMenuConfig] = useState<ChartConfig>({})

  useEffect(() => {
    if (!data || !filter.date?.from || !filter.date?.to) return

    // startDate부터 endDate까지의 날짜 배열 생성
    const start = new Date(filter.date.from)
    const end = new Date(filter.date.to)
    const dateArray = []
    const currentDate = new Date(start)

    while (currentDate <= end) {
      dateArray.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }

    // 각 날짜별 주문 건수 계산
    const dailyOrdersData = dateArray.map((date) => {
      const dayStart = new Date(date.setHours(0, 0, 0, 0))
      const dayEnd = new Date(date.setHours(23, 59, 59, 999))

      const dayOrders = data.filter((order) => {
        const orderDate = new Date(order.orderTime)
        return orderDate >= dayStart && orderDate <= dayEnd
      })

      return {
        date: date.toISOString().split("T")[0],
        orders: dayOrders.length,
      }
    })

    // 시간대별 주문 건수 계산
    const hourlyData: { [key: string]: number } = {}
    // 0시부터 23시까지 초기화
    for (let i = 0; i < 24; i++) {
      hourlyData[`${String(i).padStart(2, "0")}:00`] = 0
    }

    data.forEach((order) => {
      const orderDate = new Date(order.orderTime)
      const hour = String(orderDate.getHours()).padStart(2, "0")
      hourlyData[`${hour}:00`] += 1
    })

    const timeSeriesData = Object.entries(hourlyData).map(([time, orders]) => ({
      time,
      orders,
    }))

    // 요일별 주문 건수 계산
    const dayOfWeekData: { [key: string]: number } = {
      월요일: 0,
      화요일: 0,
      수요일: 0,
      목요일: 0,
      금요일: 0,
      토요일: 0,
      일요일: 0,
    }

    data.forEach((order) => {
      const orderDate = new Date(order.orderTime)
      const dayIndex = orderDate.getDay() // 0 = 일요일, 1 = 월요일, ..., 6 = 토요일
      // 월요일부터 시작하는 요일 배열로 변환 (1, 2, 3, 4, 5, 6, 0) -> (0, 1, 2, 3, 4, 5, 6)
      const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1
      const days = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"]
      const dayOfWeek = days[adjustedIndex]
      dayOfWeekData[dayOfWeek] += 1
    })

    const dayOfWeekSeries = [
      { day: "월요일", orders: dayOfWeekData["월요일"] },
      { day: "화요일", orders: dayOfWeekData["화요일"] },
      { day: "수요일", orders: dayOfWeekData["수요일"] },
      { day: "목요일", orders: dayOfWeekData["목요일"] },
      { day: "금요일", orders: dayOfWeekData["금요일"] },
      { day: "토요일", orders: dayOfWeekData["토요일"] },
      { day: "일요일", orders: dayOfWeekData["일요일"] },
    ]

    // 메뉴별 주문 건수 계산
    const menuOrdersData: { [key: string]: number } = {}

    data.forEach((order) => {
      if (!menuOrdersData[order.menu]) {
        menuOrdersData[order.menu] = 0
      }
      menuOrdersData[order.menu] += 1
    })

    const menuSeries = Object.entries(menuOrdersData)
      .sort((a, b) => b[1] - a[1]) // 주문 건수 기준 내림차순 정렬
      .map(([menu, orders]) => ({
        menu,
        orders,
      }))

    // 메뉴별 차트 설정 업데이트
    const updatedMenuConfig = menuSeries.reduce((config, item, index) => {
      config[item.menu] = {
        label: item.menu,
        color: CHART_COLORS[index % CHART_COLORS.length],
      }
      return config
    }, {} as ChartConfig)

    setDailyData(dailyOrdersData)
    setTimeData(timeSeriesData)
    setDayData(dayOfWeekSeries)
    setMenuData(menuSeries)
    setMenuConfig(updatedMenuConfig)
  }, [data, filter])

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>일별 주문 그래프</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <AreaChart data={dailyData}>
              <defs>
                <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.15} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(
                    date.getDate(),
                  ).padStart(2, "0")}`
                }}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis
                tickFormatter={(value) => `${value}건`}
                width={50}
                stroke="hsl(var(--muted-foreground))"
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    }}
                    formatter={(value) => `${value}건`}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="orders"
                type="monotone"
                stroke="#1d4ed8"
                strokeWidth={1}
                fill="url(#fillGradient)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>시간대별 주문 그래프</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <BarChart
              accessibilityLayer
              data={timeData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
              />
              <YAxis
                tickFormatter={(value) => `${value}건`}
                width={50}
                stroke="hsl(var(--muted-foreground))"
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="orders"
                    labelFormatter={(value) => {
                      const [hours] = value.split(":")
                      return `${hours.padStart(2, "0")}:00`
                    }}
                    formatter={(value) => `${value}건`}
                    indicator="dot"
                  />
                }
              />
              <Bar dataKey={"orders"} fill="url(#timeBarGradient)" />
              <defs>
                <linearGradient id="timeBarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14B8A6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#2DD4BF" stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Card className="flex-1 w-[50%]">
          <CardHeader className="items-center pb-0">
            <CardTitle>요일별 주문 그래프</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer config={chartConfig} className="mx-auto h-[400px] w-full">
              <BarChart data={dayData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                  tickFormatter={(value) => `${value}건`}
                  width={50}
                  stroke="hsl(var(--muted-foreground))"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent formatter={(value) => `${value}건`} />}
                />
                <Bar dataKey="orders" fill="url(#dayBarGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="dayBarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#FCD34D" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="flex flex-col w-[50%]">
          <CardHeader className="items-center pb-0">
            <CardTitle>메뉴별 주문 비중</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={menuConfig}
              className="mx-auto aspect-square max-h-[400px] h-[400px]"
            >
              <PieChart margin={{ top: 30, right: 10, bottom: 40, left: 10 }}>
                <defs>
                  {CHART_COLORS.map((color, index) => (
                    <linearGradient
                      key={`gradient-${index}`}
                      id={`pieGradient-${index}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={color} stopOpacity={0.6} />
                    </linearGradient>
                  ))}
                </defs>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      indicator="dot"
                      labelFormatter={(value, entry) => {
                        return entry[0].name
                      }}
                      formatter={(value, name, entry) => {
                        const total = menuData.reduce((sum, item) => sum + item.orders, 0)
                        const percent = (((value as number) / total) * 100).toFixed(0)
                        return [`${value}건 (${percent}%)`]
                      }}
                    />
                  }
                />
                <Pie
                  data={menuData}
                  dataKey="orders"
                  nameKey="menu"
                  cx="50%"
                  cy="45%"
                  outerRadius={120}
                  label={false}
                  activeShape={{ stroke: "white", strokeWidth: 1, opacity: 1 }}
                >
                  {menuData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`url(#pieGradient-${index})`} />
                  ))}
                </Pie>
                <Legend
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                  formatter={(value) => value}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OrderChart
