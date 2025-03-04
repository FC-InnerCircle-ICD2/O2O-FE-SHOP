"use client"

import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

const ImageModal = ({ images, onClose }: { images: string; onClose?: () => void }) => {
  const [currentImage, setCurrentImage] = useState(images)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  if (!mounted) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <img
          src={currentImage}
          alt="image"
          className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
        />
      </div>
    </div>,
    document.body,
  )
}

export default ImageModal
