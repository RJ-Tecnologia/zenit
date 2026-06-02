import { Link, useLocation } from '@tanstack/react-router'
import {
  LayoutGridIcon,
  MenuIcon,
  ReceiptTextIcon,
  TriangleIcon,
  UserIcon
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { LogoutButton } from './logout-button'

const navLinks = [
  { href: '/', label: 'Dashboard', icon: LayoutGridIcon },
  { href: '/transactions', label: 'Transações', icon: ReceiptTextIcon },
  { href: '/categories', label: 'Categorias', icon: TriangleIcon }
]

export function MobileHeader() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <header className="md:hidden flex h-16 items-center justify-between px-6 border-b border-white/8 bg-surface-container-lowest sticky top-0 z-50">
      <div className="flex flex-col">
        <h1 className="text-lg font-bold text-primary font-heading">
          Zenit Finance
        </h1>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <MenuIcon className="size-6 stroke-[2px]" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-surface-container-lowest border-l border-white/8 p-6 flex flex-col"
        >
          <SheetHeader className="text-left mb-8">
            <SheetTitle className="text-xl font-bold text-primary font-heading">
              Menu
            </SheetTitle>
          </SheetHeader>

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
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-4 rounded-lg text-base font-medium transition-all group relative',
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
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-4 rounded-lg text-base font-medium text-muted-foreground hover:text-on-surface hover:bg-white/5 transition-all"
            >
              <UserIcon className="size-5 stroke-[2px]" />
              Perfil
            </Link>
            <LogoutButton variant="sidebar" />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
