import { auth } from '@clerk/nextjs/server'
import { getTransactions } from '@/actions/get-transactions'
import { getUserCategories } from '@/actions/get-user-categories'
import { NewTransactionDialog } from '@/components/transaction/new-transaction-dialog'
import { TransactionsList } from '@/components/transaction/transactions-list'

export default async function TransactionsPage() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('User not authenticated!')
  }

  const [transactions, categories] = await Promise.all([
    getTransactions(userId),
    getUserCategories(userId)
  ])

  return (
    <div className="container mx-auto py-6 px-4 md:py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transações</h1>
          <p className="mt-2 text-muted-foreground">
            Gerencie suas transações financeiras
          </p>
        </div>

        <NewTransactionDialog categories={categories} />
      </div>

      <TransactionsList transactions={transactions} />
    </div>
  )
}
