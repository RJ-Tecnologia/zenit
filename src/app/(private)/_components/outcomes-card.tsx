import { auth } from '@clerk/nextjs/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getFinanceSummary } from '@/features/transactions/actions/get-finance-summary'
import { formatCurrency } from '@/utils/format-currency'

export async function OutcomesCard() {
  const { userId } = await auth()
  const { outcome } = await getFinanceSummary(userId as string)

  return (
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
        <div className="text-2xl font-bold">{formatCurrency(outcome)}</div>
        <p className="text-xs text-muted-foreground">
          +19% em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
