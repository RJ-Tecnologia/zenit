'use client'

import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { registerTransaction } from '@/actions/register-transaction'
import { updateTransaction } from '@/actions/update-transaction'
import type { Category } from '@/generated/prisma/client'
import {
  type NewTransactionformSchema,
  newTransactionformSchema
} from '@/schemas/new-transaction-schema'
import type { SerializedTransaction } from '@/types/serialized-transaction'
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

interface SaveTransactionDialogProps {
  trigger: React.ReactNode
  categories: Category[]
  currentTransaction?: SerializedTransaction
}

export function SaveTransactionDialog({
  trigger,
  categories,
  currentTransaction
}: SaveTransactionDialogProps) {
  const [open, setOpen] = useState(false)
  const [isCreatingTransaction, setIsCreatingTransaction] = useTransition()
  const { userId } = useAuth()
  const router = useRouter()

  const isUpdate = currentTransaction !== undefined

  const form = useForm<NewTransactionformSchema>({
    resolver: zodResolver(newTransactionformSchema),
    defaultValues: {
      title: currentTransaction?.title ?? '',
      description: currentTransaction?.description ?? '',
      type: currentTransaction?.type ?? 'INCOME',
      amount: parseFloat(currentTransaction?.amount ?? '0'),
      categoryId: currentTransaction?.categoryId ?? categories[0]?.id,
      date: currentTransaction?.date
    }
  })

  const selectedType = form.watch('type')

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      if (category.scope === 'BOTH') return true
      return category.scope === selectedType
    })
  }, [categories, selectedType])

  useEffect(() => {
    const currentCategoryId = form.getValues('categoryId')
    const isCategoryAvailable = filteredCategories.some(
      (cat) => cat.id === currentCategoryId
    )

    if (!isCategoryAvailable && filteredCategories.length > 0) {
      form.setValue('categoryId', filteredCategories[0].id)
    }
  }, [filteredCategories, form])

  function handleSubmit(data: NewTransactionformSchema) {
    setIsCreatingTransaction(async () => {
      if (isUpdate) {
        await updateTransaction({
          transactionId: currentTransaction.id,
          transaction: data,
          clerkUserId: userId as string
        })
      } else {
        await registerTransaction({
          transaction: data,
          clerkUserId: userId as string
        })
      }

      setOpen(false)
      router.refresh()

      toast.success(`Movimentação ${isUpdate ? 'Atualizada' : 'Cadastrada'}!`)
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? 'Editar Transação' : 'Nova Transação'}
          </DialogTitle>
          <DialogDescription>
            {isUpdate
              ? 'Atualize os dados da sua transação.'
              : 'Adicione uma nova transação ao seu registro financeiro'}
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
                        {filteredCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
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
                disabled={isCreatingTransaction}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isCreatingTransaction}
              >
                {isUpdate ? 'Atualizar' : 'Adicionar'}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
