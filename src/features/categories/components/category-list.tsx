import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Edit2Icon,
  InboxIcon,
  Trash2Icon
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { DeleteConfirmationDialog } from '@/components/core/delete-confirmation-dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { deleteCategoryRequest } from '@/http/delete-category'
import { getCategoriesRequest } from '@/http/get-categories'
import { cn } from '@/lib/utils'
import { getIconByName } from '@/utils/icon-mapper'
import type { Category } from '../types'
import { SaveCategoryDialog } from './save-category-dialog'

const SCOPE_LABELS: Record<Category['scope'], string> = {
  INCOME: 'Entrada',
  OUTCOME: 'Saída',
  BOTH: 'Entrada e Saída'
}

export function CategoryList() {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['get-categories'],
    queryFn: getCategoriesRequest
  })

  const { mutateAsync: deleteCategory, isPending: isDeleting } = useMutation({
    mutationFn: deleteCategoryRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-categories'] })
      toast.success('Categoria excluída com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao excluir categoria.')
    }
  })

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setIsDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!categoryToDelete) return
    await deleteCategory({ categoryId: categoryToDelete })
    setCategoryToDelete(null)
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton
            key={i}
            className="h-40 w-full bg-white/5 rounded-xl border border-white/8"
          />
        ))}
      </div>
    )
  }

  const categories = data?.categories ?? []

  if (categories.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center py-20 text-center bg-white/5 backdrop-blur-xl border-white/8">
        <InboxIcon
          className="size-12 text-muted-foreground/50 mb-4"
          strokeWidth={1.5}
        />
        <p className="text-muted-foreground max-w-xs px-6 text-body-md">
          Não há categorias cadastradas. Comece adicionando uma.
        </p>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {categories.map((category) => {
        const Icon = getIconByName(category.icon)
        return (
          <Card
            key={category.id}
            className="group relative flex flex-col gap-5 p-5 bg-white/5 backdrop-blur-xl border-white/8 hover:bg-white/10 transition-all shadow-2xl overflow-hidden"
          >
            {/* Header Content */}
            <div className="flex items-center gap-4">
              <div className="size-12 shrink-0 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant border border-white/8 shadow-inner">
                <Icon className="size-6 stroke-[2px]" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-lg font-bold text-on-surface truncate">
                  {category.name}
                </span>
                <div
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border w-fit uppercase tracking-wider',
                    category.scope === 'INCOME'
                      ? 'bg-primary/10 text-primary border-primary/20'
                      : category.scope === 'OUTCOME'
                        ? 'bg-error/10 text-error border-error/20'
                        : 'bg-white/10 text-muted-foreground border-white/20'
                  )}
                >
                  {category.scope === 'INCOME' ? (
                    <ArrowUpIcon className="size-2.5 stroke-[3px]" />
                  ) : category.scope === 'OUTCOME' ? (
                    <ArrowDownIcon className="size-2.5 stroke-[3px]" />
                  ) : (
                    <div className="flex -space-x-1">
                      <ArrowUpIcon className="size-2.5 stroke-[3px]" />
                      <ArrowDownIcon className="size-2.5 stroke-[3px]" />
                    </div>
                  )}
                  {SCOPE_LABELS[category.scope]}
                </div>
              </div>
            </div>

            {/* Action Buttons - Centered and Always Visible */}
            <div className="flex items-center justify-center gap-2 pt-2 border-t border-white/5">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(category)}
                disabled={isDeleting}
                className="flex-1 h-9 hover:bg-white/10 text-muted-foreground hover:text-on-surface gap-2"
              >
                <Edit2Icon className="size-3.5 stroke-[2px]" />
                <span className="text-xs font-semibold">Editar</span>
              </Button>
              <div className="w-px h-4 bg-white/10" />
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 h-9 text-muted-foreground hover:text-error hover:bg-error/10 gap-2"
                onClick={() => setCategoryToDelete(category.id)}
                disabled={isDeleting}
              >
                <Trash2Icon className="size-3.5 stroke-[2px]" />
                <span className="text-xs font-semibold">Excluir</span>
              </Button>
            </div>
          </Card>
        )
      })}

      <SaveCategoryDialog
        category={editingCategory || undefined}
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) setEditingCategory(null)
        }}
      />

      <DeleteConfirmationDialog
        open={!!categoryToDelete}
        onOpenChange={(open) => {
          if (!open) setCategoryToDelete(null)
        }}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Excluir categoria"
        description="Tem certeza que deseja excluir esta categoria? Essa ação não pode ser desfeita."
      />
    </div>
  )
}
