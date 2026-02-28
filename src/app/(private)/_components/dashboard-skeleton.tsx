import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

function StatCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-3 w-40" />
      </CardContent>
    </Card>
  )
}

function RecentTransactionsCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center">
              <div className="ml-4 space-y-2 flex-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-28" />
              </div>
              <Skeleton className="ml-auto h-5 w-24" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function CategoryCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-56 mb-2" />
        <Skeleton className="h-4 w-44" />
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center">
              <div className="ml-4 space-y-2 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="ml-auto h-5 w-24" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardSkeleton() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <RecentTransactionsCardSkeleton />

        <div className="grid gap-4 md:grid-cols-2">
          <CategoryCardSkeleton />
          <CategoryCardSkeleton />
        </div>
      </div>
    </>
  )
}
