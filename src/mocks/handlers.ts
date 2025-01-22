// src/mocks/handlers.js
import { BASE_URL } from "@/apis"
import { http, HttpResponse } from "msw"

export const handlers = [
  http.get(`${BASE_URL}/orders`, () => {
    return HttpResponse.json({
      status: 200,
      message: "OK",
      data: {
        content: [
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
        ],
        currentPage: 3,
        totalPages: 10,
        totalItems: 100,
        hasNext: false,
      },
    })
  }),
]
