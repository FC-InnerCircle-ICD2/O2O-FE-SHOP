import { create } from "zustand"
import { persist } from "zustand/middleware"

type User = {
  accessToken: string | null
  refreshToken: string | null
  accessTokenExpiresIn: string | null
  refreshTokenExpiresIn: string | null
}

interface UserState extends User {
  setUserInfo: (data: User) => void
  resetUserInfo: () => void
}

const userStore = create<UserState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      accessTokenExpiresIn: null,
      refreshTokenExpiresIn: null,
      setUserInfo: (data) => set(() => data),
      resetUserInfo: () =>
        set({
          accessToken: null,
          refreshToken: null,
          accessTokenExpiresIn: null,
          refreshTokenExpiresIn: null,
        }),
    }),
    {
      name: "userIdStorage",
    },
  ),
)

export default userStore
