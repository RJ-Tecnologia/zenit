import { BellIcon, SettingsIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { authClient } from '@/lib/auth-client'

export function TopBar() {
  const { data: session, isPending } = authClient.useSession()
  const user = session?.user

  const getInitials = (name?: string) => {
    if (!name) return ''
    const parts = name.trim().split(' ')
    if (parts.length === 0) return ''
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

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
          <div className="size-10 rounded-full bg-surface-container-high border border-white/8 overflow-hidden cursor-pointer flex items-center justify-center">
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
          </div>
        )}
      </div>
    </header>
  )
}
