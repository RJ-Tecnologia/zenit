import { useQuery } from '@tanstack/react-query'
import { getCategoriesRequest } from '@/http/get-categories'
import { getTransactionsRequest } from '@/http/get-transactions'
import { TransactionsList } from './transaction-list'

export async function TransactionsContent() {
  const { data: transactionsData } = useQuery({
    queryKey: ['get-transactions'],
    queryFn: getTransactionsRequest
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['get-categories'],
    queryFn: getCategoriesRequest
  })

  return (
    <TransactionsList
      transactions={transactionsData?.transactions ?? []}
      categories={categoriesData?.categories ?? []}
    />
  )
}
