import { Button } from '@/components/ui/button'
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
    <Button
      onClick={handleGoogleLogin}
      variant="outline"
      className={cn(
        'h-11 rounded-md bg-white px-6 text-black hover:bg-neutral-100 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800',
        className
      )}
    >
      <img
        src="/google-icon.svg"
        alt="Google Icon"
        width={18}
        height={18}
        className="shrink-0 mr-2"
      />
      Fazer login com Google
    </Button>
  )
}
