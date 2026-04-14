import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SaveCategoryDialog } from './save-category-dialog'

export function NewCategoryButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} className="gap-2">
        <PlusIcon className="size-4" />
        Nova Categoria
      </Button>

      <SaveCategoryDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
