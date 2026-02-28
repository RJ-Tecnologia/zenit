import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import type { CategorySummary } from '@/features/transactions/types/finance-summary'
import { formatCurrency } from '@/utils/format-currency'

interface IncomeByCategoryCardProps {
  categoriesSummary: CategorySummary[]
}

export function IncomeByCategoryCard({
  categoriesSummary
}: IncomeByCategoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Principais receitas por categoria</CardTitle>
        <CardDescription>Top 3 categorias com mais rendimentos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {categoriesSummary.map((category) => (
            <div key={category.name} className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {category.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {category.percentage.toFixed(1)}% do total
                </p>
              </div>
              <div className="ml-auto font-medium text-green-600">
                {formatCurrency(category.amount)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
