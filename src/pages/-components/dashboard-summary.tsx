import type { TransactionsSummary } from '@/features/transactions/types'
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
  summary?: TransactionsSummary
}

export function DashboardSummary({ summary }: DashboardSummaryProps) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summary ? (
          <>
            <BalanceCard
              balance={summary.balance}
              balanceChangePercentage={summary.balanceChangePercentage}
            />
            <IncomesCard
              income={summary.income}
              incomeChangePercentage={summary.incomeChangePercentage}
            />
            <OutcomesCard
              outcome={summary.outcome}
              outcomeChangePercentage={summary.outcomeChangePercentage}
            />
            <TransactionsCountCard
              transactionsCount={summary.transactionsCount}
              transactionsCountChangePercentage={
                summary.transactionsCountChangePercentage
              }
            />
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
          {summary ? (
            <>
              <OutcomeByCategoryCard
                categoriesSummary={summary.outcomeCategoriesSummary}
              />
              <IncomeByCategoryCard
                categoriesSummary={summary.incomeCategoriesSummary}
              />
            </>
          ) : (
            <>
              <CategoryCardSkeleton />
              <CategoryCardSkeleton />
            </>
          )}
        </div>

        {summary ? (
          <RecentTransactionsCard transactions={summary.lastTransactions} />
        ) : (
          <RecentTransactionsCardSkeleton />
        )}
      </div>
    </>
  )
}
