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
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/chart"
import { DashboardData } from "@/constants/dashboard"
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
  price: {
    label: "매출",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface SalesChartProps {
  data: DashboardData[]
}

const SalesChart = ({ data }: SalesChartProps) => {
  const [timeRange, setTimeRange] = useState("90d")
  const [dailyData, setDailyData] = useState<{ date: string; price: number }[]>([])
  const [timeData, setTimeData] = useState<{ time: string; price: number }[]>([])
  const [dayData, setDayData] = useState<{ day: string; price: number }[]>([])
  const [menuData, setMenuData] = useState<{ menu: string; price: number }[]>([])
  const [menuConfig, setMenuConfig] = useState<ChartConfig>({})
  useEffect(() => {
    // 데이터를 날짜별로 그룹화하고 매출 합계 계산
    const groupedData = data.reduce((acc, curr) => {
      const date = new Date(curr.orderTime).toISOString().split("T")[0]
      if (!acc[date]) {
        acc[date] = 0
      }
      acc[date] += curr.price
      return acc
    }, {} as Record<string, number>)

    // 날짜순으로 정렬된 배열로 변환
    const sortedData = Object.entries(groupedData)
      .map(([date, price]) => ({ date, price }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    setDailyData(sortedData)

    // 시간대별 매출 데이터 처리
    const timeData = data
      .map((item) => {
        const date = new Date(item.orderTime)
        const hours = date.getHours()
        return { time: `${hours}:00`, price: item.price }
      })
      .reduce((acc, curr) => {
        if (!acc[curr.time]) {
          acc[curr.time] = 0
        }
        acc[curr.time] += curr.price
        return acc
      }, {} as Record<string, number>)

    const sortedTimeData = Object.entries(timeData)
      .map(([time, price]) => ({
        time,
        price,
        hour: parseInt(time.split(":")[0]),
      }))
      .sort((a, b) => a.hour - b.hour)
      .map(({ time, price }) => ({ time, price }))

    setTimeData(sortedTimeData)

    // 요일별 매출 데이터 처리
    const dayOrder = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"]
    const dayData = data.reduce((acc, curr) => {
      const day = new Date(curr.orderTime).toLocaleDateString("ko-KR", { weekday: "long" })
      if (!acc[day]) {
        acc[day] = 0
      }
      acc[day] += curr.price
      return acc
    }, {} as Record<string, number>)

    // 요일 순서대로 정렬
    const sortedDayData = dayOrder.map((day) => ({
      day,
      price: dayData[day] || 0,
    }))

    setDayData(sortedDayData)

    // 메뉴별 매출 데이터 처리
    const menuData = data.reduce((acc, curr) => {
      if (!acc[curr.menu]) {
        acc[curr.menu] = 0
      }
      acc[curr.menu] += curr.price
      return acc
    }, {} as Record<string, number>)

    let sortedMenuData = Object.entries(menuData)
      .map(([menu, price]) => ({ menu, price }))
      .sort((a, b) => b.price - a.price)

    // 6개 이상일 경우 상위 5개를 제외한 나머지를 'Others'로 통합
    if (sortedMenuData.length > 5) {
      const top5 = sortedMenuData.slice(0, 5)
      const others = sortedMenuData.slice(5)
      const othersTotal = others.reduce((sum, item) => sum + item.price, 0)

      sortedMenuData = [...top5, { menu: "기타", price: othersTotal }]
    }

    setMenuData(sortedMenuData)

    const menuConfig = sortedMenuData.reduce(
      (acc, item, index) => ({
        ...acc,
        [item.menu]: {
          label: item.menu,
          color: CHART_COLORS[index % CHART_COLORS.length],
        },
      }),
      {},
    ) as ChartConfig

    setMenuConfig(menuConfig)
  }, [data])

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>일별 매출 그래프</CardTitle>
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
                tickFormatter={(value) =>
                  new Intl.NumberFormat("ko-KR", {
                    style: "currency",
                    currency: "KRW",
                    maximumFractionDigits: 0,
                  }).format(value as number)
                }
                width={100}
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
                    formatter={(value) =>
                      new Intl.NumberFormat("ko-KR", {
                        style: "currency",
                        currency: "KRW",
                        maximumFractionDigits: 0,
                      }).format(value as number)
                    }
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="price"
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
            <CardTitle>시간대별 매출 그래프</CardTitle>
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
                tickFormatter={(value) =>
                  new Intl.NumberFormat("ko-KR", {
                    style: "currency",
                    currency: "KRW",
                    maximumFractionDigits: 0,
                  }).format(value as number)
                }
                width={100}
                tickLine={false}
                axisLine={false}
                stroke="hsl(var(--muted-foreground))"
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="price"
                    labelFormatter={(value) => {
                      const [hours] = value.split(":")
                      return `${hours.padStart(2, "0")}:00`
                    }}
                    formatter={(value) =>
                      new Intl.NumberFormat("ko-KR", {
                        style: "currency",
                        currency: "KRW",
                        maximumFractionDigits: 0,
                      }).format(value as number)
                    }
                    indicator="dot"
                  />
                }
              />
              <Bar dataKey={"price"} fill="url(#timeBarGradient)" />
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
            <CardTitle>요일별 매출 그래프</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[400px]">
              <RadarChart data={dayData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      formatter={(value) =>
                        new Intl.NumberFormat("ko-KR", {
                          style: "currency",
                          currency: "KRW",
                          maximumFractionDigits: 0,
                        }).format(value as number)
                      }
                    />
                  }
                />
                <PolarAngleAxis
                  dataKey="day"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <PolarGrid gridType="circle" radialLines={false} stroke="hsl(var(--border))" />
                <Radar
                  dataKey="price"
                  fill="url(#radarGradient)"
                  fillOpacity={0.85}
                  // stroke="#60A5FA"
                  // strokeWidth={1}
                />
                <defs>
                  <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60A5FA" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#93C5FD" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="flex flex-col w-[50%]">
          <CardHeader className="items-center pb-0">
            <CardTitle>메뉴별 매출 비중</CardTitle>
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
                        const total = menuData.reduce((sum, item) => sum + item.price, 0)
                        const percent = (((value as number) / total) * 100).toFixed(0)

                        return [
                          `${new Intl.NumberFormat("ko-KR", {
                            style: "currency",
                            currency: "KRW",
                            maximumFractionDigits: 0,
                          }).format(value as number)} (${percent}%)`,
                        ]
                      }}
                    />
                  }
                />
                <Pie
                  data={menuData}
                  dataKey="price"
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

export default SalesChart
