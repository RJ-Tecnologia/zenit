import { Link, useLocation } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/transactions', label: 'Transações' }
]

export function NavLinks() {
  const location = useLocation()

  return (
    <nav className="hidden md:flex items-center gap-1">
      {navLinks.map((link) => {
        const isActive = location.pathname === link.href
        return (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground'
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
