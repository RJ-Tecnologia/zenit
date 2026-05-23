import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function StatCardSkeleton() {
  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/8 rounded-2xl shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-6">
        <Skeleton className="size-12 rounded-xl bg-white/5" />
      </div>
      <CardHeader className="pb-2">
        <Skeleton className="h-5 w-24 bg-white/5 rounded-lg" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-6 bg-white/5 rounded" />
          <Skeleton className="h-10 w-32 bg-white/5 rounded-xl" />
        </div>
        <Skeleton className="mt-4 h-3 w-28 bg-white/5 rounded" />
      </CardContent>
    </Card>
  )
}

export function RecentTransactionsCardSkeleton() {
  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/8 rounded-2xl shadow-xl">
      <CardHeader>
        <Skeleton className="h-6 w-48 bg-white/5 rounded-lg" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`stat-skele-${i}`} className="flex items-center">
              <Skeleton className="size-10 rounded-xl bg-white/5 mr-4" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-40 bg-white/5 rounded" />
                <Skeleton className="h-3 w-20 bg-white/5 rounded" />
              </div>
              <Skeleton className="h-5 w-24 bg-white/5 rounded" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function CategoryCardSkeleton() {
  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/8 rounded-2xl shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <Skeleton className="h-6 w-56 bg-white/5 rounded-lg" />
        <Skeleton className="size-5 bg-white/5 rounded" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`cat-skele-${i}`} className="flex items-center">
              <Skeleton className="size-10 rounded-xl bg-white/5 mr-4" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32 bg-white/5 rounded" />
                <Skeleton className="h-1.5 w-full bg-white/5 rounded-full" />
              </div>
              <Skeleton className="ml-6 h-5 w-20 bg-white/5 rounded" />
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
