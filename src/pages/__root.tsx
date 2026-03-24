import { createRootRoute, Outlet, redirect } from '@tanstack/react-router'
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
  return <Outlet />
}
