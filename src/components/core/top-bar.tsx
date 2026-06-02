import { Link } from '@tanstack/react-router'
import { BellIcon, SettingsIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { authClient } from '@/lib/auth-client'
import { getInitials } from '@/utils/get-initials'

export function TopBar() {
  const { data: session, isPending } = authClient.useSession()
  const user = session?.user

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

        {isPending ? (
          <Skeleton className="size-10 rounded-full" />
        ) : (
          <Link
            to="/profile"
            className="size-10 rounded-full bg-surface-container-high border border-white/8 overflow-hidden cursor-pointer flex items-center justify-center transition-all hover:border-primary/50"
          >
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="size-full object-cover"
              />
            ) : (
              <span className="text-sm font-medium text-on-surface">
                {getInitials(user?.name)}
              </span>
            )}
          </Link>
        )}
      </div>
    </header>
  )
}
