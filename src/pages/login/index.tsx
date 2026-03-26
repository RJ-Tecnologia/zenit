import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { SignInWithGoogle } from '@/components/core/sign-in-with-google'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { env } from '@/env'
import { authClient } from '@/lib/auth-client'

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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { data, error: authError } = await authClient.signIn.email({
      email,
      password,
      callbackURL: `${env.VITE_BASE_URL}/`
    })

    if (authError) {
      setError(authError.message || 'Ocorreu um erro ao fazer login.')
      setIsLoading(false)
      return
    }

    if (data) {
      navigate({ to: '/' })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-4">
            <span className="text-2xl font-bold">Z</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Bem-vindo ao Zenit
          </h1>
          <p className="mt-2 text-muted-foreground">
            Sua jornada financeira começa aqui.
          </p>
        </div>

        <Card className="border-none shadow-xl bg-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold">Login</CardTitle>
            <CardDescription>
              Entre com seu e-mail e senha para acessar sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-sm font-medium text-primary hover:no-underline"
                    type="button"
                    tabIndex={-1}
                  >
                    Esqueceu a senha?
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                    aria-label={
                      showPassword ? 'Esconder senha' : 'Mostrar senha'
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground font-medium">
                  Ou continue com
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <SignInWithGoogle className="w-full" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-center gap-1 border-t pt-6 text-sm text-muted-foreground">
            Ainda não tem uma conta?{' '}
            <Button
              variant="link"
              className="h-auto p-0 font-medium text-primary hover:no-underline"
              type="button"
            >
              Criar conta
            </Button>
          </CardFooter>
        </Card>

        <p className="px-8 text-center text-sm text-muted-foreground">
          Ao clicar em entrar, você concorda com nossos{' '}
          <Button
            variant="link"
            className="h-auto p-0 text-sm underline-offset-4 hover:underline"
          >
            Termos de Serviço
          </Button>{' '}
          e{' '}
          <Button
            variant="link"
            className="h-auto p-0 text-sm underline-offset-4 hover:underline"
          >
            Política de Privacidade
          </Button>
          .
        </p>
      </div>
    </div>
  )
}
