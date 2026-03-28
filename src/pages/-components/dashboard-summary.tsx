import { useQuery } from '@tanstack/react-query'
import { getTransactionsSummaryRequest } from '@/http/get-transactions-summary'
import { BalanceCard } from './balance-card'
import {
  CategoryCardSkeleton,
  RecentTransactionsCardSkeleton,
  StatCardSkeleton
} from './dashboard-skeleton'
import { IncomeByCategoryCard } from './income-by-category-card'
import { IncomesCard } from './incomes-card'
import { OutcomeByCategoryCard } from './outcome-by-category-card'
import { OutcomesCard } from './outcomes-card'
import { RecentTransactionsCard } from './recent-transactions-card'
import { TransactionsCountCard } from './transactions-count-card'

interface DashboardSummaryProps {
  startDate: Date
  endDate: Date
}

export function DashboardSummary({
  startDate,
  endDate
}: DashboardSummaryProps) {
  const { data } = useQuery({
    queryKey: ['get-transactions-summary'],
    queryFn: () => getTransactionsSummaryRequest({ startDate, endDate })
  })

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data ? (
          <>
            <BalanceCard {...data} />
            <IncomesCard {...data} />
            <OutcomesCard {...data} />
            <TransactionsCountCard {...data} />
          </>
        ) : (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          {data ? (
            <>
              <OutcomeByCategoryCard
                categoriesSummary={data.outcomeCategoriesSummary}
              />
              <IncomeByCategoryCard
                categoriesSummary={data.incomeCategoriesSummary}
              />
            </>
          ) : (
            <>
              <CategoryCardSkeleton />
              <CategoryCardSkeleton />
            </>
          )}
        </div>

        {data ? (
          <RecentTransactionsCard transactions={data.lastTransactions} />
        ) : (
          <RecentTransactionsCardSkeleton />
        )}
      </div>
    </>
  )
}
