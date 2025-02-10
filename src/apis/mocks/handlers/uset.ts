// src/mocks/handlers.js
import { BASE_URL } from "@/apis"
import { http, HttpResponse } from "msw"

const handlers = [
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
]

export default handlers
