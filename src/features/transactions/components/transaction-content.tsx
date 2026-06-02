import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { InboxIcon, SearchIcon, SlidersHorizontalIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useDebounce } from '@/hooks/use-debounce'
import { getCategoriesRequest } from '@/http/get-categories'
import { getTransactionsRequest } from '@/http/get-transactions'
import { Route } from '@/pages/transactions/index'
import { TransactionsList } from './transaction-list'

export function TransactionsContent() {
  const { q = '', type = 'all', page = 1, limit = 20 } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const debouncedTitle = useDebounce(q, 500)

  const { data: transactionsData, isLoading: isLoadingTransactions } = useQuery(
    {
      queryKey: ['get-transactions', debouncedTitle, type, page, limit],
      queryFn: () =>
        getTransactionsRequest({
          title: debouncedTitle || undefined,
          type:
            type === 'all'
              ? undefined
              : (type?.toUpperCase() as 'INCOME' | 'OUTCOME'),
          page,
          limit
        })
    }
  )

  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['get-categories'],
    queryFn: () => getCategoriesRequest()
  })

  const isLoading = isLoadingTransactions || isLoadingCategories
  const transactions = transactionsData?.transactions ?? []
  const meta = transactionsData?.meta

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: (old) => ({
        ...old,
        q: e.target.value || undefined,
        page: 1
      }),
      replace: true
    })
  }

  const handleTabChange = (value: string) => {
    navigate({
      search: (old) => ({
        ...old,
        type: value as 'all' | 'income' | 'outcome',
        page: 1
      })
    })
  }

  const hasTransactions = transactions.length > 0 || !!q || type !== 'all'

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
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-white/5 backdrop-blur-xl border border-white/8 p-2 rounded-2xl">
        <div className="flex flex-col sm:items-center sm:flex-row gap-4 flex-1">
          <Tabs
            value={type}
            onValueChange={handleTabChange}
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

          <div className="relative flex-1 max-w-md">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título..."
              value={q ?? ''}
              onChange={handleSearchChange}
              className="pl-11 bg-white/5 border-white/8 rounded-xl h-11"
            />
          </div>
        </div>

        <Button
          variant="ghost"
          className="gap-2 text-primary hover:text-primary hover:bg-primary/10 font-bold px-6 h-11 rounded-xl"
        >
          <SlidersHorizontalIcon className="size-4" />
          Filtros Avançados
        </Button>
      </div>

      <TransactionsList
        transactions={transactions}
        categories={categoriesData?.categories ?? []}
        isLoading={isLoading}
        meta={meta}
      />
    </div>
  )
}
