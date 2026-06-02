import { Link, useLocation } from '@tanstack/react-router'
import {
  LayoutGridIcon,
  ReceiptTextIcon,
  TriangleIcon,
  UserIcon
} from 'lucide-react'
import { NewTransactionButton } from '@/features/transactions/components/new-transaction-button'
import { cn } from '@/lib/utils'
import { LogoutButton } from './logout-button'

const navLinks = [
  { href: '/', label: 'Dashboard', icon: LayoutGridIcon },
  { href: '/transactions', label: 'Transações', icon: ReceiptTextIcon },
  { href: '/categories', label: 'Categorias', icon: TriangleIcon }
]

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/8 bg-surface-container-lowest hidden md:flex flex-col p-6">
      <div className="mb-10">
        <h1 className="text-xl font-bold text-primary font-heading">
          Zenit Finance
        </h1>
        <p className="text-xs text-muted-foreground">Organização Financeira</p>
      </div>

      <div className="mb-10">
        <NewTransactionButton className="w-full h-11 rounded-xl text-on-primary font-bold shadow-lg shadow-primary/20" />
      </div>

      <nav className="flex-1 space-y-2">
        {navLinks.map((link) => {
          const isActive =
            location.pathname === link.href ||
            (link.href !== '/' && location.pathname.startsWith(link.href))
          const Icon = link.icon

          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group relative',
                isActive
                  ? 'text-primary bg-primary/5'
                  : 'text-muted-foreground hover:text-on-surface hover:bg-white/5'
              )}
            >
              <Icon
                className={cn(
                  'size-5 stroke-[2px]',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground group-hover:text-on-surface'
                )}
              />
              {link.label}
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-l-full" />
              )}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto space-y-2 pt-6 border-t border-white/8">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-on-surface hover:bg-white/5 transition-all"
        >
          <UserIcon className="size-5 stroke-[2px]" />
          Perfil
        </Link>
        <LogoutButton variant="sidebar" />
      </div>
    </aside>
  )
}
