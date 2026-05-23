import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DollarSignIcon,
  Edit2Icon,
  Gamepad2Icon,
  InboxIcon,
  ShoppingCartIcon,
  TagIcon,
  Trash2Icon
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { DeleteConfirmationDialog } from '@/components/core/delete-confirmation-dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { deleteCategoryRequest } from '@/http/delete-category'
import { getCategoriesRequest } from '@/http/get-categories'
import { cn } from '@/lib/utils'
import type { Category } from '../types'
import { SaveCategoryDialog } from './save-category-dialog'

const SCOPE_LABELS: Record<Category['scope'], string> = {
  INCOME: 'Entrada',
  OUTCOME: 'Saída',
  BOTH: 'Entrada e Saída'
}

const ICON_MAPPING: Record<string, any> = {
  'Jogos digitais': Gamepad2Icon,
  Mercado: ShoppingCartIcon,
  Salário: DollarSignIcon
}

function getCategoryIcon(name: string) {
  return ICON_MAPPING[name] || TagIcon
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
      <div className="rounded-xl border border-white/8 bg-white/5 backdrop-blur-xl p-4 space-y-4">
        <Skeleton className="h-10 w-full bg-white/5" />
        <Skeleton className="h-10 w-full bg-white/5" />
        <Skeleton className="h-10 w-full bg-white/5" />
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
    <div className="rounded-xl border border-white/8 bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl">
      <Table>
        <TableHeader className="bg-white/5 border-b border-white/8">
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="text-[10px] md:text-label-sm uppercase tracking-widest text-muted-foreground px-4 md:px-8 py-4 md:py-5 h-auto font-bold">
              Nome
            </TableHead>
            <TableHead className="text-[10px] md:text-label-sm uppercase tracking-widest text-muted-foreground py-4 md:py-5 h-auto font-bold">
              Tipo
            </TableHead>
            <TableHead className="text-[10px] md:text-label-sm uppercase tracking-widest text-muted-foreground px-4 md:px-8 py-4 md:py-5 h-auto font-bold text-right">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => {
            const Icon = getCategoryIcon(category.name)
            return (
              <TableRow
                key={category.id}
                className="border-white/8 hover:bg-white/5 transition-colors group"
              >
                <TableCell className="px-4 md:px-8 py-4 md:py-5">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="size-8 md:size-10 shrink-0 rounded-lg md:rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant border border-white/8 shadow-inner">
                      <Icon className="size-4 md:size-5 stroke-[2px]" />
                    </div>
                    <span className="text-sm md:text-body-md font-semibold text-on-surface truncate max-w-[120px] md:max-w-none">
                      {category.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4 md:py-5">
                  <div
                    className={cn(
                      'inline-flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold border shrink-0',
                      category.scope === 'INCOME'
                        ? 'bg-primary/10 text-primary border-primary/20'
                        : 'bg-error/10 text-error border-error/20'
                    )}
                  >
                    {category.scope === 'INCOME' ? (
                      <ArrowUpIcon className="size-2.5 md:size-3 stroke-[3px]" />
                    ) : (
                      <ArrowDownIcon className="size-2.5 md:size-3 stroke-[3px]" />
                    )}
                    <span className="hidden xs:inline">
                      {SCOPE_LABELS[category.scope]}
                    </span>
                    <span className="xs:hidden">
                      {category.scope === 'INCOME' ? 'Entrada' : 'Saída'}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-4 md:px-8 py-4 md:py-5 text-right">
                  <div className="flex justify-end gap-1 md:gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(category)}
                      disabled={isDeleting}
                      className="size-8 md:size-9 hover:bg-white/10 text-muted-foreground hover:text-on-surface"
                    >
                      <Edit2Icon className="size-3.5 md:size-4 stroke-[2px]" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 md:size-9 text-muted-foreground hover:text-error hover:bg-error/10"
                      onClick={() => setCategoryToDelete(category.id)}
                      disabled={isDeleting}
                    >
                      <Trash2Icon className="size-3.5 md:size-4 stroke-[2px]" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

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
