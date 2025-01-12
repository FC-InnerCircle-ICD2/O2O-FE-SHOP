import { ROUTES } from "@/utils/routes"
import { useNavigate } from "react-router-dom"
import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"

export function Header() {
  const navigate = useNavigate()

  return (
    <SidebarHeader className="items-center justify-center h-fit p-[3rem] border-b border-b-solid border-b-sidebar-border">
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center justify-center">
          <SidebarMenuButton
            className="h-fit p-0 h-fitgroup-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:!size-fit hover:text-white active:text-netural hover:bg-sidebar active:bg-sidebar"
            onClick={() => navigate(ROUTES.DASHBOARD)}
          >
            <p className="font-jua h-fit text-[2.8rem] leading-[2.8rem] font-bold text-white">
              개발의 민족
            </p>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}
