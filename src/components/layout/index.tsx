import { SidebarProvider } from "../ui/sidebar"
import { Sidebar } from "../ui/sidebar"
import { Outlet } from "react-router-dom"
import { Header } from "./header"
import { Body } from "./body"
import Main from "../Main"

export function Layout() {
  return (
    <SidebarProvider>
      <Sidebar className="text-white">
        <div className="flex-1 p-2">
          <Header />
          <Body />
          {/* <Footer /> */}
        </div>
      </Sidebar>
      <Main>
        <Outlet />
      </Main>
    </SidebarProvider>
  )
}
