import Header from "@components/Header"
import React from "react"

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col flex-1 h-[100dvh] bg-gray">
      <Header />
      <main className="flex flex-1">{children}</main>
    </div>
  )
}

export default Main
