import { ROUTES } from "@/routes"
import { useNavigate } from "react-router-dom"
import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../shadcn/sidebar"

export function Header() {
  const navigate = useNavigate()

  return (
    <SidebarHeader className="flex items-center justify-center h-header py-[1.8rem] px-[3rem] border-b border-b-solid border-b-black">
      <SidebarMenu className="flex-1">
        <SidebarMenuItem className="flex flex-1 items-center justify-center">
          <SidebarMenuButton
            className="flex flex-1 p-0 h-fitgroup-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:!size-fit hover:text-white active:text-netural hover:bg-sidebar active:bg-sidebar"
            onClick={() => navigate(ROUTES.DASHBOARD)}
          >
            <p className="font-jua flex-1 text-2xl font-bold text-white">
              개발의 민족
            </p>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}
