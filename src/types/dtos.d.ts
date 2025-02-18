import { OrderStatus, OrderType } from "./common"
export interface OrderDto {
  orderId: string
  orderName: string
  orderStatus: OrderStatus
  orderType: OrderType
  orderTime: string // 날짜 형식 그대로 사용
  totalPrice: number
  totalMenuCount: number
  roadAddress: string
  jibunAddress: string
  detailAddress: string
  excludingSpoonAndFork: boolean
  requestToRider: string
  username: string
  tel: string
  orderMenuInquiryResponses: {
    id: number
    orderId: string
    menuId: string
    menuName: string
    menuQuantity: number
    menuPrice: number
    totalPrice: number
    orderMenuOptionGroupInquiryResponses: {
      id: number
      orderMenuId: number
      orderMenuOptionGroupName: string
      orderMenuOptionInquiryResponses: {
        id: number
        orderMenuOptionGroupId: number
        menuOptionName: string
        menuOptionPrice: number
      }[]
    }[]
  }[]
}
