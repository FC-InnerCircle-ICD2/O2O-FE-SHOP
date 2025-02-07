// src/mocks/handlers.js
import { BASE_URL } from "@/apis"
import { OrderDto } from "@/types/dtos"
import { http, HttpResponse } from "msw"
const ORDERS: OrderDto[] = [
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
    excludingSpoonAndFork: true,
    requestToRider: "빨리 와주세요",
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
                id: 2,
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
        menuId: "d5010526-60ac-4656-b105-f591a2015678",
        menuName: "크림 파스타",
        menuQuantity: 1,
        menuPrice: 14000,
        totalPrice: 14000,
        orderMenuOptionGroupInquiryResponses: [],
      },
    ],
  },
  {
    orderId: "new002-621d-4926-9811-909dc2584cf9",
    orderName: "마르게리타 피자",
    orderStatus: "NEW",
    orderType: "DELIVERY",
    orderTime: "2025-01-16T12:00:00",
    totalPrice: 18000,
    totalMenuCount: 1,
    roadAddress: "서울특별시 강서구 화곡동 99-1",
    jibunAddress: "서울특별시 강서구 곰달래로 99",
    detailAddress: "302호",
    excludingSpoonAndFork: true,
    requestToRider: "빨리 와주세요",
    orderMenuInquiryResponses: [
      {
        id: 3,
        orderId: "new002-621d-4926-9811-909dc2584cf9",
        menuId: "pizza-001",
        menuName: "마르게리타 피자",
        menuQuantity: 1,
        menuPrice: 18000,
        totalPrice: 18000,
        orderMenuOptionGroupInquiryResponses: [],
      },
    ],
  },
  {
    orderId: "ongoing001-621d-4926-9811-909dc2584cf9",
    orderName: "된장찌개",
    orderStatus: "ONGOING",
    orderType: "DELIVERY",
    orderTime: "2025-01-16T11:00:00",
    totalPrice: 15000,
    totalMenuCount: 1,
    roadAddress: "서울특별시 구구구 동동동 456-7",
    jibunAddress: "서울특별시 구구구 경리단길 456",
    detailAddress: "202호",
    excludingSpoonAndFork: true,
    requestToRider: "빨리 와주세요",
    orderMenuInquiryResponses: [
      {
        id: 4,
        orderId: "ongoing001-621d-4926-9811-909dc2584cf9",
        menuId: "d5010526-60ac-4656-b105-f591a2015678",
        menuName: "된장찌개",
        menuQuantity: 1,
        menuPrice: 15000,
        totalPrice: 15000,
        orderMenuOptionGroupInquiryResponses: [],
      },
    ],
  },
  {
    orderId: "c735a637-621d-4926-9811-909dc2584cf9",
    orderName: "새우 로제 파스타 외 2개",
    orderStatus: "DONE",
    orderType: "DELIVERY",
    orderTime: "2025-01-16T10:00:00",
    totalPrice: 39400,
    totalMenuCount: 3,
    roadAddress: "서울특별시 구구구 동동동 123-4",
    jibunAddress: "서울특별시 구구구 경리단길 123",
    detailAddress: "401호",
    excludingSpoonAndFork: true,
    requestToRider: "빨리 와주세요",
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
                id: 2,
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
        menuId: "d5010526-60ac-4656-b105-f591a2015678",
        menuName: "크림 파스타",
        menuQuantity: 1,
        menuPrice: 14000,
        totalPrice: 14000,
        orderMenuOptionGroupInquiryResponses: [],
      },
    ],
  },
  {
    orderId: "done001-621d-4926-9811-909dc2584cf9",
    orderName: "치즈 버거 세트",
    orderStatus: "DONE",
    orderType: "DELIVERY",
    orderTime: "2025-01-15T13:30:00",
    totalPrice: 8900,
    totalMenuCount: 1,
    roadAddress: "서울특별시 강남구 역삼동 78-9",
    jibunAddress: "서울특별시 강남구 강남대로 78",
    detailAddress: "1층",
    excludingSpoonAndFork: true,
    requestToRider: "빨리 와주세요",
    orderMenuInquiryResponses: [
      {
        id: 5,
        orderId: "done001-621d-4926-9811-909dc2584cf9",
        menuId: "burger-001",
        menuName: "치즈 버거 세트",
        menuQuantity: 1,
        menuPrice: 8900,
        totalPrice: 8900,
        orderMenuOptionGroupInquiryResponses: [],
      },
    ],
  },

  ...(Array.from({ length: 20 }, (_, i) => ({
    orderId: `done00${i + 2}-621d-4926-9811-909dc2584cf9`,
    orderName: `완료된 주문 ${i + 2}`,
    orderStatus: "DONE",
    orderType: "DELIVERY",
    orderTime: `2025-01-14T${12 + i}:30:00`,
    totalPrice: 10000 + i * 1500,
    totalMenuCount: 1,
    roadAddress: `서울특별시 강남구 역삼동 ${80 + i}-9`,
    jibunAddress: `서울특별시 강남구 강남대로 ${80 + i}`,
    detailAddress: "1층",
    excludingSpoonAndFork: true,
    requestToRider: "빨리 와주세요",
    orderMenuInquiryResponses: [
      {
        id: 6 + i,
        orderId: `done00${i + 2}-621d-4926-9811-909dc2584cf9`,
        menuId: `done-menu-${i + 2}`,
        menuName: `완료된 메뉴 ${i + 2}`,
        menuQuantity: 1,
        menuPrice: 10000 + i * 1500,
        totalPrice: 10000 + i * 1500,
        orderMenuOptionGroupInquiryResponses: [],
      },
    ],
  })) as OrderDto[]),
]

export const handlers = [
  http.get(`${BASE_URL}/event-stream`, ({ request }) => {
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

          // const interval = setInterval(sendEvent, 5000)
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
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZWZyZXNoVG9rZW4iLCJyb2xlIjoiVVNFUiIsImlkIjo0LCJzdGF0ZSI6IkpPSU4iLCJleHAiOjE3Mzg0MjUwODV9.BUikWfdfd7A3CIBjMrw0hd8Z_ssJlIU_1aDuDHD9u_T5dUqzkSX9leOGOFW0_0O4qD0TigIPjGqiOxc40di22A"
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
    const status = url.searchParams.get("status")
    let orders
    if (status) orders = ORDERS.filter((order) => order.orderStatus === status)
    else orders = ORDERS
    return HttpResponse.json({
      status: 200,
      message: "OK",
      data: {
        content: orders,
        currentPage: 1,
        totalPages: 1,
        totalItems: orders.length,
        hasNext: false,
      },
    })
  }),
  http.patch(`${BASE_URL}/orders/:orderId/refuse`, () => {
    return HttpResponse.json({
      status: 200,
      message: "OK",
      data: {},
    })
  }),
  http.patch(`${BASE_URL}/orders/:orderId/accept`, () => {
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
