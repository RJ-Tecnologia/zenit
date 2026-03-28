import { createFileRoute } from '@tanstack/react-router'
import { endOfMonth, startOfMonth } from 'date-fns'
import { DashboardSummary } from './-components/dashboard-summary'

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    meta: [
      {
        title: 'Dashboard - Zenit Finance'
      }
    ]
  })
})

function HomePage() {
  const now = new Date()
  const selectedMonth = now.getMonth() + 1
  const selectedYear = now.getFullYear()

  const startDate = startOfMonth(new Date(selectedYear, selectedMonth - 1, 1))
  const endDate = endOfMonth(new Date(selectedYear, selectedMonth - 1, 1))

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
      </div>

      <DashboardSummary startDate={startDate} endDate={endDate} />
    </main>
  )
}
