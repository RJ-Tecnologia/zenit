import { useQuery } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getCategoriesRequest } from '@/http/get-categories'
import { SaveTransactionDialog } from '../components/save-transaction-dialog'

export async function NewTransactionButton() {
  const { data } = useQuery({
    queryKey: ['get-categories'],
    queryFn: getCategoriesRequest
  })

  return (
    <SaveTransactionDialog
      trigger={
        <Button className="gap-2">
          <PlusIcon className="size-4" />
          Nova Transação
        </Button>
      }
      categories={data?.categories ?? []}
    />
  )
}
