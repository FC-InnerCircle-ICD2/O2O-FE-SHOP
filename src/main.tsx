import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import Modal from "@components/Modal"
import App from "./App"
import "./styles/global.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Modal />
  </StrictMode>,
)
