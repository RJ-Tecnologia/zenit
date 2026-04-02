import { useQuery } from '@tanstack/react-query'
import { getCategoriesRequest } from '@/http/get-categories'
import { getTransactionsRequest } from '@/http/get-transactions'
import { TransactionsList } from './transaction-list'

export function TransactionsContent() {
  const { data: transactionsData, isLoading: isLoadingTransactions } = useQuery(
    {
      queryKey: ['get-transactions'],
      queryFn: getTransactionsRequest
    }
  )

  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['get-categories'],
    queryFn: getCategoriesRequest
  })

  return (
    <TransactionsList
      transactions={transactionsData?.transactions ?? []}
      categories={categoriesData?.categories ?? []}
      isLoading={isLoadingTransactions || isLoadingCategories}
    />
  )
}
