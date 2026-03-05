import { endOfMonth, startOfMonth } from 'date-fns'
import type { Metadata } from 'next'
import { DashboardSummary } from './_components/dashboard-summary'
import { MonthNavigator } from './_components/month-navigator'

export const metadata: Metadata = {
  title: 'Dashboard - Zenit Finance'
}

interface HomePageProps {
  searchParams: Promise<{ month?: string; year?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { month, year } = await searchParams

  const now = new Date()
  const selectedMonth = Number(month) || now.getMonth() + 1
  const selectedYear = Number(year) || now.getFullYear()

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

        <MonthNavigator />
      </div>

      <DashboardSummary startDate={startDate} endDate={endDate} />
    </main>
  )
}
