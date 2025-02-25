import { BASE_URL, refreshPromise } from "@/apis"
import { newOrderStore } from "@/store/orders"
import userStore, { UserInfo } from "@/store/user"
import { mapOrderDtoToModel } from "@/utils/mappers/order"
import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Event, EventSourcePolyfill, NativeEventSource } from "event-source-polyfill"
import { useEffect, useRef } from "react"
import { useToast } from "./useToast"

const EventSource = EventSourcePolyfill || NativeEventSource
const MAX_RETRIES = 3

export const useOrderSSE = () => {
  const { userInfo, setUserInfo, resetUserInfo } = userStore()
  const { addOrder } = newOrderStore()
  const { showNewOrderNotification, showNotification } = useToast()
  const queryClient = useQueryClient()

  const eventSource = useRef<EventSource | null>(null)

  const refreshSSEToken = async (retryCount = 0) => {
    closeSSE()

    const { userInfo: userToken, setUserInfo, resetUserInfo } = userStore.getState()

    try {
      let newToken

      if (refreshPromise) {
        // 이미 진행 중인 refresh 요청이 있다면 그 결과를 기다립니다
        newToken = await refreshPromise
      } else {
        // 진행 중인 refresh 요청이 없다면 새로 요청합니다
        const res = await axios.post(`${BASE_URL}/auth/refresh`, {
          accessToken: userToken?.accessToken.replace("Bearer ", ""),
          refreshToken: userToken?.refreshToken.replace("Bearer ", ""),
        })
        newToken = res.data
      }

      setUserInfo(newToken.data)
      // 새로운 토큰으로 SSE 연결 재설정
      reconnectSSE(newToken.data)
    } catch (err) {
      if (retryCount < MAX_RETRIES - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return refreshSSEToken(retryCount + 1)
      }

      resetUserInfo()
      throw err
    }
  }

  const reconnectSSE = (userToken: UserInfo) => {
    // 기존 연결 종료
    if (eventSource.current) {
      eventSource.current.close()
      eventSource.current = null
    }

    // 새로운 연결 생성
    eventSource.current = new EventSource(`${BASE_URL}/event-stream`, {
      withCredentials: true,
      headers: {
        Authorization: userToken.accessToken || "",
      },
      heartbeatTimeout: 1000 * 600,
    })

    // 이벤트 리스너 설정
    eventSource.current.onmessage = (event) => {}

    eventSource.current.addEventListener("ORDER_NOTIFICATION", (event) => {
      try {
        queryClient.invalidateQueries({ queryKey: ["orders", "new"] })

        const messageEvent = event as MessageEvent
        const order = mapOrderDtoToModel(JSON.parse(messageEvent.data))
        addOrder(order)
        showNewOrderNotification(order)
      } catch (error) {
        console.error("Error parsing SSE message", error)
      }
    })

    eventSource.current.addEventListener("ORDER_CANCELLATION", (event) => {
      try {
        queryClient.invalidateQueries({ queryKey: ["orders", "new"] })

        const messageEvent = event as MessageEvent
        const order = JSON.parse(messageEvent.data)

        showNotification("error", `주문번호-[${order.orderId}]\n주문이 취소되었습니다.`)
      } catch (error) {
        console.error("Error parsing SSE message", error)
      }
    })

    eventSource.current.onerror = function (event: Event) {
      const ev = event as Event & { status: number }
      if (ev.status === 511) {
        refreshSSEToken()
      }
    }
  }

  const closeSSE = () => {
    if (eventSource.current) {
      eventSource.current.close()
      eventSource.current = null
    }
  }

  useEffect(() => {
    if (!userInfo) return

    reconnectSSE(userInfo)

    return () => {
      closeSSE()
    }
  }, [])

  return { closeSSE }
}
