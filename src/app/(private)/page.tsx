import { auth } from '@clerk/nextjs/server'
import type { Metadata } from 'next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { getFinanceSummary } from '@/features/transactions/actions/get-finance-summary'
import { formatCurrency } from '@/utils/format-currency'
import { formatDateTime } from '@/utils/format-datetime'

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

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <title>Saldo total</title>
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summary.balance)}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% em relação ao mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <title>Receitas</title>
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summary.income)}
            </div>
            <p className="text-xs text-muted-foreground">
              +180.1% em relação ao mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <title>Despesas</title>
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summary.outcome)}
            </div>
            <p className="text-xs text-muted-foreground">
              +19% em relação ao mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transações</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <title>Transações</title>
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary.transactionsCount}
            </div>
            <p className="text-xs text-muted-foreground">
              +201 desde o mês passado
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Transações Recentes</CardTitle>
            <CardDescription>
              Você realizou {summary.transactionsCount} transações este mês
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {summary.lastTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {transaction.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDateTime(transaction.date)}
                    </p>
                  </div>
                  <div
                    data-type={transaction.type}
                    className="ml-auto font-medium data-[type=INCOME]:text-green-600 data-[type=OUTCOME]:text-red-600"
                  >
                    {formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Principais despesas por categoria</CardTitle>
              <CardDescription>
                Top 3 categorias com mais gastos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {summary.outcomeCategoriesSummary.map((category) => (
                  <div key={category.name} className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {category.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {category.percentage.toFixed(1)}% do total
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-red-600">
                      {formatCurrency(category.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Principais receitas por categoria</CardTitle>
              <CardDescription>
                Top 3 categorias com mais rendimentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {summary.incomeCategoriesSummary.map((category) => (
                  <div key={category.name} className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {category.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {category.percentage.toFixed(1)}% do total
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-green-600">
                      {formatCurrency(category.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
