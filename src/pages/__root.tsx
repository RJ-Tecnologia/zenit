import {
  createRootRoute,
  Outlet,
  redirect,
  useLocation
} from '@tanstack/react-router'
import { LogoutButton } from '@/components/core/logout-button'
import { NavLinks } from '@/components/core/nav-links'
import { ThemeToggle } from '@/components/core/theme-toggle'
import { authClient } from '@/lib/auth-client'

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    const { data: session } = await authClient.getSession()

    const isLoginPage = ['/login', '/login/'].includes(location.pathname)

    if (!session && !isLoginPage) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      })
    }

    if (session && isLoginPage) {
      throw redirect({
        to: '/'
      })
    }
  },
  component: RootComponent
})

function RootComponent() {
  const location = useLocation()
  const isLoginPage = ['/login', '/login/'].includes(location.pathname)

  return (
    <div className="min-h-screen bg-background">
      {!isLoginPage && (
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
              <LogoutButton />
            </div>
          </div>
        </header>
      )}
      <main>
        <Outlet />
      </main>
    </div>
  )
}
