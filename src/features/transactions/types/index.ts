export type TransactionType = 'INCOME' | 'OUTCOME'

export interface Transaction {
  id: string
  title: string
  description?: string
  type: TransactionType
  amount: number
  date: string
  categoryId: string
}

export interface LastTransactionSummary {
  id: string
  title: string
  date: string
  amount: number
  category: string
  type: TransactionType
}

export interface CategorySummary {
  name: string
  percentage: number
  amount: number
}

export interface TransactionsSummary {
  balance: number
  income: number
  outcome: number
  transactionsCount: number
  lastTransactions: LastTransactionSummary[]
  outcomeCategoriesSummary: CategorySummary[]
  incomeCategoriesSummary: CategorySummary[]
  balanceChangePercentage?: number
  incomeChangePercentage?: number
  outcomeChangePercentage?: number
  transactionsCountChangePercentage?: number
}
