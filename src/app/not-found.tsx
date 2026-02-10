import { FileQuestion, Home } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-8 rounded-full bg-primary/10 p-6">
          <FileQuestion className="h-16 w-16 text-primary" />
        </div>

        <h1 className="mb-4 text-6xl font-bold text-foreground md:text-8xl">
          404
        </h1>

        <h2 className="mb-3 text-2xl font-semibold text-foreground md:text-3xl">
          Página não encontrada
        </h2>

        <p className="mb-8 text-muted-foreground md:text-lg">
          Desculpe, não conseguimos encontrar a página que você está procurando.
          Verifique se o endereço está correto ou retorne para a página inicial.
        </p>

        <Button asChild size="lg" className="group">
          <Link href="/">
            <Home className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
            Voltar para a página inicial
          </Link>
        </Button>
      </div>
    </div>
  )
}
