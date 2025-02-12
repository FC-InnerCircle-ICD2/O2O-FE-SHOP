import { create } from "zustand"
import { persist } from "zustand/middleware"

export type UserInfo = {
  accessToken: string
  refreshToken: string
}

interface UserState {
  userInfo: UserInfo | null
  setUserInfo: (info: UserInfo) => void
  resetUserInfo: () => void
}

const userStore = create<UserState>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (info) => {
        console.log("setUser", { info })
        set(() => ({ userInfo: info }))
      },
      resetUserInfo: () =>
        set({
          userInfo: null,
        }),
    }),
    {
      name: "userIdStorage",
    },
  ),
)

export default userStore
