import type { Transaction } from '@/features/transactions/types'
import { api } from '@/lib/api'

interface GetTransactionsResponse {
  transactions: Transaction[]
  meta: {
    currentPage: number
    lastPage: number
    perPage: number
    total: number
  }
}

interface GetTransactionsRequest {
  title?: string
  type?: 'INCOME' | 'OUTCOME'
  page?: number
  limit?: number
}

export async function getTransactionsRequest({
  title,
  type,
  page = 1,
  limit = 20
}: GetTransactionsRequest = {}) {
  const response = await api.get<GetTransactionsResponse>('/transactions', {
    params: {
      title,
      type,
      page,
      limit
    }
  })

  return response.data
}
