import { TrendingUpIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/utils/format-currency'

interface IncomesCardProps {
  income: number
  incomeChangePercentage?: number
}

export function IncomesCard({
  income,
  incomeChangePercentage
}: IncomesCardProps) {
  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/8 rounded-2xl shadow-xl overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-6">
        <div className="size-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary border border-tertiary/20 shadow-inner">
          <TrendingUpIcon className="size-6 stroke-[2px]" />
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-body-md font-semibold text-muted-foreground">
          Receitas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <span className="text-title-md font-bold text-muted-foreground mb-1">
            R$
          </span>
          <div className="text-3xl md:text-4xl font-bold font-heading text-on-surface tabular-nums tracking-tight">
            {formatCurrency(income).replace('R$', '').trim()}
          </div>
        </div>
        {incomeChangePercentage !== undefined && (
          <p className="mt-2 text-[10px] text-muted-foreground font-medium">
            Mês anterior:{' '}
            <span className="text-on-surface">
              {incomeChangePercentage >= 0 ? '+' : ''}
              {incomeChangePercentage}%
            </span>
          </p>
        )}
      </CardContent>
    </Card>
  )
}
