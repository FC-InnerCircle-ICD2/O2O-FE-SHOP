"use client"

import useModal from "@/hooks/useModal"
import { modalStore } from "@/store/modal"
import { AnimatePresence, motion } from "motion/react"

const Modal = () => {
  const { allHide } = useModal()
  const { modals } = modalStore()

  if (!modals) return null
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="fixed inset-0 bg-black/50"
          onClick={modals.useDimedClose ? allHide : undefined}
        />{" "}
        {/* 반투명한 검은색 배경 */}
        {modals.useAnimation ? (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 80, stiffness: 1000 }}
            className="relative z-10 w-fit"
          >
            {modals.content}
          </motion.div>
        ) : (
          <div className="relative z-10">{modals.content}</div>
        )}
      </div>
    </AnimatePresence>
  )
}

export default Modal
