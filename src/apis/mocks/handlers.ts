// src/mocks/handlers.js
import { BASE_URL } from "@/apis"
import { delay, http, HttpResponse } from "msw"
import { worker } from "./browsers"
const ORDERS = [
  {
    orderId: "c735a637-621d-4926-9811-909dc2584cf9",
    orderName: "새우 로제 파스타 외 2개",
    orderStatus: "NEW",
    orderType: "DELIVERY",
    orderTime: "2025-01-16T10:00:00",
    totalPrice: 39400,
    totalMenuCount: 3,
    roadAddress: "서울특별시 구구구 동동동 123-4",
    jibunAddress: "서울특별시 구구구 경리단길 123",
    detailAddress: "401호",
    orderMenuInquiryResponses: [
      {
        id: 1,
        orderId: "c735a637-621d-4926-9811-909dc2584cf9",
        menuId: "d5010526-60ac-4656-b105-f591a2013435",
        menuName: "[주문폭주] 투움바 파스타 1",
        menuQuantity: 1,
        menuPrice: 12400,
        totalPrice: 12900,
        orderMenuOptionGroupInquiryResponses: [
          {
            id: 1,
            orderMenuId: 1,
            orderMenuOptionGroupName: "피클 선택",
            orderMenuOptionInquiryResponses: [
              {
                id: 1,
                orderMenuOptionGroupId: 1,
                menuOptionName: "상큼한 피클",
                menuOptionPrice: 500,
              },
              {
                id: 1,
                orderMenuOptionGroupId: 1,
                menuOptionName: "시큼한 피클",
                menuOptionPrice: 500,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        orderId: "c735a637-621d-4926-9811-909dc2584cf9",
        menuId: "d5010526-60ac-4656-b105-f591a2011235",
        menuName: "[주문폭주] 감바스",
        menuQuantity: 2,
        menuPrice: 13000,
        totalPrice: 26000,
        orderMenuOptionGroupInquiryResponses: [
          {
            id: 2,
            orderMenuId: 2,
            orderMenuOptionGroupName: "빵 선택",
            orderMenuOptionInquiryResponses: [
              {
                id: 2,
                orderMenuOptionGroupId: 2,
                menuOptionName: "마늘빵",
                menuOptionPrice: 500,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    orderId: "casdf-621d-4926-9811-909dc2584cf9",
    orderName: "된장찌개",
    orderStatus: "ONGOING",
    orderType: "DELIVERY",
    orderTime: "2025-01-16T10:00:00",
    totalPrice: 39400,
    totalMenuCount: 3,
    roadAddress: "서울특별시 구구구 동동동 123-4",
    jibunAddress: "서울특별시 구구구 경리단길 123",
    detailAddress: "401호",
    orderMenuInquiryResponses: [
      {
        id: 1,
        orderId: "casdf-621d-4926-9811-909dc2584cf9",
        menuId: "d5010526-60ac-4656-b105-f591a2013435",
        menuName: "[주문폭주] 투움바 파스타 1",
        menuQuantity: 1,
        menuPrice: 12400,
        totalPrice: 12900,
        orderMenuOptionGroupInquiryResponses: [
          {
            id: 1,
            orderMenuId: 1,
            orderMenuOptionGroupName: "피클 선택",
            orderMenuOptionInquiryResponses: [
              {
                id: 1,
                orderMenuOptionGroupId: 1,
                menuOptionName: "상큼한 피클",
                menuOptionPrice: 500,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        orderId: "c735a637-621d-4926-9811-909dc2584cf9",
        menuId: "d5010526-60ac-4656-b105-f591a2011235",
        menuName: "[주문폭주] 감바스",
        menuQuantity: 2,
        menuPrice: 13000,
        totalPrice: 26000,
        orderMenuOptionGroupInquiryResponses: [
          {
            id: 2,
            orderMenuId: 2,
            orderMenuOptionGroupName: "빵 선택",
            orderMenuOptionInquiryResponses: [
              {
                id: 2,
                orderMenuOptionGroupId: 2,
                menuOptionName: "마늘빵",
                menuOptionPrice: 500,
              },
            ],
          },
        ],
      },
    ],
  },
]
export const handlers = [
  http.get(`${import.meta.env.VITE_API_BASE_URL}/api/event-stream`, ({ request }) => {
    return new HttpResponse(
      new ReadableStream({
        start(controller) {
          const encoder = new TextEncoder()
          const sendEvent = () => {
            const eventType = "ORDER_NOTIFICATION" // 이벤트 타입 지정
            const eventData = JSON.stringify(ORDERS[0])

            const message = `event: ${eventType}\ndata: ${eventData}\n\n`
            controller.enqueue(encoder.encode(message))
          }
          sendEvent()

          const interval = setInterval(sendEvent, 5000)
        },
      }),
      {
        headers: {
          "Content-Type": "text/event-stream",
          Connection: "keep-alive",
          "Cache-Control": "no-cache",
        },
      },
    )
  }),
  http.post(`${BASE_URL}/auth/login`, () => {
    const TOKEN =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZWZyZXNoVG9rZW4iLCJyb2xlIjoiVVNFUiIsImlkIjo0LCJzdGF0ZSI6IkpPSU4iLCJleHAiOjE3Mzg0MjUwODV9.BUikWfdfd7A3CIBjMrw0hd8Z_ssJlIU_1aDuDHD9u_T5dUqzkSX9leOGOFW0_0O4qD0TigIPjGqiOxc40di22A"
    return HttpResponse.json(
      {
        status: 200,
        message: "OK",
        data: {
          accessToken: TOKEN,
          refreshToken: TOKEN,
          accessTokenExpiresIn: "2025-01-21T15:02:08.946Z",
          refreshTokenExpiresIn: "2025-01-21T15:03:08.947Z",
        },
      },
      { headers: { Authorization: `Bearer ${TOKEN}` } },
    )
  }),
  http.get(`${BASE_URL}/orders`, ({ request }) => {
    const url = new URL(request.url)
    const status = url.searchParams.get("orderStatus")
    let orders
    if (status === "NEW") orders = [ORDERS[0]]
    else if (status === "ONGOING") orders = [ORDERS[1]]
    else orders = ORDERS
    return HttpResponse.json({
      status: 200,
      message: "OK",
      data: {
        content: orders,
        currentPage: 1,
        totalPages: 1,
        totalItems: 10,
        hasNext: false,
      },
    })
  }),
  http.post(`${BASE_URL}/orders/:orderId/refuse`, () => {
    return HttpResponse.json({
      status: 200,
      message: "OK",
      data: {},
    })
  }),
  http.post(`${BASE_URL}/orders/:orderId/approve`, () => {
    return HttpResponse.json({
      status: 200,
      message: "OK",
      data: {},
    })
  }),
  http.post(`${BASE_URL}/orders/:orderId/complete`, () => {
    return HttpResponse.json({
      status: 200,
      message: "OK",
      data: {},
    })
  }),
]
