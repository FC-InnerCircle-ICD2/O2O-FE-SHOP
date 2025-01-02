import {
  BookText,
  ChevronDown,
  ChevronUp,
  File,
  FileCheck,
  MessageSquareText,
  Store,
  User2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown"
import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./ui/sidebar"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "./ui/sidebar"
import { Outlet } from "react-router-dom"
import { ROUTES } from "@/utils/routes"

function Header() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                Select Workspace
                <ChevronDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
              <DropdownMenuItem>
                <span>Acme Inc</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Acme Corp.</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}
function Body() {
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
function Footer() {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <User2 /> Username
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
              <DropdownMenuItem>
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}

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
