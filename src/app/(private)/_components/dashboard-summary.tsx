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

export function DashboardSummary() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<StatCardSkeleton />}>
          <BalanceCard />
        </Suspense>
        <Suspense fallback={<StatCardSkeleton />}>
          <IncomesCard />
        </Suspense>
        <Suspense fallback={<StatCardSkeleton />}>
          <OutcomesCard />
        </Suspense>
        <Suspense fallback={<StatCardSkeleton />}>
          <TransactionsCountCard />
        </Suspense>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <Suspense fallback={<RecentTransactionsCardSkeleton />}>
          <RecentTransactionsCard />
        </Suspense>

        <div className="grid gap-4 md:grid-cols-2">
          <Suspense fallback={<CategoryCardSkeleton />}>
            <OutcomeByCategoryCard />
          </Suspense>

          <Suspense fallback={<CategoryCardSkeleton />}>
            <IncomeByCategoryCard />
          </Suspense>
        </div>
      </div>
    </>
  )
}
