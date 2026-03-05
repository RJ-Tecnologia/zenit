import { auth } from '@clerk/nextjs/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getFinanceSummary } from '@/features/transactions/actions/get-finance-summary'

interface TransactionsCountCardProps {
  startDate: Date
  endDate: Date
}

export async function TransactionsCountCard({
  startDate,
  endDate
}: TransactionsCountCardProps) {
  const { userId } = await auth()
  const { transactionsCount, transactionsCountChangePercentage } =
    await getFinanceSummary(userId as string, startDate, endDate)

  return (
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
        <div className="text-2xl font-bold">{transactionsCount}</div>
        {transactionsCountChangePercentage !== null && (
          <p className="text-xs text-muted-foreground">
            {transactionsCountChangePercentage >= 0 ? '+' : ''}
            {transactionsCountChangePercentage.toFixed(1)}% em relação ao mês
            passado
          </p>
        )}
      </CardContent>
    </Card>
  )
}
