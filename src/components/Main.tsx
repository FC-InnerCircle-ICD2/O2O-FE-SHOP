import React from "react"
import Header from "./Header"

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 bg-green-500">
      <Header />
      {children}
    </div>
  )
}

export default Main
