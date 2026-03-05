import { Suspense } from 'react'
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
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<StatCardSkeleton />}>
          <BalanceCard startDate={startDate} endDate={endDate} />
        </Suspense>
        <Suspense fallback={<StatCardSkeleton />}>
          <IncomesCard startDate={startDate} endDate={endDate} />
        </Suspense>
        <Suspense fallback={<StatCardSkeleton />}>
          <OutcomesCard startDate={startDate} endDate={endDate} />
        </Suspense>
        <Suspense fallback={<StatCardSkeleton />}>
          <TransactionsCountCard startDate={startDate} endDate={endDate} />
        </Suspense>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Suspense fallback={<CategoryCardSkeleton />}>
            <OutcomeByCategoryCard startDate={startDate} endDate={endDate} />
          </Suspense>

          <Suspense fallback={<CategoryCardSkeleton />}>
            <IncomeByCategoryCard startDate={startDate} endDate={endDate} />
          </Suspense>
        </div>

        <Suspense fallback={<RecentTransactionsCardSkeleton />}>
          <RecentTransactionsCard startDate={startDate} endDate={endDate} />
        </Suspense>
      </div>
    </>
  )
}
