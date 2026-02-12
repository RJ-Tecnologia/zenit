import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { NewTransactionButton } from './_components/new-transaction-button'
import { TransactionsContent } from './_components/transactions-content'

export const metadata: Metadata = {
  title: 'Transações - Zenit Finance'
}

export default function TransactionsPage() {
  return (
    <div className="container mx-auto py-6 px-4 md:py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transações</h1>
          <p className="mt-2 text-muted-foreground">
            Gerencie suas transações financeiras
          </p>
        </div>

        <Suspense fallback={<Skeleton className="h-10 w-40" />}>
          <NewTransactionButton />
        </Suspense>
      </div>

      <Suspense
        fallback={
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        }
      >
        <TransactionsContent />
      </Suspense>
    </div>
  )
}
