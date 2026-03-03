'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/transactions', label: 'Transações' }
]

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center gap-1">
      {navLinks.map((link) => {
        const isActive = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
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
