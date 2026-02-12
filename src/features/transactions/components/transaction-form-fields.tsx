import { type Control, Controller } from 'react-hook-form'
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
import type { Category } from '@/generated/prisma/client'
import type { NewTransactionformSchema } from '../schemas/new-transaction-schema'

interface FormFieldProps {
  control: Control<NewTransactionformSchema>
}

export function TitleField({ control }: FormFieldProps) {
  return (
    <Controller
      control={control}
      name="title"
      render={({ field, fieldState }) => (
        <Field>
          <div className="space-y-2">
            <FieldLabel htmlFor="title">Título</FieldLabel>
            <Input {...field} id="title" placeholder="Ex: Compras do mês" />
          </div>

          {fieldState.invalid && (
            <FieldErrorComponent
              errors={[fieldState.error]}
              className="text-xs"
            />
          )}
        </Field>
      )}
    />
  )
}

export function TypeField({ control }: FormFieldProps) {
  return (
    <Controller
      control={control}
      name="type"
      render={({ field, fieldState }) => (
        <Field>
          <div className="space-y-2">
            <FieldLabel htmlFor="type">Tipo</FieldLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INCOME">Entrada</SelectItem>
                <SelectItem value="OUTCOME">Saída</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {fieldState.invalid && (
            <FieldErrorComponent
              errors={[fieldState.error]}
              className="text-xs"
            />
          )}
        </Field>
      )}
    />
  )
}

export function AmountField({ control }: FormFieldProps) {
  return (
    <Controller
      control={control}
      name="amount"
      render={({ field, fieldState }) => (
        <Field>
          <div className="space-y-2">
            <FieldLabel htmlFor="amount">Valor</FieldLabel>
            <Input
              {...field}
              id="amount"
              type="number"
              step="0.01"
              placeholder="0,00"
            />
          </div>

          {fieldState.invalid && (
            <FieldErrorComponent
              errors={[fieldState.error]}
              className="text-xs"
            />
          )}
        </Field>
      )}
    />
  )
}

interface CategoryFieldProps extends FormFieldProps {
  categories: Category[]
}

export function CategoryField({ control, categories }: CategoryFieldProps) {
  return (
    <Controller
      control={control}
      name="categoryId"
      render={({ field, fieldState }) => (
        <Field>
          <div className="space-y-2">
            <FieldLabel htmlFor="category">Categoria</FieldLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {fieldState.invalid && (
            <FieldErrorComponent
              errors={[fieldState.error]}
              className="text-xs"
            />
          )}
        </Field>
      )}
    />
  )
}

export function DateField({ control }: FormFieldProps) {
  return (
    <Controller
      control={control}
      name="date"
      render={({ field, fieldState }) => (
        <Field>
          <div className="space-y-2">
            <FieldLabel htmlFor="date">Data</FieldLabel>
            <Input
              {...field}
              id="date"
              type="datetime-local"
              value={
                field.value instanceof Date
                  ? field.value.toISOString().slice(0, 16)
                  : ''
              }
              onChange={(e) => field.onChange(new Date(e.target.value))}
            />
          </div>

          {fieldState.invalid && (
            <FieldErrorComponent
              errors={[fieldState.error]}
              className="text-xs"
            />
          )}
        </Field>
      )}
    />
  )
}

export function DescriptionField({ control }: FormFieldProps) {
  return (
    <Controller
      control={control}
      name="description"
      render={({ field, fieldState }) => (
        <Field>
          <div className="space-y-2">
            <FieldLabel htmlFor="description">Descrição (opcional)</FieldLabel>
            <Input
              {...field}
              id="description"
              placeholder="Detalhes adicionais"
            />
          </div>

          {fieldState.invalid && (
            <FieldErrorComponent
              errors={[fieldState.error]}
              className="text-xs"
            />
          )}
        </Field>
      )}
    />
  )
}
