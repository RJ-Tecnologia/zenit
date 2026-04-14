import { Edit2Icon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import type { Category } from '../types'
import { SaveCategoryDialog } from './save-category-dialog'

const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Alimentação', scope: 'OUTCOME' },
  { id: '2', name: 'Salário', scope: 'INCOME' },
  { id: '3', name: 'Lazer', scope: 'OUTCOME' },
  { id: '4', name: 'Investimentos', scope: 'BOTH' }
]

const SCOPE_LABELS: Record<Category['scope'], string> = {
  INCOME: 'Entrada',
  OUTCOME: 'Saída',
  BOTH: 'Entrada e Saída'
}

export function CategoryList() {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setIsDialogOpen(true)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead className="w-[100px] text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {MOCK_CATEGORIES.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    category.scope === 'INCOME'
                      ? 'success'
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
                  >
                    <Edit2Icon className="size-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
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
