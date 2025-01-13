import Header from "@components/Header"
import React from "react"

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col flex-1 bg-gray">
      <Header />
      <main className="flex-1">
        <div className="w-full h-full">{children}</div>
      </main>
    </div>
  )
}

export default Main
