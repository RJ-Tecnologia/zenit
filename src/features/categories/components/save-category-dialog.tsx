import { Controller } from 'react-hook-form'
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
import { ICON_MAP } from '@/utils/icon-mapper'
import { AVAILABLE_ICONS } from '@/utils/icons'
import { useCategoryForm } from '../hooks/use-category-form'
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
                <FieldLabel>Tipo</FieldLabel>
                <Controller
                  control={form.control}
                  name="scope"
                  render={({ field }) => (
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'BOTH', label: 'Ambos' },
                        { value: 'INCOME', label: 'Entrada' },
                        { value: 'OUTCOME', label: 'Saída' }
                      ].map((option) => {
                        const isSelected = field.value === option.value

                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => field.onChange(option.value)}
                            className={`flex h-10 items-center justify-center rounded-md border text-sm font-medium transition-all hover:bg-muted ${
                              isSelected
                                ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary ring-offset-2 ring-offset-background'
                                : 'border-border text-muted-foreground'
                            }`}
                            disabled={isPending}
                          >
                            {option.label}
                          </button>
                        )
                      })}
                    </div>
                  )}
                />
              </div>
              {form.formState.errors.scope && (
                <FieldErrorComponent
                  errors={[form.formState.errors.scope]}
                  className="text-xs"
                />
              )}
            </Field>

            <Field>
              <div className="space-y-3">
                <FieldLabel>Ícone</FieldLabel>
                <Controller
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <div className="flex gap-2 flex-wrap">
                      {AVAILABLE_ICONS.map((icon) => {
                        const Icon = ICON_MAP[icon as keyof typeof ICON_MAP]
                        const isSelected = field.value === icon

                        return (
                          <button
                            key={icon}
                            type="button"
                            onClick={() => field.onChange(icon)}
                            className={`size-10 flex aspect-square items-center justify-center rounded-md border transition-all hover:bg-muted ${
                              isSelected
                                ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary ring-offset-2 ring-offset-background'
                                : 'border-border text-muted-foreground'
                            }`}
                            disabled={isPending}
                          >
                            <Icon className="size-5" />
                          </button>
                        )
                      })}
                    </div>
                  )}
                />
              </div>
              {form.formState.errors.icon && (
                <FieldErrorComponent
                  errors={[form.formState.errors.icon]}
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
