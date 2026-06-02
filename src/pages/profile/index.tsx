import { createFileRoute } from '@tanstack/react-router'
import { LandmarkIcon, MailIcon, UserIcon } from 'lucide-react'
import { LogoutButton } from '@/components/core/logout-button'
import { Skeleton } from '@/components/ui/skeleton'
import { authClient } from '@/lib/auth-client'
import { getInitials } from '@/utils/get-initials'

export const Route = createFileRoute('/profile/')({
  head: () => ({
    meta: [
      {
        title: 'Perfil - Zenit Finance'
      }
    ]
  }),
  component: ProfilePage
})

function ProfilePage() {
  const { data: session, isPending } = authClient.useSession()
  const user = session?.user

  if (isPending) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <Skeleton className="w-full max-w-115 h-125 rounded-[24px]" />
      </div>
    )
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] max-w-200 max-h-200 bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50 mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] max-w-150 max-h-150 bg-secondary-container/20 rounded-full blur-[100px] pointer-events-none opacity-40 mix-blend-screen" />

      <main className="relative z-10 w-full max-w-115 bg-surface/50 backdrop-blur-[20px] border border-white/5 rounded-[24px] p-8 sm:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden group">
        <div className="absolute inset-0 rounded-[24px] border-t border-white/10 pointer-events-none mix-blend-overlay" />

        <header className="flex flex-col items-center mb-10">
          <div className="relative mb-6">
            <div className="size-24 rounded-full bg-surface-container-high border-2 border-primary/20 overflow-hidden flex items-center justify-center shadow-lg">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="size-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-primary">
                  {getInitials(user?.name)}
                </span>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 size-8 rounded-lg bg-primary flex items-center justify-center border-2 border-surface shadow-sm">
              <LandmarkIcon
                className="size-4 text-on-primary"
                strokeWidth={2}
              />
            </div>
          </div>
          <h1 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface mb-1 text-center tracking-tight">
            Seu Perfil
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant text-center">
            Informações da sua conta
          </p>
        </header>

        <div className="space-y-6">
          <div className="space-y-2">
            <label
              className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider"
              htmlFor="name"
            >
              Nome
            </label>
            <div className="relative">
              <UserIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-white pointer-events-none"
                strokeWidth={1.5}
              />
              <input
                className="w-full bg-[#0f172a] border border-outline-variant rounded-lg pl-12 pr-4 py-3.5 font-body-md text-body-md text-on-surface-variant cursor-not-allowed opacity-80"
                id="name"
                type="text"
                value={user?.name || ''}
                disabled
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider"
              htmlFor="email"
            >
              E-mail
            </label>
            <div className="relative">
              <MailIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-white pointer-events-none"
                strokeWidth={1.5}
              />
              <input
                className="w-full bg-[#0f172a] border border-outline-variant rounded-lg pl-12 pr-4 py-3.5 font-body-md text-body-md text-on-surface-variant cursor-not-allowed opacity-80"
                id="email"
                type="email"
                value={user?.email || ''}
                disabled
              />
            </div>
          </div>

          <div className="pt-6 border-t border-white/5">
            <LogoutButton variant="sidebar" />
          </div>
        </div>
      </main>
    </div>
  )
}
