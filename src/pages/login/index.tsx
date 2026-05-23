import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  ArrowRight,
  Eye,
  EyeOff,
  Landmark,
  Loader2,
  Lock,
  Mail
} from 'lucide-react'
import { useState } from 'react'
import { SignInWithGoogle } from '@/components/core/sign-in-with-google'
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
  const queryClient = useQueryClient()

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
      queryClient.invalidateQueries({ queryKey: ['session'] })
      navigate({ to: '/' })
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-4 py-12 selection:bg-primary/30 selection:text-primary-fixed">
      {/* Ambient Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50 mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-secondary-container/20 rounded-full blur-[100px] pointer-events-none opacity-40 mix-blend-screen" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[460px]">
        {/* Login Card */}
        <main className="bg-surface/50 backdrop-blur-[20px] border border-white/5 rounded-[24px] p-8 sm:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden group">
          {/* Inner Glow Highlight */}
          <div className="absolute inset-0 rounded-[24px] border-t border-white/10 pointer-events-none mix-blend-overlay" />

          {/* Header & Logo Area */}
          <header className="flex flex-col items-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center mb-6 border border-primary/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
              <Landmark className="size-7 text-primary" strokeWidth={1.5} />
            </div>
            <h1 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface mb-2 text-center tracking-tight">
              Bem-vindo ao Zenit
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant text-center">
              Sua jornada financeira começa aqui
            </p>
          </header>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="space-y-2">
              <label
                className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider"
                htmlFor="email"
              >
                E-mail
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-outline-variant pointer-events-none"
                  strokeWidth={1.5}
                />
                <input
                  className="w-full bg-[#0f172a] border border-outline-variant rounded-lg pl-12 pr-4 py-3.5 font-body-md text-body-md text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 disabled:opacity-50"
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider"
                  htmlFor="password"
                >
                  Senha
                </label>
                <button
                  type="button"
                  className="font-label-sm text-label-sm text-primary hover:text-primary-fixed transition-colors"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-outline-variant pointer-events-none"
                  strokeWidth={1.5}
                />
                <input
                  className="w-full bg-[#0f172a] border border-outline-variant rounded-lg pl-12 pr-12 py-3.5 font-body-md text-body-md text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 disabled:opacity-50"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface focus:outline-none"
                  aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
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
              <div className="rounded-md bg-error/15 p-3 text-sm text-error">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              className="w-full bg-primary text-on-primary font-title-md text-title-md py-3.5 rounded-lg relative overflow-hidden active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 mt-4 shadow-[0_0_20px_rgba(78,222,163,0.15)] hover:shadow-[0_0_25px_rgba(78,222,163,0.25)] hover:bg-primary-fixed disabled:opacity-50 disabled:active:scale-100"
              type="submit"
              disabled={isLoading}
            >
              <div className="absolute inset-0 rounded-lg border-t border-white/30 pointer-events-none mix-blend-overlay" />
              {isLoading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  <span>Entrando...</span>
                </>
              ) : (
                <>
                  <span>Entrar</span>
                  <ArrowRight className="size-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-outline-variant to-transparent opacity-50" />
            <span className="font-label-sm text-label-sm text-outline-variant uppercase">
              ou
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-outline-variant to-transparent opacity-50" />
          </div>

          {/* Social Login Button */}
          <SignInWithGoogle />

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="font-body-md text-body-md text-on-surface-variant">
              Não tem uma conta?
              <button
                type="button"
                className="text-primary hover:text-primary-fixed transition-colors font-semibold ml-1"
              >
                Criar conta
              </button>
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
