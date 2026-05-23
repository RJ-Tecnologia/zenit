import { ArrowLeftRightIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TransactionsCountCardProps {
  transactionsCount: number
  transactionsCountChangePercentage?: number
}

export function TransactionsCountCard({
  transactionsCount,
  transactionsCountChangePercentage
}: TransactionsCountCardProps) {
  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/8 rounded-2xl shadow-xl overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-6">
        <div className="size-12 rounded-xl bg-white/10 flex items-center justify-center text-muted-foreground border border-white/10 shadow-inner">
          <ArrowLeftRightIcon className="size-6 stroke-[2px]" />
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-body-md font-semibold text-muted-foreground">
          Transações
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <span className="text-title-md font-bold text-muted-foreground mb-1">
            Total
          </span>
          <div className="text-3xl md:text-4xl font-bold font-heading text-on-surface tabular-nums tracking-tight">
            {transactionsCount}
          </div>
        </div>
        {transactionsCountChangePercentage !== undefined && (
          <p className="mt-2 text-[10px] text-muted-foreground font-medium">
            Mês anterior:{' '}
            <span className="text-on-surface">
              {transactionsCountChangePercentage >= 0 ? '+' : ''}
              {transactionsCountChangePercentage}%
            </span>
          </p>
        )}
      </CardContent>
    </Card>
  )
}
