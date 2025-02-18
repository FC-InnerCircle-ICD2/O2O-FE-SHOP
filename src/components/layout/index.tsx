import { Outlet } from "react-router-dom"
import Main from "../Main"
import { Sidebar, useSidebar } from "../shadcn/sidebar"
import { Body } from "./body"
import { Header } from "./header"

export function Layout() {
  const { state } = useSidebar()

  if (!state) return null
  return (
    <>
      {/* TODO: 사이드바 토글버튼 구현 */}
      <Sidebar variant="sidebar">
        <div className="flex flex-col flex-1 border-r border-r-solid border-r-black">
          <Header />
          <Body />
        </div>
      </Sidebar>
      <Main>
        <Outlet />
      </Main>
    </>
  )
}
