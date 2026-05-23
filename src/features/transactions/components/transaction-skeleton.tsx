import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function TransactionSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <TableRow
          key={`skeleton-${i}`}
          className="border-white/8 hover:bg-transparent"
        >
          <TableCell className="px-8 py-5">
            <Skeleton className="size-10 rounded-xl bg-white/5" />
          </TableCell>
          <TableCell className="py-5">
            <Skeleton className="h-5 w-32 bg-white/5 rounded-lg" />
          </TableCell>
          <TableCell className="hidden lg:table-cell py-5">
            <Skeleton className="h-5 w-48 bg-white/5 rounded-lg" />
          </TableCell>
          <TableCell className="hidden md:table-cell py-5">
            <Skeleton className="h-7 w-24 bg-white/5 rounded-full" />
          </TableCell>
          <TableCell className="hidden sm:table-cell py-5">
            <Skeleton className="h-5 w-20 bg-white/5 rounded-lg" />
          </TableCell>
          <TableCell className="py-5">
            <div className="flex justify-end">
              <Skeleton className="h-5 w-24 bg-white/5 rounded-lg" />
            </div>
          </TableCell>
          <TableCell className="px-8 py-5">
            <div className="flex justify-end gap-2">
              <Skeleton className="size-9 rounded-lg bg-white/5" />
              <Skeleton className="size-9 rounded-lg bg-white/5" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
