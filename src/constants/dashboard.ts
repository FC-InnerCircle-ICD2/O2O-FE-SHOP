const BBQ_MENUS = [
  { name: "맵소디" },
  { name: "황금올리브치킨" },
  { name: "자메이카 통다리구이" },
  { name: "한입등갈비튀김" },
  { name: "바사칸 윙" },
  { name: "양념치킨" },
  { name: "땡초숯불양념치킨" },
]

const generateRandomDate = (startDate?: Date, endDate?: Date) => {
  const start = startDate ? startDate.getTime() : new Date("2025-01-01").getTime()
  const end = endDate ? endDate.getTime() : new Date("2025-02-18").getTime()
  return new Date(start + Math.random() * (end - start)).toISOString()
}

const generateRandomPrice = () => {
  // 10000에서 100000 사이의 랜덤 값을 100 단위로 생성
  return Math.floor((Math.random() * (100000 - 10000 + 1)) / 100) * 100 + 10000
}

export interface DashboardData {
  orderTime: string
  menu: string
  price: number
  status: string
}

const generateDashboardData = (startDate?: Date, endDate?: Date): DashboardData[] => {
  return Array.from({ length: 500 }, () => {
    const selectedMenu = BBQ_MENUS[Math.floor(Math.random() * BBQ_MENUS.length)]
    return {
      orderTime: generateRandomDate(startDate, endDate),
      menu: selectedMenu.name,
      price: generateRandomPrice(),
      status: Math.random() > 0.2 ? "DONE" : "CANCEL", // 80% DONE, 20% CANCEL
    }
  }).sort((a, b) => new Date(a.orderTime).getTime() - new Date(b.orderTime).getTime())
}

export default generateDashboardData
