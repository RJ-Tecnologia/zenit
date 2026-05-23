import { BarChart3Icon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CategorySummary } from '@/features/transactions/types'
import { formatCurrency } from '@/utils/format-currency'

interface IncomeByCategoryCardProps {
  categoriesSummary: CategorySummary[]
}

export function IncomeByCategoryCard({
  categoriesSummary
}: IncomeByCategoryCardProps) {
  const hasData = categoriesSummary.length > 0

  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/8 rounded-2xl shadow-xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-title-md font-heading text-on-surface">
          Principais receitas por categoria
        </CardTitle>
        <BarChart3Icon className="size-5 text-muted-foreground stroke-[2px]" />
      </CardHeader>
      <CardContent>
        {hasData ? (
          <div className="space-y-6">
            {categoriesSummary.map((category) => (
              <div key={category.name} className="flex items-center group">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 mr-4 group-hover:bg-primary/20 transition-colors">
                  <BarChart3Icon className="size-5 stroke-[2px]" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-body-md font-semibold text-on-surface">
                    {category.name}
                  </p>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="ml-6 text-right">
                  <div className="text-body-md font-bold text-primary">
                    {formatCurrency(category.amount)}
                  </div>
                  <p className="text-[10px] text-muted-foreground font-medium">
                    {category.percentage.toFixed(1)}% do total
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="size-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/8">
              <BarChart3Icon className="size-8 text-muted-foreground/50 stroke-[1.5px]" />
            </div>
            <p className="text-body-md font-semibold text-on-surface mb-1">
              Nenhum dado de receita disponível
            </p>
            <p className="text-sm text-muted-foreground max-w-[250px]">
              Adicione transações de entrada para visualizar o fluxo de ganhos
              por categoria.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
