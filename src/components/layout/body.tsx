import { ROUTES } from "@/utils/routes"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { useLocation, useNavigate } from "react-router-dom"
import Icon from "../Icon"
import { SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../shadcn/sidebar"

export function Body() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <SidebarContent>
      <SidebarMenu className="flex flex-col gap-0 [&_[data-sidebar='menu-button']]:h-[5.2rem]">
        <SidebarMenuItem className="flex justify-center gap-0">
          <SidebarMenuButton
            asChild
            className="px-[3rem] py-[1.2rem] flex items-center text-sidebar-textLight cursor-pointer"
            isActive={pathname === ROUTES.DASHBOARD}
          >
            <a
              className="flex flex-1 items-center gap-3 h-fit"
              onClick={() => navigate(ROUTES.DASHBOARD)}
            >
              <p className="text-[1.6rem] leading-[1.8rem] font-bold">대시보드</p>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <Collapsible defaultOpen={pathname.startsWith(ROUTES.ORDER)} className="group/collapsible">
          <SidebarMenuItem className="flex justify-center">
            <SidebarMenuButton
              asChild
              className="px-[3rem] py-[1.2rem] flex items-center text-sidebar-textLight"
              isActive={pathname.startsWith(ROUTES.ORDER)}
            >
              <CollapsibleTrigger>
                <a className="flex flex-1 items-center gap-3 h-fit">
                  <p className="text-[1.6rem] leading-[1.8rem] font-bold">주문</p>
                </a>
                <Icon
                  className="transition-transform duration-300 group-data-[state=open]/collapsible:rotate-180"
                  name="ChevronDown"
                  size={24}
                  strokeWidth={2}
                />
              </CollapsibleTrigger>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <CollapsibleContent className="flex flex-col">
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="h-[3.2rem] px-[3rem] text-sidebar-textLight cursor-pointer"
                isActive={pathname === ROUTES.ACTIVE_ORDER}
                onClick={() => navigate(ROUTES.ACTIVE_ORDER)}
              >
                <a>
                  <span className="text-[1.4rem] leading-[1.6rem]">신규 • 진행중</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="h-[3.2rem] px-[3rem] text-sidebar-textLight cursor-pointer"
                isActive={pathname === ROUTES.COMPLETED_ORDER}
                onClick={() => navigate(ROUTES.COMPLETED_ORDER)}
              >
                <a>
                  <span className="text-[1.4rem] leading-[1.6rem]">완료</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </CollapsibleContent>
        </Collapsible>
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
              className="flex items-center justify-end group-hover/dashboard:bg-netural/20 rounded-r-[5px] p-2 w-[60px] h-[48px]"
            >
              <Icon
                name={"LayoutDashboard"}
                size={24}
                className={pathname === ROUTES.DASHBOARD ? "text-primary" : "text-netural/50"}
              />
            </div>
            <span
              className={`text-[16px] font-bold ${
                pathname === ROUTES.DASHBOARD ? "text-primary" : "text-netural/50"
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
              className="flex items-center justify-end group-hover/order:bg-netural/20 rounded-r-[5px] p-2 w-[60px] h-[48px]"
            >
              <Icon
                name={"ClipboardPen"}
                size={24}
                className={pathname.startsWith(ROUTES.ORDER) ? "text-primary" : "text-netural/50"}
              />
            </div>
            <span
              className={`text-[16px] font-bold ${
                pathname.startsWith(ROUTES.ORDER) ? "text-primary" : "text-netural/50"
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
