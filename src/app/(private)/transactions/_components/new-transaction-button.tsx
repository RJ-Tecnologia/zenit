import { auth } from '@clerk/nextjs/server'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getUserCategories } from '@/features/categories/actions/get-user-categories'
import { SaveTransactionDialog } from '@/features/transactions/components/save-transaction-dialog'

export async function NewTransactionButton() {
  const { userId } = await auth()

  if (!userId) {
    return null
  }

  const categories = await getUserCategories(userId)

  return (
    <SaveTransactionDialog
      trigger={
        <Button className="gap-2">
          <PlusIcon className="size-4" />
          Nova Transação
        </Button>
      }
      categories={categories}
    />
  )
}
