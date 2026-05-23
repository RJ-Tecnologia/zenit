import { useQuery } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getCategoriesRequest } from '@/http/get-categories'
import { cn } from '@/lib/utils'
import { SaveTransactionDialog } from '../components/save-transaction-dialog'

interface NewTransactionButtonProps {
  className?: string
}

export function NewTransactionButton({ className }: NewTransactionButtonProps) {
  const { data } = useQuery({
    queryKey: ['get-categories'],
    queryFn: getCategoriesRequest
  })

  return (
    <SaveTransactionDialog
      trigger={
        <Button
          className={cn(
            'gap-2 h-11 px-6 rounded-xl font-bold shadow-lg shadow-primary/20',
            className
          )}
        >
          <PlusIcon className="size-5" />
          Nova Transação
        </Button>
      }
      categories={data?.categories ?? []}
    />
  )
}
