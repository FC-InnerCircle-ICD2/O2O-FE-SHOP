// src/mocks/handlers.js
import { HttpHandler, HttpResponse, http } from "msw"
import { Review } from "@/types/models"
import { BASE_URL } from "@/apis"

const mockReviews: Review[] = [
  {
    id: 1,
    nickname: "User1",
    date: "2023-10-01",
    ratings: { quantity: 5, taste: 4, delivery: 5 },
    menu: ["Pizza", "Burger"],
    content: "Great food!",
    images: [],
    reply: {
      date: "2023-10-02",
      content: "Thank you!",
    },
  },
  // ...more mock reviews...
]

const handlers: HttpHandler[] = [
  http.get(`${BASE_URL}/reviews`, ({ request }) => {
    return HttpResponse.json({
      status: 200,
      data: mockReviews,
      message: "리뷰 조회 성공",
    })
  }),
]

export default handlers
