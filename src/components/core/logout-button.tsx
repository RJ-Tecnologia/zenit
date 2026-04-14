import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'
import { Button } from '../ui/button'

export function LogoutButton() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['session'] })
          navigate({ to: '/login' })
        }
      }
    })
  }

  return <Button onClick={handleLogout}>Logout</Button>
}
