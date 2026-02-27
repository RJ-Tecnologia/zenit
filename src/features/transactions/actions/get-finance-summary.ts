'use server'

import type { TransactionType } from '@/generated/prisma/enums'
import { getTransactions } from './get-transactions'

interface FinanceSummary {
  balance: number
  income: number
  outcome: number
  transactionsCount: number
  lastTransactions: {
    id: string
    title: string
    amount: number
    category: string
    type: TransactionType
  }[]
}

export async function getFinanceSummary(
  clerkUserId: string
): Promise<FinanceSummary> {
  const transactions = await getTransactions(clerkUserId)
  const { income, outcome } = transactions.reduce(
    (acc, current) => {
      if (current.type === 'INCOME') {
        return {
          income: acc.income + parseFloat(current.amount),
          outcome: acc.outcome
        }
      }

      return {
        income: acc.income,
        outcome: acc.outcome + parseFloat(current.amount)
      }
    },
    { income: 0, outcome: 0 }
  )

  const lastTransactions = transactions.slice(0, 5).map((transaction) => {
    return {
      id: transaction.id,
      title: transaction.title,
      amount: parseFloat(transaction.amount),
      category: transaction.category.name,
      type: transaction.type
    }
  })

  return {
    balance: income - outcome,
    income,
    outcome,
    transactionsCount: transactions.length,
    lastTransactions
  }
}
