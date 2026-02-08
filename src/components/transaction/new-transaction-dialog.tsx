'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod/v3'
import type { Category } from '@/generated/prisma/client'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'

interface NewTransactionDialogProps {
  categories: Category[]
}

const newTransactionformSchema = z.object({
  title: z.string().min(1, { message: 'O campo é obrigatório' }),
  type: z.enum(['INCOME', 'OUTCOME']),
  amount: z.coerce.number().gt(0, { message: 'O valor deve ser maior que 0' }),
  description: z.string().optional(),
  categoryId: z.string({ message: 'Campo obrigatório' }).uuid(),
  date: z.date({ message: 'Campo obrigatório' })
})

type NewTransactionformSchema = z.infer<typeof newTransactionformSchema>

export function NewTransactionDialog({
  categories
}: NewTransactionDialogProps) {
  console.log(categories)
  const [open, setOpen] = useState(false)

  const form = useForm<NewTransactionformSchema>({
    resolver: zodResolver(newTransactionformSchema),
    defaultValues: {
      title: '',
      description: '',
      type: 'INCOME',
      amount: 0,
      categoryId: categories[0]?.id
    }
  })

  function handleSubmit(data: NewTransactionformSchema) {
    console.log(data)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="size-4" />
          Nova Transação
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Transação</DialogTitle>
          <DialogDescription>
            Adicione uma nova transação ao seu registro financeiro
          </DialogDescription>
        </DialogHeader>
        <form className="pt-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup className="gap-2">
            <Controller
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <Field>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="title">Título</FieldLabel>
                    <Input
                      {...field}
                      id="title"
                      placeholder="Ex: Compras do mês"
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs"
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
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
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs"
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
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
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs"
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
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
                        {categories.map((category) => {
                          console.log(category.name)
                          return (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs"
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
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
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs"
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <Field>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="description">
                      Descrição (opcional)
                    </FieldLabel>
                    <Input
                      {...field}
                      id="description"
                      placeholder="Detalhes adicionais"
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs"
                    />
                  )}
                </Field>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                Adicionar
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
