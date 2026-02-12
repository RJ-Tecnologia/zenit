import { Skeleton } from '@/components/ui/skeleton'

export default function TransactionsLoading() {
  return (
    <div className="container mx-auto py-6 px-4 md:py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transações</h1>
          <p className="mt-2 text-muted-foreground">
            Gerencie suas transações financeiras
          </p>
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    </div>
  )
}
