import { format } from 'date-fns'
import type { TransactionsSummary } from '@/features/transactions/types'
import { api } from '@/lib/api'

interface GetTransactionsSummaryRequestQuery {
  startDate: Date
  endDate: Date
}

export async function getTransactionsSummaryRequest({
  startDate,
  endDate
}: GetTransactionsSummaryRequestQuery) {
  const response = await api.get<TransactionsSummary>('/transactions/summary', {
    params: {
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd')
    }
  })

  return response.data
}
