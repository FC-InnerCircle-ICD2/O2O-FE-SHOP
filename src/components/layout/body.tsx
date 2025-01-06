import { BookText, File, FileCheck, MessageSquareText, Store } from "lucide-react"
import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"
import { SidebarContent, SidebarGroup } from "../ui/sidebar"
import { ROUTES } from "@/utils/routes"

export function Body() {
  const MENU_ITEMS = [
    {
      label: "주문",
      items: [
        {
          icon: File,
          label: "신규,진행중",
          route: ROUTES.ACTIVE_ORDER,
          badge: 24,
        },
        {
          icon: FileCheck,
          label: "완료",
          route: ROUTES.COMPLETED_ORDER,
        },
      ],
    },
    {
      label: "가게",
      items: [
        {
          icon: Store,
          label: "가게정보",
          route: ROUTES.STORE_INFO,
        },
        {
          icon: BookText,
          label: "메뉴",
          route: ROUTES.STORE_MENU,
        },
        {
          icon: MessageSquareText,
          label: "리뷰",
          route: ROUTES.STORE_REVIEW,
        },
      ],
    },
  ]
  return (
    <SidebarContent>
      {MENU_ITEMS.map(({ label, items }) => (
        <SidebarGroup key={label}>
          <SidebarGroupLabel>{label}</SidebarGroupLabel>
          <SidebarContent>
            <SidebarGroupContent>
              {items.map(({ icon: Icon, label, route, badge }) => (
                <SidebarMenu key={label}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href={route}>
                        <Icon />
                        <span>{label}</span>
                      </a>
                    </SidebarMenuButton>
                    {badge && <SidebarMenuBadge>{badge}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                </SidebarMenu>
              ))}
            </SidebarGroupContent>
          </SidebarContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  )
}
