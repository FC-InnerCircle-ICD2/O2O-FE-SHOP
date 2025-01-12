import React from "react"

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col flex-1 bg-green-500">
      {/* <Header /> */}
      <main className="flex-1">{children}</main>
    </div>
  )
}

export default Main
