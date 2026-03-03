import { UserButton } from '@clerk/nextjs'
import { ThemeToggle } from '@/components/theme-toggle'
import { NavLinks } from './_components/nav-links'

export default function LoggedAreaLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-8">
            <div>
              <h1 className="text-2xl font-bold">Zenit Finance</h1>
              <p className="text-sm text-muted-foreground">
                Dashboard Financeiro
              </p>
            </div>
            <NavLinks />
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserButton />
          </div>
        </div>
      </header>

      {children}
    </div>
  )
}
