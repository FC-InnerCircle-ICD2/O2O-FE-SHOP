import { createRoot } from "react-dom/client"

import Modal from "@/components/Modal"
import { Toaster } from "@/components/shadcn/sonner"
import "@/styles/global.css"
import App from "./App"

async function enableMocking() {
  if (import.meta.env.VITE_MSW_ENABLED === "false") return
  const { worker } = await import("./apis/mocks/browsers")
  return worker.start({
    quiet: true,
    onUnhandledRequest: "bypass",
  })
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <>
      <App />
      <Modal />
      <Toaster />
    </>,
    // </StrictMode>,
  )
})
