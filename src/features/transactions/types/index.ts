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
