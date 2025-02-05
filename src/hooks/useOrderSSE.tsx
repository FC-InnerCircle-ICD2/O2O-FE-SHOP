import { useEffect, useState } from "react"
import { newOrderStore } from "@/store/orders"
import { useToast } from "./useToast"
import userStore from "@/store/user"
import { mapOrderDtoToModel } from "@/utils/mappers/order"
import { EventSourcePolyfill } from "event-source-polyfill"

const EventSource = EventSourcePolyfill
export const useOrderSSE = () => {
  const { accessToken } = userStore()
  const { addOrder } = newOrderStore()
  const { showNewOrderNotification } = useToast()

  const [eventSource, setEventSource] = useState<EventSource | null>(null)
  useEffect(() => {
    console.log(eventSource?.readyState)
  })
  useEffect(() => {
    if (!accessToken || eventSource) return

    const url = import.meta.env.VITE_API_BASE_URL
    const newEventSource = new EventSource(`${url}/api/event-stream`, {
      withCredentials: true,
      headers: {
        Authorization: accessToken,
      },
    })

    newEventSource.addEventListener("ORDER_NOTIFICATION", (event) => {
      try {
        const messageEvent = event as MessageEvent
        const order = mapOrderDtoToModel(JSON.parse(messageEvent.data))
        addOrder(order)
        showNewOrderNotification(order)
      } catch (error) {
        console.error("Error parsing SSE message", error)
      }
    })

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
