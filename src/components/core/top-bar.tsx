import { BellIcon, SettingsIcon } from 'lucide-react'

export function TopBar() {
  return (
    <header className="h-20 hidden md:flex items-center justify-end px-10">
      <div className="flex items-center gap-6">
        <button
          type="button"
          className="text-muted-foreground hover:text-on-surface transition-colors"
        >
          <BellIcon className="size-5 stroke-[2px]" />
        </button>
        <button
          type="button"
          className="text-muted-foreground hover:text-on-surface transition-colors"
        >
          <SettingsIcon className="size-5 stroke-[2px]" />
        </button>
        <div className="size-10 rounded-full bg-surface-container-high border border-white/8 overflow-hidden cursor-pointer">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="User avatar"
            className="size-full object-cover"
          />
        </div>
      </div>
    </header>
  )
}
