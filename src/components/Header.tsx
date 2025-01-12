import { Switch } from "@components/ui/switch"

const Header = () => {
  return (
    <header className="sticky top-0 h-header w-full bg-boxdark">
      <div className="flex h-full items-center justify-end p-4">
        <div>
          <Switch
            className={`data-[state=checked]:bg-primary data-[state=unchecked]:bg-secondary h-7 w-12 [&>span]:h-6 [&>span]:w-6 [&>span]:translate-x-0.5 data-[state=checked]:[&>span]:translate-x-5`}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
