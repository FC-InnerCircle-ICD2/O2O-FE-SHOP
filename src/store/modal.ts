import { create } from "zustand"

interface Modal {
  type: "modal"
  content: React.ReactNode
  useAnimation?: boolean
  useDimedClose?: boolean
}

interface ModalState {
  modals: Modal | undefined
  showModal: (options: Pick<Modal, "content" | "useAnimation" | "useDimedClose">) => void
  hideModal: () => void
  allHideModal: () => void
}

export const modalStore = create<ModalState>((set) => ({
  modals: undefined,
  showModal: (options: Pick<Modal, "content" | "useAnimation" | "useDimedClose">) =>
    set(() => ({
      modals: { type: "modal", ...options },
    })),
  hideModal: () =>
    set(() => ({
      modals: undefined,
    })),
  allHideModal: () => set({ modals: undefined }),
}))
