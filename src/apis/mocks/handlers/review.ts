// src/mocks/handlers.js
import { HttpHandler, HttpResponse, http } from "msw"
import { Review } from "@/types/models"
import { BASE_URL } from "@/apis"

const mockReviews: Review[] = [
  {
    id: "1",
    nickname: "User1",
    date: "2023-10-01",
    ratings: { total: 5.0, quantity: 5, taste: 4, delivery: 5 },
    menu: ["Pizza", "Burger"],
    content: "Great food!",
    like: 1,
    images: [
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
    ],
    reply: {
      date: "2023-10-02",
      content: "Thank you!",
    },
  },
  {
    id: "1",
    nickname: "User1",
    date: "2023-10-01",
    ratings: { total: 5.0, quantity: 5, taste: 4, delivery: 5 },
    menu: ["Pizza", "Burger"],
    content: "Great food!",
    like: 1,
    images: ["https://placehold.co/600x400", "https://placehold.co/600x400"],
    reply: null,
  },
  {
    id: "1",
    nickname: "User1",
    date: "2023-10-01",
    ratings: { total: 5.0, quantity: 5, taste: 4, delivery: 5 },
    menu: ["Pizza", "Burger"],
    content: "Great food!",
    like: 1,
    images: ["https://placehold.co/600x400", "https://placehold.co/600x400"],
    reply: {
      date: "2023-10-02",
      content: "Thank you!",
    },
  },
  {
    id: "1",
    nickname: "User1",
    date: "2023-10-01",
    ratings: { total: 5.0, quantity: 5, taste: 4, delivery: 5 },
    menu: ["Pizza", "Burger"],
    content: "Great food!",
    like: 1,
    images: ["https://placehold.co/600x400", "https://placehold.co/600x400"],
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
      message: "리뷰 통계 조회 성공",
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
  http.post(`${BASE_URL}/reviews/:reviewId/reply`, () => {
    return HttpResponse.json({
      status: 200,
      message: "OK",
      data: {},
    })
  }),
  http.put(`${BASE_URL}/reviews/:reviewId/reply`, () => {
    return HttpResponse.json({
      status: 200,
      message: "OK",
      data: {},
    })
  }),
  http.delete(`${BASE_URL}/reviews/:reviewId/reply`, () => {
    return HttpResponse.json({
      status: 200,
      message: "OK",
      data: {},
    })
  }),
]

export default handlers
