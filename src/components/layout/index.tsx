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
      <Sidebar variant="sidebar">
        <div className="flex flex-col flex-1 py-[30px] gap-10">
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
