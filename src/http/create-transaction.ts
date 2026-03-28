import type { TransactionType } from '@/features/transactions/types'
import { api } from '@/lib/api'

interface CreateTransactionRequest {
  title: string
  description?: string
  amount: number
  type: TransactionType
  date: string
  categoryId: string
}

export async function createTransactionRequest(data: CreateTransactionRequest) {
  await api.post('/transactions', data)
}
