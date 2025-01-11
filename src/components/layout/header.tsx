import { ROUTES } from "@/utils/routes"
import { useNavigate } from "react-router-dom"
import Icon from "../Icon"
import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"

export function Header() {
  const navigate = useNavigate()

  return (
    <SidebarHeader className="items-center justify-center h-fit p-0">
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center justify-center">
          <SidebarMenuButton
            className="flex flex-col h-fit gap-4 p-2 group-data-[collapsible=icon]:!p-2 group-data-[collapsible=icon]:!size-fit hover:text-white active:text-netural hover:bg-sidebar active:bg-sidebar"
            onClick={() => navigate(ROUTES.DASHBOARD)}
          >
            <Icon name="Store" size={40} />
            <span className="font-jua text-5xl font-bold text-primary">개발의민족</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}
