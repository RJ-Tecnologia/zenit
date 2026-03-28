import type { TransactionType } from '@/features/transactions/types'
import { api } from '@/lib/api'

interface UpdateTransactionRequest {
  transactionId: string
  title: string
  amount: number
  description?: string
  type: TransactionType
  date: string
  categoryId: string
}

export async function updateTransactionRequest({
  transactionId,
  ...data
}: UpdateTransactionRequest) {
  await api.put(`/transactions/${transactionId}`, data)
}
