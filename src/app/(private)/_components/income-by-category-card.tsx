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

interface IncomeByCategoryCardProps {
  startDate: Date
  endDate: Date
}

export async function IncomeByCategoryCard({
  startDate,
  endDate
}: IncomeByCategoryCardProps) {
  const { userId } = await auth()
  const { incomeCategoriesSummary: categoriesSummary } =
    await getFinanceSummary(userId as string, startDate, endDate)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Principais receitas por categoria</CardTitle>
        <CardDescription>Top categorias com mais rendimentos</CardDescription>
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
