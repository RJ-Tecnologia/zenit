import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/transactions/')({
  head: () => ({
    meta: [
      {
        title: 'Transações - Zenit Finance'
      }
    ]
  }),
  component: TransactionsPage
})

function TransactionsPage() {
  return (
    <div className="min-h-screen text-white bg-zinc-900 flex flex-col items-center gap-4">
      <h1>Transações</h1>
    </div>
  )
}
