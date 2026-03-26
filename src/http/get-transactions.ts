import type { Transaction } from '@/features/transactions/types'
import { api } from '@/lib/api'

interface GetTransactionsRequest {
  transactions: Transaction[]
}

export async function getTransactionsRequest() {
  const response = await api.get<GetTransactionsRequest>('/transactions')

  return response.data
}
