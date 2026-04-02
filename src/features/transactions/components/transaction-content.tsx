import { useQuery } from '@tanstack/react-query'
import { InboxIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
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

  const isLoading = isLoadingTransactions || isLoadingCategories
  const hasTransactions = (transactionsData?.transactions.length ?? 0) > 0

  if (!isLoading && !hasTransactions) {
    return (
      <Card className="flex flex-col items-center justify-center py-20 text-center">
        <InboxIcon
          className="size-12 text-muted-foreground/50 mb-4"
          strokeWidth={1.5}
        />
        <p className="text-muted-foreground max-w-xs px-6">
          Não há itens a serem exibidos. Por favor, comece adicionando uma
          movimentação.
        </p>
      </Card>
    )
  }

  return (
    <TransactionsList
      transactions={transactionsData?.transactions ?? []}
      categories={categoriesData?.categories ?? []}
      isLoading={isLoading}
    />
  )
}
