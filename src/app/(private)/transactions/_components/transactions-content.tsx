import { auth } from '@clerk/nextjs/server'
import { getUserCategories } from '@/features/categories/actions/get-user-categories'
import { getTransactions } from '@/features/transactions/actions/get-transactions'
import { TransactionsList } from '@/features/transactions/components/transactions-list'

export async function TransactionsContent() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('User not authenticated!')
  }

  const [transactions, categories] = await Promise.all([
    getTransactions(userId),
    getUserCategories(userId)
  ])

  return (
    <TransactionsList transactions={transactions} categories={categories} />
  )
}
