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
    <div className="px-6 md:px-10 py-6">
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl md:text-display-lg font-heading text-on-surface">
            Transações
          </h1>
          <p className="mt-1 md:mt-2 text-body-md md:text-body-lg text-muted-foreground">
            Gerencie suas transações financeiras.
          </p>
        </div>

        <NewTransactionButton />
      </div>

      <TransactionsContent />
    </div>
  )
}
