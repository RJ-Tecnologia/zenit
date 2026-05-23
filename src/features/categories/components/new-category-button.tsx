import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SaveCategoryDialog } from './save-category-dialog'

export function NewCategoryButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="gap-2 h-11 px-6 rounded-xl font-bold shadow-lg shadow-primary/20"
      >
        <PlusIcon className="size-5" />
        Nova Categoria
      </Button>

      <SaveCategoryDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
