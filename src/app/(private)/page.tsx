import { auth } from '@clerk/nextjs/server'
import type { Metadata } from 'next'
import { getFinanceSummary } from '@/features/transactions/actions/get-finance-summary'
import { BalanceCard } from './_components/balance-card'
import { IncomeByCategoryCard } from './_components/income-by-category-card'
import { IncomesCard } from './_components/incomes-card'
import { OutcomeByCategoryCard } from './_components/outcome-by-category-card'
import { OutcomesCard } from './_components/outcomes-card'
import { RecentTransactionsCard } from './_components/recent-transactions-card'
import { TransactionsCountCard } from './_components/transactions-count-card'

export const metadata: Metadata = {
  title: 'Dashboard - Zenit Finance'
}

export default async function HomePage() {
  const { userId } = await auth()
  const summary = await getFinanceSummary(userId as string)

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">
          Bem-vindo de volta!
        </h2>
        <p className="text-muted-foreground">
          Aqui está um resumo das suas finanças
        </p>
      </div>

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
    </main>
  )
}
