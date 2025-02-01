import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserState {
  accessToken: string | null
  refreshToken: string | null
  setUserInfo: (accessToken: string | null, refreshToken: string | null) => void
}

const userStore = create(
  persist<UserState>(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      setUserInfo: (accessToken: string | null, refreshToken: string | null) =>
        set(() => ({ accessToken, refreshToken })),
    }),
    {
      name: "userIdStorage",
    },
  ),
)

export default userStore
