import { modalStore } from "@/store/modal"
import React, { useCallback } from "react"

const useModal = () => {
  const { showModal, hideModal, allHideModal } = modalStore()

  const Modal = useCallback(
    ({
      content,
      useAnimation,
      useDimedClose = true,
    }: {
      content: React.ReactNode
      useAnimation?: boolean
      useDimedClose?: boolean
    }) => {
      showModal({ content, useAnimation, useDimedClose })
    },
    [],
  )

  const hide = useCallback(() => {
    hideModal()
  }, [])

  const allHide = useCallback(() => {
    allHideModal()
  }, [])

  return {
    Modal,
    hide,
    allHide,
  }
}

export default useModal
