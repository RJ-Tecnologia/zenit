import type { Metadata } from 'next'
import { Suspense } from 'react'
import { DashboardSkeleton } from './_components/dashboard-skeleton'
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

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardSummary />
      </Suspense>
    </main>
  )
}
