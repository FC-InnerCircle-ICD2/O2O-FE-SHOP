// src/mocks/handlers.js
import { BASE_URL } from "@/apis"
import { HttpHandler, HttpResponse, http, passthrough } from "msw"

const handlers: HttpHandler[] = [
  http.get(`/reviews`, ({ request }) => {
    return passthrough()

    const url = new URL(request.url)
    const page = Number(url.searchParams.get("page")) || 0
    const size = Number(url.searchParams.get("size")) || 10
    const order = url.searchParams.get("order")
    const startDate = url.searchParams.get("startDate")
    const endDate = url.searchParams.get("endDate")
    const answerType = url.searchParams.get("answerType")
    const filteredData = []
    // const filteredData = []
    //   .filter((review) => {
    //     const reviewDate = new Date(review.date)

    //     if (startDate && endDate) {
    //       const start = new Date(startDate)
    //       const end = new Date(endDate)
    //       return reviewDate >= start && reviewDate <= end
    //     }

    //     if (startDate) {
    //       const start = new Date(startDate)
    //       return reviewDate >= start
    //     }

    //     if (endDate) {
    //       const end = new Date(endDate)
    //       return reviewDate <= end
    //     }

    //     return true
    //   })
    //   .filter((review) => {
    //     if (answerType === "unAnswered") {
    //       return !review.reply
    //     }
    //     return true // answerType이 'all'이거나 undefined인 경우
    //   })
    //   .sort((a, b) => {
    //     if (order === "rating") {
    //       return b.rating.total - a.rating.total
    //     }
    //     // default: latest
    //     return new Date(b.date).getTime() - new Date(a.date).getTime()
    //   })

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
