// src/mocks/handlers.js
import { BASE_URL } from "@/apis"
import { http, HttpHandler, HttpResponse, passthrough } from "msw"

const handlers: HttpHandler[] = [
  // http.get(`${BASE_URL}/event-stream`, ({ request }) => {
  //   return new HttpResponse(
  //     new ReadableStream({
  //       start(controller) {
  //         const encoder = new TextEncoder()

  //         const sendEvent = () => {
  //           const eventType = "ORDER_NOTIFICATION" // 이벤트 타입 지정
  //           const eventData = JSON.stringify(ORDERS[0])

  //           const message = `event: ${eventType}\ndata: ${eventData}\n\n`
  //           controller.enqueue(encoder.encode(message))
  //         }
  //         sendEvent()

  //         // const interval = setInterval(sendEvent, 5000)
  //       },
  //     }),
  //     {
  //       headers: {
  //         "Content-Type": "text/event-stream",
  //         Connection: "keep-alive",
  //         "Cache-Control": "no-cache",
  //       },
  //     },
  //   )
  // }),
  http.get(`${BASE_URL}/orders`, ({ request }) => {
    return passthrough()

    // const url = new URL(request.url)
    // const status = url.searchParams.get("status")
    // let orders
    // if (status) orders = ORDERS.filter((order) => order.orderStatus === status)
    // else orders = ORDERS
    // return HttpResponse.json({
    //   status: 200,
    //   message: "OK",
    //   data: {
    //     content: orders,
    //     currentPage: 1,
    //     totalPages: 1,
    //     totalItems: orders.length,
    //     hasNext: false,
    //   },
    // })
  }),
  http.patch(`${BASE_URL}/orders/:orderId/refuse`, () => {
    return passthrough()

    return HttpResponse.json({
      status: 200,
      message: "OK",
      data: {},
    })
  }),
  http.patch(`${BASE_URL}/orders/:orderId/accept`, () => {
    return passthrough()

    return HttpResponse.json({
      status: 200,
      message: "OK",
      data: {},
    })
  }),
  http.post(`${BASE_URL}/orders/:orderId/complete`, () => {
    return passthrough()

    return HttpResponse.json({
      status: 200,
      message: "OK",
      data: {},
    })
  }),
]

export default handlers
