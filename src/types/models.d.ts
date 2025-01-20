import { OrderStatus, OrderType } from "./common"

export type Order = {
  id: string
  name: string
  status: OrderStatus
  type: OrderType
  time: number
  totalPrice: number
  totalItems: number
  details: OrderDetail[]
}

export type OrderDetail = {
  id: string
  price: number
  menuName: string
  quantity: number
  menuPrice: number
  optionGroups: OptionGroup[]
}

export type OptionGroup = {
  id: string
  name: string
  options: Option[]
}

export type Option = {
  id: string
  name: string
  price: number
}
