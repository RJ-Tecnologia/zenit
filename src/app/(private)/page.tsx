import type { Metadata } from 'next'
import { DashboardSummary } from './_components/dashboard-summary'

export const metadata: Metadata = {
  title: 'Dashboard - Zenit Finance'
}

export default function HomePage() {
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

      <DashboardSummary />
    </main>
  )
}
