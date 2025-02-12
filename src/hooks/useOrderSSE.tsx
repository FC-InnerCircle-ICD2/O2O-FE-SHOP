import { useEffect, useState, useCallback, useRef } from "react"
import { newOrderStore } from "@/store/orders"
import { useToast } from "./useToast"
import userStore, { UserInfo } from "@/store/user"
import { mapOrderDtoToModel } from "@/utils/mappers/order"
import { Event, EventSourcePolyfill, NativeEventSource } from "event-source-polyfill"
import { BASE_URL } from "@/apis"
import axios from "axios"

const EventSource = EventSourcePolyfill || NativeEventSource

export const useOrderSSE = () => {
  const { userInfo, setUserInfo, resetUserInfo } = userStore()
  const { addOrder } = newOrderStore()
  const { showNewOrderNotification } = useToast()

  const eventSource = useRef<EventSource | null>(null)

  // const [eventSource, setEventSource] = useState<EventSourcePolyfill | null>(null)

  // const initSSE = (token?: UserInfo) => {
  //   console.log("iniSSE", userInfo, token)
  //   const userToken = token ? token : userInfo

  //   const newEventSource = new EventSourcePolyfill(`${BASE_URL}/event-stream`, {
  //     withCredentials: true,
  //     headers: {
  //       Authorization: userToken?.accessToken || "",
  //     },
  //     heartbeatTimeout: 1000 * 600,
  //   })

  //   // 기본 message 이벤트 리스너 추가
  //   newEventSource.onmessage = (event) => {
  //     // console.log("기본 메시지 이벤트:", event)
  //   }

  //   // open 이벤트 리스너 추가
  //   newEventSource.onopen = () => {
  //     // console.log("SSE 연결 성공")
  //   }

  //   newEventSource.addEventListener("ORDER_NOTIFICATION", (event) => {
  //     console.log({ event })
  //     try {
  //       const messageEvent = event as MessageEvent
  //       const order = mapOrderDtoToModel(JSON.parse(messageEvent.data))
  //       addOrder(order)
  //       showNewOrderNotification(order)
  //     } catch (error) {
  //       console.error("Error parsing SSE message", error)
  //     }
  //   })

  //   newEventSource.onerror = function (event: Event) {
  // console.error("SSE connection error", event)

  // const ev = event as Event & { status: number }

  // if (ev.status === 511) {
  //   console.log("refresh 511", userToken)
  //   axios
  //     .post(`${BASE_URL}/auth/refresh`, {
  //       accessToken: userToken?.accessToken.replace("Bearer ", ""),
  //       refreshToken: userToken?.refreshToken.replace("Bearer ", ""),
  //     })
  //     .then((res) => {
  //       console.log("refresh 511 res", res.data.data)
  //       setUserInfo(res.data.data)
  //       initSSE(res.data.data)
  //     })
  //     .catch((err) => {
  //       console.log("refresh 511 error", err)
  //       resetUserInfo()
  //     })
  //     .finally(() => {
  //       setEventSource(null)
  //     })
  // }
  //   }

  //   setEventSource(newEventSource)
  // }

  const refreshSSEToken = async () => {
    const { userInfo: userToken, setUserInfo, resetUserInfo } = userStore.getState()

    try {
      const res = await axios.post(`${BASE_URL}/auth/refresh`, {
        accessToken: userToken?.accessToken.replace("Bearer ", ""),
        refreshToken: userToken?.refreshToken.replace("Bearer ", ""),
      })

      setUserInfo(res.data.data)
      // 새로운 토큰으로 SSE 연결 재설정
      reconnectSSE(res.data.data)
    } catch (err) {
      console.log("refresh 511 error", err)
      resetUserInfo()
      closeSSE()
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
    eventSource.current.onmessage = (event) => {
      console.log("event", event)
    }

    eventSource.current.addEventListener("ORDER_NOTIFICATION", (event) => {
      try {
        const messageEvent = event as MessageEvent
        const order = mapOrderDtoToModel(JSON.parse(messageEvent.data))
        addOrder(order)
        showNewOrderNotification(order)
      } catch (error) {
        console.error("Error parsing SSE message", error)
      }
    })

    eventSource.current.onerror = function (event: Event) {
      console.error("SSE connection error", event)
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
