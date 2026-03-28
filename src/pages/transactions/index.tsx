import { createFileRoute } from '@tanstack/react-router'
import { NewTransactionButton } from '@/features/transactions/components/new-transaction-button'
import { TransactionsContent } from '@/features/transactions/components/transaction-content'

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
    <div className="container mx-auto py-6 px-4 md:py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transações</h1>
          <p className="mt-2 text-muted-foreground">
            Gerencie suas transações financeiras
          </p>
        </div>

        <NewTransactionButton />
      </div>

      <TransactionsContent />
    </div>
  )
}
