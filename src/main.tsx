import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import Modal from "@components/Modal"
import App from "./App"
import { Toaster } from "./components/shadcn/sonner"
import "./styles/global.css"
async function enableMocking() {
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV !== "development") return
  const { worker } = await import("./apis/mocks/browsers")
  return worker.start()
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
