import { OrderStatus, OrderType } from "./common"

export type Order = {
  id: string
  name: string
  status: OrderStatus
  type: OrderType
  time: string
  totalPrice: number
  totalItems: number
  excludingSpoonAndFork: boolean
  requestToRider: string
  address: {
    road: string
    jihub: string
    detail: string
  }
  details: OrderDetail[]
}

export type OrderDetail = {
  id: number
  price: number
  menuName: string
  quantity: number
  menuPrice: number
  optionGroups: OptionGroup[]
}

export type OptionGroup = {
  id: number
  name: string
  options: Option[]
}

export type Option = {
  id: number
  name: string
  price: number
}

type ReviewStats = {
  quantity: number
  taste: number
  delivery: number
}

export type Review = {
  id: number
  nickname: string
  date: string
  ratings: ReviewStats
  menu: string[]
  content: string
  images: string[]
  reply?: { date: string; content: string }
}
