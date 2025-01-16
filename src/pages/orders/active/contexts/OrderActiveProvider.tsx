import { createContext, ReactNode, useContext, useState } from "react"

export interface Order {
  id: string
  desc: string
  orderTime: string
}

interface OrderActiveContextType {
  order?: Order
  newOrders: Order[]
  processingOrders: Order[]
  setCurrentOrder: (order: Order) => void
}

const OrderActiveContext = createContext<OrderActiveContextType | null>(null)

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  // provider에서 api 호출 로직 구현 예정
  const [order, setOrder] = useState<Order | undefined>(undefined)

  const setCurrentOrder = (order: Order) => {
    setOrder(order)
  }

  const newOrders: Order[] = [
    {
      id: "A1B2",
      desc: "메뉴 2개, 총 2개  20,000원",
      orderTime: "2025-01-01 12:00:00",
    },
    {
      id: "A1B3",
      desc: "메뉴 2개, 총 2개  20,000원",
      orderTime: "2025-01-01 12:00:00",
    },
  ]
  const processingOrders: Order[] = [
    {
      id: "A1B4",
      desc: "메뉴 2개, 총 2개  20,000원",
      orderTime: "2025-01-01 12:00:00",
    },
    {
      id: "A1B5",
      desc: "메뉴 2개, 총 2개  20,000원",
      orderTime: "2025-01-01 12:00:00",
    },
    {
      id: "A1B6",
      desc: "메뉴 2개, 총 2개  20,000원",
      orderTime: "2025-01-01 12:00:00",
    },
    {
      id: "A1B7",
      desc: "메뉴 2개, 총 2개  20,000원",
      orderTime: "2025-01-01 12:00:00",
    },
    {
      id: "A1B8",
      desc: "메뉴 2개, 총 2개  20,000원",
      orderTime: "2025-01-01 12:00:00",
    },
  ]

  const value = {
    order,
    newOrders,
    processingOrders,
    setCurrentOrder,
  }

  return <OrderActiveContext.Provider value={value}>{children}</OrderActiveContext.Provider>
}

export const useActiveOrder = () => {
  const context = useContext(OrderActiveContext)
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider")
  }
  return context
}
