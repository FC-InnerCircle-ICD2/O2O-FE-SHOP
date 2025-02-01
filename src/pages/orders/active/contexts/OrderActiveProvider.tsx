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
}

const OrderActiveContext = createContext<OrderActiveContextType | null>(null)

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams] = useSearchParams()
  const [newOrders, setNewOrders] = useState<Order[]>([])
  const [processingOrders, setProcessingOrders] = useState<Order[]>([])
  useEffect(() => {
    const fetch = async () => {
      const { content: newOrders } = await fetchOrders({
        page: 1,
        storeId: 1,
        size: 999,
        orderStatus: ["NEW"],
      })

      setNewOrders(newOrders)

      const { content: processingOrders } = await fetchOrders({
        page: 1,
        storeId: 1,
        size: 999,
        orderStatus: ["ONGOING"],
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
    const targetOrder = newOrders.find((order, _) => order.id === orderId)
    setNewOrders((prev) => prev.filter((order, _) => order.id !== orderId))
    if (targetOrder) setProcessingOrders((prev) => [targetOrder, ...prev])
  }

  const refuse = (orderId: string) => {
    setNewOrders((prev) => prev.filter((order, _) => order.id !== orderId))
  }
  const value = {
    order,
    newOrders,
    processingOrders,
    approve,
    refuse,
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
