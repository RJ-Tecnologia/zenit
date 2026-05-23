import { env } from '@/env'
import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'

interface SignInWithGoogleProps {
  className?: string
}

export function SignInWithGoogle({ className }: SignInWithGoogleProps) {
  const handleGoogleLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: 'google',
      callbackURL: `${env.VITE_BASE_URL}/`
    })

    if (error) {
      console.error(error.message)
    }
  }

  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className={cn(
        'w-full border border-primary/50 text-on-surface font-title-md text-title-md py-3.5 rounded-lg flex items-center justify-center gap-3 hover:bg-primary/10 hover:border-primary hover:text-primary transition-all duration-300 active:scale-[0.98]',
        className
      )}
    >
      <img
        src="/google-icon.svg"
        alt="Google Icon"
        width={22}
        height={22}
        className="shrink-0"
      />
      Fazer login com Google
    </button>
  )
}
