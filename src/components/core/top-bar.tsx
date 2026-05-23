import { BellIcon, SearchIcon, SettingsIcon } from 'lucide-react'
import { Input } from '../ui/input'

export function TopBar() {
  return (
    <header className="h-20 hidden md:flex items-center justify-between px-10">
      <div className="relative w-96">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Buscar..."
          className="pl-11 bg-surface-container-low border-white/8 rounded-full h-11"
        />
      </div>

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
