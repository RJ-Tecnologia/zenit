import { api } from '@/lib/api'

interface DeleteTransactionRequest {
  transactionId: string
}

export async function deleteTransactionRequest({
  transactionId
}: DeleteTransactionRequest) {
  await api.delete(`/transactions/${transactionId}`)
}
