import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    meta: [
      {
        title: 'Início - Zenit Finance'
      }
    ]
  })
})

function HomePage() {
  return <h1 className="text-4xl text-blue-500">Atualizei a página!</h1>
}
