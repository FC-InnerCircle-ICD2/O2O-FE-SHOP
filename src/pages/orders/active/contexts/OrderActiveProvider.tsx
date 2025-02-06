import { fetchOrders } from "@/apis/order"
import { Order } from "@/types/models"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

// export interface Order {
//   id: string
//   desc: string
//   orderTime: string
// }

interface OrderActiveContextType {
  order: Order | undefined
  newOrders: Order[]
  processingOrders: Order[]
  approve: (id: string) => void
  refuse: (id: string) => void
  complete: (id: string) => void
}

const OrderActiveContext = createContext<OrderActiveContextType | null>(null)

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams] = useSearchParams()
  const [newOrders, setNewOrders] = useState<Order[]>([])
  const [processingOrders, setProcessingOrders] = useState<Order[]>([])
  useEffect(() => {
    const fetch = async () => {
      const { content: newOrders } = await fetchOrders({
        size: 999,
        status: ["NEW"],
      })

      setNewOrders(newOrders)

      const { content: processingOrders } = await fetchOrders({
        size: 999,
        status: ["ONGOING"],
        startDate: "20250101",
        endDate: "20260101",
      })

      setProcessingOrders(processingOrders)
    }
    fetch()
  }, [])

  const getOrderById = (id: string) => {
    return [...newOrders, ...processingOrders].find((order) => order.id === id)
  }

  const orderId = searchParams.get("orderId")
  const order = orderId ? getOrderById(orderId) : undefined

  const approve = (orderId: string) => {
    const targetOrder = newOrders.find(({ id }) => id === orderId)
    if (!targetOrder) return

    setNewOrders((prev) => prev.filter(({ id }) => id !== orderId))
    setProcessingOrders((prev) => [{ ...targetOrder, status: "ONGOING" }, ...prev])
  }

  const refuse = (orderId: string) => {
    setNewOrders((prev) => prev.filter((order, _) => order.id !== orderId))
  }

  const complete = (orderId: string) => {
    setProcessingOrders((prev) => prev.filter((order, _) => order.id !== orderId))
  }
  const value = {
    order,
    newOrders,
    processingOrders,
    approve,
    refuse,
    complete,
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
