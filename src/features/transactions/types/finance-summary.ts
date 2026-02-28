import type { TransactionType } from '@/generated/prisma/enums'

export interface CategorySummary {
  name: string
  percentage: number
  amount: number
}

export interface FinanceSummary {
  balance: number
  income: number
  outcome: number
  transactionsCount: number
  lastTransactions: {
    id: string
    title: string
    date: Date
    amount: number
    category: string
    type: TransactionType
  }[]
  outcomeCategoriesSummary: CategorySummary[]
  incomeCategoriesSummary: CategorySummary[]
}
