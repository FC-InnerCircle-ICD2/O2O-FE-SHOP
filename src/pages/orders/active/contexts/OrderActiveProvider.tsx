import { createContext, ReactNode, useContext } from "react"
import { useSearchParams } from "react-router-dom"

export interface Order {
  id: string
  desc: string
  orderTime: string
}

interface OrderActiveContextType {
  order: Order | undefined
  newOrders: Order[]
  processingOrders: Order[]
}

const OrderActiveContext = createContext<OrderActiveContextType | null>(null)

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams] = useSearchParams()
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
  const getOrderById = (id: string) => {
    return [...newOrders, ...processingOrders].find((order) => order.id === id)
  }
  const orderId = searchParams.get("orderId")
  const order = orderId ? getOrderById(orderId) : undefined

  const value = {
    order,
    newOrders,
    processingOrders,
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
