import { auth } from '@clerk/nextjs/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getFinanceSummary } from '@/features/transactions/actions/get-finance-summary'

export async function TransactionsCountCard() {
  const { userId } = await auth()
  const { transactionsCount } = await getFinanceSummary(userId as string)

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
        <p className="text-xs text-muted-foreground">
          +201 desde o mês passado
        </p>
      </CardContent>
    </Card>
  )
}
