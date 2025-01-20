import { OrderStatus, OrderType } from "./common"

export interface OrderDto {
  orderId: string
  orderName: string
  orderStatus: OrderStatus
  orderType: OrderType
  orderTime: number
  totalPrice: number
  totalMenuCount: number
  orderDetail: {
    id: string
    orderId: string
    price: number
    menuName: string
    menuQuantity: number
    menuPrice: number
    menuOptionGroups: {
      id: string
      orderDetailId: string
      menuOptionGroupNm: string
      menuOption: {
        id: string
        menuOptionGroupId: string
        menuOptionName: string
        menuOptionPrice: number
      }[]
    }[]
  }[]
}
