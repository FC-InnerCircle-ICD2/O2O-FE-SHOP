import { newOrderStore } from "@/store/orders"
import { useToast } from "./useToast"
import userStore from "@/store/user"
import { useEffect } from "react"
import { Order } from "@/types/models"

export const useOrderSSE = () => {
  const { accessToken } = userStore()
  const { addOrder } = newOrderStore()
  const { showNewOrderNotification } = useToast()

  useEffect(() => {
    if (!accessToken) return

    const connectSSE = async () => {
      try {
        const url = import.meta.env.VITE_API_BASE_URL
        const response = await fetch(`${url}/api/event-stream`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
        if (!response.ok || !response.body) {
          throw new Error("Failed to connect to SSE stream")
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder("utf-8")

        while (true) {
          const { value, done } = await reader.read()
          if (done) break

          const data = decoder.decode(value, { stream: true })
          const order = JSON.parse(data) as Order
          addOrder(order)
          showNewOrderNotification(order.id)
        }
      } catch (error) {
        console.error("SSE connection error", error)
      }
    }

    connectSSE()
  }, [accessToken, addOrder, showNewOrderNotification])
}
