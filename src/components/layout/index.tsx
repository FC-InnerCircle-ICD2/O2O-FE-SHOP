import { Outlet } from "react-router-dom"
import Main from "../Main"
import { Sidebar, useSidebar } from "../ui/sidebar"
import { Body } from "./body"
import { Header } from "./header"

export function Layout() {
  const { state } = useSidebar()

  console.log(state)

  if (!state) return null
  return (
    <>
      <Sidebar variant="sidebar" className="">
        <div className="flex flex-col flex-1 border-r border-r-solid border-r-black">
          <Header />
          <Body />
          {/* <Footer /> */}
        </div>
      </Sidebar>
      <Main>
        <Outlet />
      </Main>
    </>
  )
}
