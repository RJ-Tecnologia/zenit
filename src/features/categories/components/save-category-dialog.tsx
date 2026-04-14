import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Field,
  FieldError as FieldErrorComponent,
  FieldLabel
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useCategoryForm } from '../hooks/use-category-form'
import type { SaveCategorySchema } from '../schemas/save-category-schema'
import type { Category } from '../types'

interface SaveCategoryDialogProps {
  category?: Category
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: (category: Category) => void
}

export function SaveCategoryDialog({
  category,
  open,
  onOpenChange,
  onSuccess
}: SaveCategoryDialogProps) {
  const { form, isPending, isEditing, handleSubmit } = useCategoryForm({
    category,
    onSuccess: (data) => {
      onSuccess?.(data)
      onOpenChange(false)
    }
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Editar Categoria' : 'Nova Categoria'}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? 'Atualize as informações da categoria.'
                : 'Crie uma nova categoria para organizar suas transações.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Field>
              <div className="space-y-2">
                <FieldLabel htmlFor="name">Nome</FieldLabel>
                <Input
                  {...form.register('name')}
                  id="name"
                  placeholder="Ex: Alimentação, Lazer..."
                  disabled={isPending}
                />
              </div>
              {form.formState.errors.name && (
                <FieldErrorComponent
                  errors={[form.formState.errors.name]}
                  className="text-xs"
                />
              )}
            </Field>

            <Field>
              <div className="space-y-2">
                <FieldLabel htmlFor="scope">Tipo</FieldLabel>
                <Select
                  onValueChange={(value) =>
                    form.setValue('scope', value as SaveCategorySchema['scope'])
                  }
                  value={form.watch('scope')}
                  disabled={isPending}
                >
                  <SelectTrigger id="scope">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BOTH">Entrada e Saída</SelectItem>
                    <SelectItem value="INCOME">Apenas Entrada</SelectItem>
                    <SelectItem value="OUTCOME">Apenas Saída</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {form.formState.errors.scope && (
                <FieldErrorComponent
                  errors={[form.formState.errors.scope]}
                  className="text-xs"
                />
              )}
            </Field>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
