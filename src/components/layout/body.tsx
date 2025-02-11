import { ROUTES } from "@/routes"
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
        {/* TODO: 중간발표 이후 주석 해제 */}
        <SidebarMenuItem className="flex justify-center gap-0">
          <SidebarMenuButton
            asChild
            className="px-12 py-5 flex items-center text-sidebar-textLight cursor-pointer"
            isActive={pathname === ROUTES.DASHBOARD}
          >
            <a
              className="flex flex-1 items-center gap-3 h-fit"
              onClick={() => navigate(ROUTES.DASHBOARD)}
            >
              <p className="text-lg leading-[1.8rem] font-bold">대시보드</p>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <Collapsible defaultOpen={pathname.startsWith(ROUTES.ORDER)} className="group/collapsible">
          <SidebarMenuItem className="flex justify-center">
            <SidebarMenuButton
              asChild
              className="px-12 py-5 flex items-center text-sidebar-textLight"
              isActive={pathname.startsWith(ROUTES.ORDER)}
            >
              <CollapsibleTrigger>
                <a className="flex flex-1 items-center gap-3 h-fit">
                  <p className="text-lg leading-[1.8rem] font-bold">주문</p>
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
                className="py-2 px-12 text-sidebar-textLight cursor-pointer"
                isActive={pathname === ROUTES.ACTIVE_ORDER}
                onClick={() => navigate(ROUTES.ACTIVE_ORDER)}
              >
                <a className="!h-[60px]">
                  <span className="text-base leading-[1.6rem] pl-4">신규 • 진행중</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="py-2 px-12 text-sidebar-textLight cursor-pointer"
                isActive={pathname === ROUTES.COMPLETED_ORDER}
                onClick={() => navigate(ROUTES.COMPLETED_ORDER)}
              >
                <a className="!h-[60px]">
                  <span className="text-base leading-[1.6rem] pl-4">완료</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* TODO: 중간발표 이후 주석 해제 */}
          </CollapsibleContent>
        </Collapsible>
        <SidebarMenuItem className="flex justify-center gap-0">
          <SidebarMenuButton
            asChild
            className="px-12 py-5 flex items-center text-sidebar-textLight cursor-pointer"
            isActive={pathname === ROUTES.SHOP_REVIEW}
          >
            <a
              className="flex flex-1 items-center gap-3 h-fit"
              onClick={() => navigate(ROUTES.SHOP_REVIEW)}
            >
              <p className="text-lg leading-[1.8rem] font-bold">리뷰</p>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
  )
}
