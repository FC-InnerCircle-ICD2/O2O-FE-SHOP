import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import Icon, { IconName } from "../Icon"
import { SidebarGroupContent, SidebarGroupLabel } from "../ui/sidebar"
import { SidebarContent, SidebarGroup } from "../ui/sidebar"
import { ROUTES } from "@/utils/routes"

interface SideMenuItem {
  label: string
  icon: IconName
  items: {
    label: string
    route: string
    badge?: number
  }[]
}

export function Body() {
  const MENU_ITEMS: SideMenuItem[] = [
    {
      label: "주문",
      icon: "ClipboardPen",
      items: [
        {
          label: "신규 • 진행중",
          route: ROUTES.ACTIVE_ORDER,
          badge: 24,
        },
        {
          label: "완료",
          route: ROUTES.COMPLETED_ORDER,
        },
      ],
    },
    // {
    //   label: "가게",
    //   items: [
    //     {
    //       icon: Store,
    //       label: "가게정보",
    //       route: ROUTES.STORE_INFO,
    //     },
    //     {
    //       icon: BookText,
    //       label: "메뉴",
    //       route: ROUTES.STORE_MENU,
    //     },
    //     {
    //       icon: MessageSquareText,
    //       label: "리뷰",
    //       route: ROUTES.STORE_REVIEW,
    //     },
    //   ],
    // },
  ]

  return (
    <SidebarContent>
      {MENU_ITEMS.map(({ label, icon, items }) => (
        <Collapsible defaultOpen key={label} className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel
              className="duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
              asChild
            >
              <CollapsibleTrigger>
                <div className="flex flex-1 items-center justify-between font-medium text-bodydark1">
                  <div className="flex items-center gap-2">
                    <Icon name={icon} size={18} />
                    <span className="text-base">{label}</span>
                  </div>
                  <Icon
                    className="transition-transform group-data-[state=open]/collapsible:rotate-180"
                    name="ChevronDown"
                    size={20}
                  />
                </div>
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <ul className="m-4 flex flex-col gap-2.5 pl-6 text-bodydark2 font-medium">
                  {items.map(({ label, route }) => (
                    <li key={label} className="hover:text-white duration-300 ease-in-out">
                      <a href={route}>
                        <span className="text-sm">{label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      ))}
    </SidebarContent>
  )
}
