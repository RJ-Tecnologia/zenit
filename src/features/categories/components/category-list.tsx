import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Edit2Icon, InboxIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
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
import type { Category } from '../types'
import { SaveCategoryDialog } from './save-category-dialog'

const SCOPE_LABELS: Record<Category['scope'], string> = {
  INCOME: 'Entrada',
  OUTCOME: 'Saída',
  BOTH: 'Entrada e Saída'
}

export function CategoryList() {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
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

  const handleDelete = async (categoryId: string) => {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      await deleteCategory({ categoryId })
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-md border p-4 space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  const categories = data?.categories ?? []

  if (categories.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center py-20 text-center">
        <InboxIcon
          className="size-12 text-muted-foreground/50 mb-4"
          strokeWidth={1.5}
        />
        <p className="text-muted-foreground max-w-xs px-6">
          Não há categorias cadastradas. Comece adicionando uma.
        </p>
      </Card>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead className="w-25 text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    category.scope === 'INCOME'
                      ? 'default'
                      : category.scope === 'OUTCOME'
                        ? 'destructive'
                        : 'secondary'
                  }
                >
                  {SCOPE_LABELS[category.scope]}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(category)}
                    disabled={isDeleting}
                  >
                    <Edit2Icon className="size-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(category.id)}
                    disabled={isDeleting}
                  >
                    <Trash2Icon className="size-4" />
                    <span className="sr-only">Excluir</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
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
    </div>
  )
}
