import { LandmarkIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/utils/format-currency'

interface BalanceCardProps {
  balance: number
  balanceChangePercentage?: number
}

export function BalanceCard({
  balance,
  balanceChangePercentage
}: BalanceCardProps) {
  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/8 rounded-2xl shadow-xl overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-6">
        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
          <LandmarkIcon className="size-6 stroke-[2px]" />
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-body-md font-semibold text-muted-foreground">
            Saldo Total
          </CardTitle>
          {balanceChangePercentage !== undefined && (
            <div
              className={cn(
                'flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border',
                balanceChangePercentage >= 0
                  ? 'bg-primary/10 text-primary border-primary/20'
                  : 'bg-error/10 text-error border-error/20'
              )}
            >
              {balanceChangePercentage >= 0 ? (
                <TrendingUpIcon className="size-3" />
              ) : (
                <TrendingDownIcon className="size-3" />
              )}
              {balanceChangePercentage >= 0 ? '+' : ''}
              {balanceChangePercentage}%
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <span className="text-title-md font-bold text-muted-foreground mb-1">
            R$
          </span>
          <div className="text-3xl md:text-4xl font-bold font-heading text-on-surface tabular-nums tracking-tight">
            {formatCurrency(balance).replace('R$', '').trim()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
