// src/mocks/handlers.js
import { BASE_URL } from "@/apis"
import { Review } from "@/types/models"
import { HttpHandler, HttpResponse, http, passthrough } from "msw"

const mockReviews: Review[] = [
  {
    id: "1",
    nickname: "김철",
    date: "2024-10-01 12:00:00",
    ratings: { total: 5.0, quantity: 5, taste: 4 },
    menu: [
      {
        menuName: "Pizza",
        menuQuantity: 2,
        menuOptions: [
          {
            menuOptionName: "상큼한 피클",
            menuOptionQuantity: 1,
          },
          {
            menuOptionName: "시큼한 피클",
            menuOptionQuantity: 2,
          },
        ],
      },
    ],
    content: "Great food!",
    like: 1,
    images: [
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
    ],
    reply: {
      date: "2024-10-02",
      content: "Thank you!",
    },
  },
  {
    id: "2",
    nickname: "땡처리",
    date: "2024-10-03 13:23:22",
    ratings: { total: 4.0, quantity: 5, taste: 4 },
    menu: [
      {
        menuName: "Pizza",
        menuQuantity: 2,
        menuOptions: [
          {
            menuOptionName: "상큼한 피클",
            menuOptionQuantity: 1,
          },
          {
            menuOptionName: "시큼한 피클",
            menuOptionQuantity: 2,
          },
        ],
      },
    ],
    content: "Great food!",
    like: 1,
    images: [
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
    ],
    reply: {
      date: "2024-10-02",
      content: "Thank you!",
    },
  },
  {
    id: "3",
    nickname: "username11",
    date: "2024-10-07 14:23:22",
    ratings: { total: 4.4, quantity: 5, taste: 4 },
    menu: [
      {
        menuName: "Pizza",
        menuQuantity: 2,
        menuOptions: [
          {
            menuOptionName: "상큼한 피클",
            menuOptionQuantity: 1,
          },
          {
            menuOptionName: "시큼한 피클",
            menuOptionQuantity: 2,
          },
        ],
      },
    ],
    content: "Great food!",
    like: 1,
    images: [
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
    ],
    reply: {
      date: "2024-10-02",
      content: "Thank you!",
    },
  },
  {
    id: "4",
    nickname: "User1",
    date: "2024-10-15 15:23:22",
    ratings: { total: 3.9, quantity: 5, taste: 4 },
    menu: [
      {
        menuName: "Pizza",
        menuQuantity: 2,
        menuOptions: [
          {
            menuOptionName: "상큼한 피클",
            menuOptionQuantity: 1,
          },
          {
            menuOptionName: "시큼한 피클",
            menuOptionQuantity: 2,
          },
        ],
      },
    ],
    content: "Great food!",
    like: 1,
    images: [
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
    ],
    reply: {
      date: "2024-10-02",
      content: "Thank you!",
    },
  },
  {
    id: "5",
    nickname: "User1",
    date: "2024-10-22 16:23:22",
    ratings: { total: 4.9, quantity: 5, taste: 4 },
    menu: [
      {
        menuName: "Pizza",
        menuQuantity: 2,
        menuOptions: [
          {
            menuOptionName: "상큼한 피클",
            menuOptionQuantity: 1,
          },
          {
            menuOptionName: "시큼한 피클",
            menuOptionQuantity: 2,
          },
        ],
      },
    ],
    content: "Great food!",
    like: 1,
    images: [
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
    ],
  },

  // ...more mock reviews...
]

const handlers: HttpHandler[] = [
  http.get(`/reviews`, ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get("page")) || 0
    const size = Number(url.searchParams.get("size")) || 10
    const order = url.searchParams.get("order")
    const startDate = url.searchParams.get("startDate")
    const endDate = url.searchParams.get("endDate")
    const answerType = url.searchParams.get("answerType")

    const filteredData = [...mockReviews]
      .filter((review) => {
        const reviewDate = new Date(review.date)

        if (startDate && endDate) {
          const start = new Date(startDate)
          const end = new Date(endDate)
          return reviewDate >= start && reviewDate <= end
        }

        if (startDate) {
          const start = new Date(startDate)
          return reviewDate >= start
        }

        if (endDate) {
          const end = new Date(endDate)
          return reviewDate <= end
        }

        return true
      })
      .filter((review) => {
        if (answerType === "unAnswered") {
          return !review.reply
        }
        return true // answerType이 'all'이거나 undefined인 경우
      })
      .sort((a, b) => {
        if (order === "rating") {
          return b.ratings.total - a.ratings.total
        }
        // default: latest
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })

    // 페이지네이션
    const startIndex = page * size
    const endIndex = startIndex + size
    const paginatedData = filteredData.slice(startIndex, endIndex)

    // 다음 페이지가 있는지 확인
    const hasNextPage = endIndex < filteredData.length

    return HttpResponse.json({
      status: 200,
      data: {
        data: paginatedData,
        nextCursor: hasNextPage ? page + 1 : null,
      },
      message: "success",
    })
  }),
  http.get(`${BASE_URL}/reviews/stats`, ({ request }) => {
    return HttpResponse.json({
      status: 200,
      data: {
        total: 0,
        quantity: 0,
        taste: 0,
        delivery: 0,
      },
      message: "리뷰 통계 조회 성공",
    })
  }),
  http.post(`/reviews/:reviewId/reply`, () => {
    // return passthrough()

    return HttpResponse.json({
      status: 200,
      message: "OK",
      data: {},
    })
  }),
  http.put(`/reviews/:reviewId/reply`, () => {
    // return passthrough()

    return HttpResponse.json({
      status: 200,
      message: "OK",
      data: {},
    })
  }),
  http.delete(`/reviews/:reviewId/reply`, () => {
    // return passthrough()

    return HttpResponse.json({
      status: 200,
      message: "OK",
      data: {},
    })
  }),

  http.get(`/reviews/summary`, ({ request }) => {
    return HttpResponse.json({
      status: 200,
      message: "OK",
      data: {
        totalRating: 4.3,
        quantityRating: 5.0,
        tasteRating: 4.4,
        reviewCount: 932,
      },
    })
  }),
]

export default handlers
