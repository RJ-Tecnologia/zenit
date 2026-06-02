import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { LogOutIcon } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { Button } from '../ui/button'

interface LogoutButtonProps {
  variant?: 'default' | 'sidebar'
}

export function LogoutButton({ variant = 'default' }: LogoutButtonProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          queryClient.setQueryData(['session'], null)
          queryClient.removeQueries({ queryKey: ['session'] })
          navigate({ to: '/login' })
        }
      }
    })
  }

  if (variant === 'sidebar') {
    return (
      <button
        type="button"
        onClick={handleLogout}
        className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-on-surface hover:bg-white/5 transition-all cursor-pointer"
      >
        <LogOutIcon className="size-5 stroke-[2px]" />
        Sair
      </button>
    )
  }

  return <Button onClick={handleLogout}>Logout</Button>
}
