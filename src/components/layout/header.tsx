import { useNavigate } from "react-router-dom"
import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { ROUTES } from "@/utils/routes"
import Icon from "../Icon"

export function Header() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(ROUTES.DASHBOARD)
  }

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            className="flex items-center gap-3 h-fit hover:text-white active:text-white"
            onClick={handleClick}
          >
            <Icon name="Store" size={30} />
            <span className="font-jua text-3xl font-bold text-purple">개발의민족</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}
