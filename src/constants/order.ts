import { OrderStatus  } from "@/types/common"

export const orderStatusLabels: Record<OrderStatus, string> = {
  NEW: "신규",
  ONGOING: "진행중",
  DONE: "완료"
}
