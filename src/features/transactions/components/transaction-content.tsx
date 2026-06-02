import { useQuery } from '@tanstack/react-query'
import { InboxIcon, SlidersHorizontalIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getCategoriesRequest } from '@/http/get-categories'
import { getTransactionsRequest } from '@/http/get-transactions'
import { TransactionsList } from './transaction-list'

export function TransactionsContent() {
  const [activeTab, setActiveTab] = useState('all')

  const { data: transactionsData, isLoading: isLoadingTransactions } = useQuery(
    {
      queryKey: ['get-transactions'],
      queryFn: getTransactionsRequest
    }
  )

  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['get-categories'],
    queryFn: () => getCategoriesRequest()
  })

  const isLoading = isLoadingTransactions || isLoadingCategories
  const transactions = transactionsData?.transactions ?? []

  const filteredTransactions = transactions.filter((transaction) => {
    if (activeTab === 'income') return transaction.type === 'INCOME'
    if (activeTab === 'outcome') return transaction.type === 'OUTCOME'
    return true
  })

  const hasTransactions = transactions.length > 0

  if (!isLoading && !hasTransactions) {
    return (
      <Card className="flex flex-col items-center justify-center py-20 text-center bg-white/5 backdrop-blur-xl border-white/8">
        <InboxIcon
          className="size-12 text-muted-foreground/50 mb-4"
          strokeWidth={1.5}
        />
        <p className="text-muted-foreground max-w-xs px-6 text-body-md">
          Não há itens a serem exibidos. Por favor, comece adicionando uma
          movimentação.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white/5 backdrop-blur-xl border border-white/8 p-2 rounded-2xl">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full sm:w-auto"
        >
          <TabsList className="bg-transparent h-auto p-0 gap-1">
            <TabsTrigger
              value="all"
              className="px-6 py-2.5 rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-primary text-body-md font-semibold transition-all"
            >
              Todos
            </TabsTrigger>
            <TabsTrigger
              value="income"
              className="px-6 py-2.5 rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-primary text-body-md font-semibold transition-all"
            >
              Entradas
            </TabsTrigger>
            <TabsTrigger
              value="outcome"
              className="px-6 py-2.5 rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-primary text-body-md font-semibold transition-all"
            >
              Saídas
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button
          variant="ghost"
          className="gap-2 text-primary hover:text-primary hover:bg-primary/10 font-bold px-6 h-11 rounded-xl"
        >
          <SlidersHorizontalIcon className="size-4" />
          Filtros Avançados
        </Button>
      </div>

      <TransactionsList
        transactions={filteredTransactions}
        categories={categoriesData?.categories ?? []}
        isLoading={isLoading}
        totalCount={transactionsData?.transactions.length ?? 0}
      />
    </div>
  )
}
