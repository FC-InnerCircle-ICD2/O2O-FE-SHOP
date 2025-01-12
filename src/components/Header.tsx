import { Switch } from "@components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import Icon from "./Icon"

const Header = () => {
  return (
    <header className="sticky top-0 h-header w-full bg-netural">
      <div className="flex h-full items-center justify-end p-4">
        <div className="flex items-center gap-6">
          <Switch
            className={`data-[state=checked]:bg-primary data-[state=unchecked]:bg-textLight h-7 w-12 [&>span]:h-6 [&>span]:w-6 [&>span]:translate-x-0.5 data-[state=checked]:[&>span]:translate-x-5 [&>span]:bg-background`}
          />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="block rounded-full size-12 overflow-hidden">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="py-2 px-3 mt-[6px] bg-netural rounded-xl shadow-lg shadow-black/20">
              <DropdownMenuItem className="px-3 py-2 rounded-md text-2xl font-semibold cursor-pointer hover:bg-muted">
                <div className="flex items-center gap-3">
                  <Icon name="User" size={18} />
                  <span>Profile</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="h-[1px] bg-muted my-1" />
              <DropdownMenuItem className="px-3 py-2 rounded-md text-2xl font-semibold cursor-pointer hover:bg-muted">
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
