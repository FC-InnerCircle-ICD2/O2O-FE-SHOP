import { SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import { Sidebar } from "../ui/sidebar"
import { Outlet } from "react-router-dom"
import { Header } from "./header"
import { Body } from "./body"
import { Footer } from "./footer"

export function Layout() {
  return (
    <SidebarProvider>
      <Sidebar>
        <Header />
        <Body />
        <Footer />
      </Sidebar>
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
