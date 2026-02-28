import { auth } from '@clerk/nextjs/server'
import { getFinanceSummary } from '@/features/transactions/actions/get-finance-summary'
import { BalanceCard } from './balance-card'
import { IncomeByCategoryCard } from './income-by-category-card'
import { IncomesCard } from './incomes-card'
import { OutcomeByCategoryCard } from './outcome-by-category-card'
import { OutcomesCard } from './outcomes-card'
import { RecentTransactionsCard } from './recent-transactions-card'
import { TransactionsCountCard } from './transactions-count-card'

export async function DashboardSummary() {
  const { userId } = await auth()
  const summary = await getFinanceSummary({
    clerkUserId: userId as string
  })

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <BalanceCard balance={summary.balance} />
        <IncomesCard income={summary.income} />
        <OutcomesCard outcome={summary.outcome} />
        <TransactionsCountCard transactionsCount={summary.transactionsCount} />
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <RecentTransactionsCard
          transactionsCount={summary.transactionsCount}
          transactions={summary.lastTransactions}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <OutcomeByCategoryCard
            categoriesSummary={summary.outcomeCategoriesSummary}
          />

          <IncomeByCategoryCard
            categoriesSummary={summary.incomeCategoriesSummary}
          />
        </div>
      </div>
    </>
  )
}
