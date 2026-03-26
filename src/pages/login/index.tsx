import { createFileRoute } from '@tanstack/react-router'
import { SignInWithGoogle } from '@/components/core/sign-in-with-google'

export const Route = createFileRoute('/login/')({
  head: () => ({
    meta: [
      {
        title: 'Login - Zenit Finance'
      }
    ]
  }),
  component: LoginPage
})

function LoginPage() {
  return (
    <div className="min-h-screen text-white bg-zinc-900 flex flex-col items-center gap-4">
      <h1>Página de login</h1>

      <SignInWithGoogle />
    </div>
  )
}
