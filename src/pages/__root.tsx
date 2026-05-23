import { type QueryClient, queryOptions } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  redirect,
  useLocation
} from '@tanstack/react-router'
import { MobileHeader } from '@/components/core/mobile-header'
import { Sidebar } from '@/components/core/sidebar'
import { TopBar } from '@/components/core/top-bar'
import { authClient } from '@/lib/auth-client'

export const sessionQueryOptions = queryOptions({
  queryKey: ['session'],
  queryFn: async () => {
    const { data: session } = await authClient.getSession()
    return session
  },
  staleTime: 1000 * 60 * 60
})

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      {
        title: 'Zenit Finance'
      }
    ]
  }),
  beforeLoad: async ({ context, location }) => {
    const session =
      await context.queryClient.ensureQueryData(sessionQueryOptions)

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
    <div className="min-h-screen bg-background text-on-background font-body-md">
      <HeadContent />
      {!isLoginPage && (
        <>
          <Sidebar />
          <MobileHeader />
          <div className="md:pl-64 flex flex-col min-h-screen">
            <TopBar />
            <main className="flex-1 overflow-y-auto pb-10">
              <Outlet />
            </main>
          </div>
        </>
      )}
      {isLoginPage && (
        <main>
          <Outlet />
        </main>
      )}
    </div>
  )
}
