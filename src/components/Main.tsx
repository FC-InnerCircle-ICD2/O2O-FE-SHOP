import Header from "@components/Header"
import React from "react"

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col flex-1 bg-green-500">
      <Header />
      <main className="flex-1 bg-white p-6">
        <div className="w-full h-full bg-white rounded-xl p-6">{children}</div>
      </main>
    </div>
  )
}

export default Main
