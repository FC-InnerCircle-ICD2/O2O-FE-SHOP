import { ROUTES } from "@/utils/routes"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { useLocation, useNavigate } from "react-router-dom"
import Icon, { IconName } from "../Icon"
import { SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"

export function Body() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  console.log(pathname)

  const menuItems: {
    name: string
    icon: IconName
    path?: string
    subMenu?: { name: string; path: string }[]
  }[] = [
    {
      name: "대시보드",
      icon: "LayoutDashboard",
      path: ROUTES.DASHBOARD,
    },
    {
      name: "주문",
      icon: "ClipboardPen",
      subMenu: [
        {
          name: "신규 • 진행중",
          path: ROUTES.ACTIVE_ORDER,
        },
        {
          name: "완료",
          path: ROUTES.COMPLETED_ORDER,
        },
      ],
    },
  ]

  return (
    <SidebarContent className="gap-3">
      <SidebarMenu className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem className="flex justify-center">
              <SidebarMenuButton
                asChild
                className="px-5 flex justify-between items-center text-neutral/80 active:text-neutral hover:text-neutral data-[state='open']:hover:text-neutral"
              >
                <CollapsibleTrigger>
                  <a
                    className="flex flex-1 items-center gap-3 h-fit"
                    onClick={() => item.path && navigate(item.path)}
                  >
                    <div className="flex">
                      <Icon name={item.icon} size={24} />
                    </div>
                    <span className="text-2xl font-bold">{item.name}</span>
                  </a>
                  {item.subMenu && (
                    <Icon
                      className="transition-transform duration-300 group-data-[state=open]/collapsible:rotate-180"
                      name="ChevronDown"
                      size={24}
                      strokeWidth={2}
                    />
                  )}
                </CollapsibleTrigger>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {item.subMenu && (
              <CollapsibleContent className="flex flex-col gap-1 py-2">
                {item.subMenu.map((subItem) => (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className="pl-10 text-neutral/80 active:text-neutral hover:text-neutral cursor-pointer"
                      onClick={() => navigate(subItem.path)}
                    >
                      <a>
                        <span className="text-2xl">{subItem.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </CollapsibleContent>
            )}
          </Collapsible>
        ))}
      </SidebarMenu>

      {/* <SidebarGroup className="p-0">
        <SidebarGroupLabel
          className="group/dashboard duration-300 ease-in-out cursor-pointer p-0 h-fit"
          asChild
          onClick={() => navigate(ROUTES.DASHBOARD)}
        >
          <div className="flex items-center gap-3">
            <div
              data-icon
              className="flex items-center justify-end group-hover/dashboard:bg-neutral/20 rounded-r-[5px] p-2 w-[60px] h-[48px]"
            >
              <Icon
                name={"LayoutDashboard"}
                size={24}
                className={pathname === ROUTES.DASHBOARD ? "text-primary" : "text-neutral/50"}
              />
            </div>
            <span
              className={`text-[16px] font-bold ${
                pathname === ROUTES.DASHBOARD ? "text-primary" : "text-neutral/50"
              }`}
            >
              대시보드
            </span>
          </div>
        </SidebarGroupLabel>
      </SidebarGroup>

      <SidebarGroup className="p-0">
        <SidebarGroupLabel
          className="group/order duration-300 ease-in-out cursor-pointer p-0 h-fit"
          asChild
        >
          <div className="flex items-center gap-3">
            <div
              data-icon
              className="flex items-center justify-end group-hover/order:bg-neutral/20 rounded-r-[5px] p-2 w-[60px] h-[48px]"
            >
              <Icon
                name={"ClipboardPen"}
                size={24}
                className={pathname.startsWith(ROUTES.ORDER) ? "text-primary" : "text-neutral/50"}
              />
            </div>
            <span
              className={`text-[16px] font-bold ${
                pathname.startsWith(ROUTES.ORDER) ? "text-primary" : "text-neutral/50"
              }`}
            >
              주문
            </span>
          </div>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuItem>
            <ul className="m-4 flex flex-col gap-2.5 pl-6 text-bodydark2 font-medium">
            <li className="hover:text-white duration-300 ease-in-out">

            </li>
            <SidebarMenuButton asChild>
            <a href={ROUTES.ACTIVE_ORDER}>
              <span className="text-sm">신규 • 진행중</span>
            </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <li className="hover:text-white duration-300 ease-in-out">
            <SidebarMenuButton asChild>
            <a href={ROUTES.COMPLETED_ORDER}>
              <span className="text-sm">완료</span>
            </a>
            </SidebarMenuButton>
            </li>
          </SidebarMenuItem>
          </ul>
        </SidebarGroupContent>
      </SidebarGroup> */}
    </SidebarContent>
  )
}
