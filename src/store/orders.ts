import { Order } from "@/types/models"
import { create } from "zustand"

interface NewOrderState {
  orders: Order[]
  addOrder: (order: Order) => void
  removeOrder: (orderId: string) => void
  resetOrders: () => void
}
export const newOrderStore = create<NewOrderState>((set) => ({
  orders: [],
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),

  removeOrder: (orderId) =>
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== orderId),
    })),

  resetOrders: () => set({ orders: [] }),
}))
