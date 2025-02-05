import { operationStore } from "@/store/operation"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import Icon from "./Icon"
import userStore from "@/store/user"
import useLogout from "@/hooks/useLogout"

const Header = () => {
  const { isOperational, setIsOperational } = operationStore()
  const logout = useLogout()

  return (
    <header className="h-header min-h-header w-full px-6 bg-sidebar">
      <div className="flex h-full items-center justify-end">
        {/* 
         TODO: 중간발표 이후 주석 해제
        <div className="flex items-center gap-2">
          <div className="p-[1rem]">
            <div
              className={cn(
                "size-[1rem] rounded-full",
                isOperational ? "bg-operational" : "bg-closed",
              )}
            ></div>
          </div>
          <span className="text-xl font-bold text-netural">
            {isOperational ? "영업중" : "영업종료"}
          </span>
        </div> */}
        <div className="flex items-center gap-6">
          {/* 
           TODO: 중간발표 이후 주석 해제
          <Switch
            className={`data-[state=checked]:bg-primary data-[state=unchecked]:bg-textLight h-7 w-12 [&>span]:h-6 [&>span]:w-6 [&>span]:translate-x-0.5 data-[state=checked]:[&>span]:translate-x-5 [&>span]:bg-background`}
            checked={isOperational}
            onCheckedChange={setIsOperational}
          /> */}
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Avatar className="block rounded-full size-10 overflow-hidden">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="py-2 px-3 mt-[10px] bg-netural rounded-xl shadow-lg shadow-black/20">
              {/* 
               TODO: 중간발표 이후 주석 해제
              <DropdownMenuItem className="px-3 py-2 rounded-md text-base font-semibold cursor-pointer hover:bg-muted outline-none">
                <div className="flex items-center gap-3">
                  <Icon name="User" size={18} />
                  <span>Profile</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="h-[1px] bg-muted my-1" /> */}
              <DropdownMenuItem
                className="px-3 py-2 rounded-md text-base font-semibold cursor-pointer hover:bg-muted outline-none"
                onClick={logout}
              >
                <div className="flex items-center gap-3">
                  <Icon name="LogOut" size={18} />
                  <span>Logout</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Header
