import { useEffect, useState } from "react"
import { newOrderStore } from "@/store/orders"
import { useToast } from "./useToast"
import userStore from "@/store/user"
import { mapOrderDtoToModel } from "@/utils/mappers/order"

export const useOrderSSE = () => {
  const { accessToken } = userStore()
  const { addOrder } = newOrderStore()
  const { showNewOrderNotification } = useToast()

  const [eventSource, setEventSource] = useState<EventSource | null>(null)

  useEffect(() => {
    if (!accessToken || eventSource) return

    const url = import.meta.env.VITE_API_BASE_URL
    const newEventSource = new EventSource(`${url}/api/event-stream`, {
      withCredentials: true,
    })
    newEventSource.onopen = (e) => {
      console.log("SSE connection opened", e)
    }

    newEventSource.onmessage = (event) => {
      try {
        const order = mapOrderDtoToModel(JSON.parse(event.data))
        addOrder(order)
        showNewOrderNotification(order)
      } catch (error) {
        console.error("Error parsing SSE message", error)
      }
    }

    newEventSource.onerror = (error) => {
      console.error("SSE connection error", error)
      newEventSource.close()
      setEventSource(null)
    }

    setEventSource(newEventSource)

    return () => {
      newEventSource.close()
      setEventSource(null)
    }
  }, [accessToken])

  const closeSSE = () => {
    if (eventSource) {
      eventSource.close()
      setEventSource(null)
    }
  }

  return { closeSSE }
}
