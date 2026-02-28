import { auth } from '@clerk/nextjs/server'
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

export async function RecentTransactionsCard() {
  const { userId } = await auth()
  const { transactionsCount, lastTransactions: transactions } =
    await getFinanceSummary(userId as string)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transações Recentes</CardTitle>
        <CardDescription>
          Você realizou {transactionsCount} transações este mês
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {transactions.map((transaction) => (
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
  )
}
