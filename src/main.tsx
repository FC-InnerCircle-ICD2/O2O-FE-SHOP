import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import Modal from "@components/Modal"
import App from "./App"
import { Toaster } from "./components/shadcn/sonner"
import "./styles/global.css"
async function enableMocking() {
  if (process.env.NODE_ENV !== "development") return
  const { worker } = await import("./mocks/browsers")
}
enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
      <Modal />
      <Toaster />
    </StrictMode>,
  )
})
