import { Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { ArrowDownIcon, ArrowUpIcon, ReceiptTextIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { LastTransactionSummary } from '@/features/transactions/types'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/utils/format-currency'

interface RecentTransactionsCardProps {
  transactions: LastTransactionSummary[]
}

export function RecentTransactionsCard({
  transactions
}: RecentTransactionsCardProps) {
  const hasData = transactions.length > 0

  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/8 rounded-2xl shadow-xl overflow-hidden">
      <CardHeader>
        <CardTitle className="text-title-md font-heading text-on-surface">
          Transações Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <div className="space-y-6">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center group">
                <div
                  className={cn(
                    'size-10 rounded-xl flex items-center justify-center border border-white/8 shadow-inner mr-4 transition-colors',
                    transaction.type === 'INCOME'
                      ? 'bg-primary/10 text-primary group-hover:bg-primary/20'
                      : 'bg-error/10 text-error group-hover:bg-error/20'
                  )}
                >
                  {transaction.type === 'INCOME' ? (
                    <ArrowUpIcon className="size-5 stroke-[2.5px]" />
                  ) : (
                    <ArrowDownIcon className="size-5 stroke-[2.5px]" />
                  )}
                </div>
                <div className="flex-1 space-y-0.5">
                  <p className="text-body-md font-bold text-on-surface">
                    {transaction.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                    {format(new Date(transaction.date), 'dd/MM/yyyy')}
                  </p>
                </div>
                <div
                  className={cn(
                    'text-body-md font-bold tabular-nums',
                    transaction.type === 'INCOME'
                      ? 'text-primary'
                      : 'text-error'
                  )}
                >
                  {transaction.type === 'INCOME' ? '+ ' : '- '}
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-white/8">
              <Link
                to="/transactions"
                className="text-sm font-bold text-primary hover:text-primary/80 transition-colors flex items-center justify-center gap-2"
              >
                Ver todas as transações
              </Link>
            </div>
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="size-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/8">
              <ReceiptTextIcon className="size-8 text-muted-foreground/50 stroke-[1.5px]" />
            </div>
            <p className="text-body-md font-semibold text-on-surface mb-1">
              Nenhuma transação recente
            </p>
            <p className="text-sm text-muted-foreground max-w-[250px]">
              Suas movimentações aparecerão aqui assim que você começar a
              registrar.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
