import { create } from "zustand"

interface OperationState {
  isOperational: boolean
  setIsOperational: (isOperational: boolean) => void
}

export const operationStore = create<OperationState>()((set) => ({
  isOperational: false,
  setIsOperational: (isOperational: boolean) => set({ isOperational }),
}))
