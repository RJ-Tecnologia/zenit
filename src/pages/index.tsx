import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { endOfMonth, startOfMonth } from 'date-fns'
import z from 'zod'
import { getTransactionsSummaryRequest } from '@/http/get-transactions-summary'
import { DashboardSummary } from './-components/dashboard-summary'
import { MonthNavigator } from './-components/month-navigator'

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    meta: [
      {
        title: 'Dashboard - Zenit Finance'
      }
    ]
  }),
  validateSearch: z.object({
    month: z.coerce.number().optional(),
    year: z.coerce.number().optional()
  })
})

function HomePage() {
  const { month, year } = Route.useSearch()

  const now = new Date()
  const selectedMonth = month ?? now.getMonth() + 1
  const selectedYear = year ?? now.getFullYear()

  const startDate = startOfMonth(new Date(selectedYear, selectedMonth - 1, 1))
  const endDate = endOfMonth(new Date(selectedYear, selectedMonth - 1, 1))

  const { data: transactionsSummary } = useQuery({
    queryKey: ['get-transactions-summary', { startDate, endDate }],
    queryFn: () => getTransactionsSummaryRequest({ startDate, endDate })
  })

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Bem-vindo de volta!
          </h2>
          <p className="text-muted-foreground">
            Aqui está um resumo das suas finanças
          </p>
        </div>

        <MonthNavigator month={selectedMonth} year={selectedYear} />
      </div>

      <DashboardSummary summary={transactionsSummary} />
    </main>
  )
}
