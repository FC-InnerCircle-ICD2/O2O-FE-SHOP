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

type ReviewRatings = {
  total: number
  quantity: number
  taste: number
  delivery: number
}

export type Reply = { date: string; content: string }
export type Review = {
  id: string
  nickname: string
  date: string
  ratings: ReviewRatings
  menu: string[]
  content: string
  images: string[]
  like: number
  reply: Reply | null
}
