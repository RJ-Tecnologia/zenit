'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { FieldGroup } from '@/components/ui/field'
import type { Category } from '@/generated/prisma/client'
import { useTransactionForm } from '../hooks/use-transaction-form'
import type { SerializedTransaction } from '../types/serialized-transaction'
import {
  AmountField,
  CategoryField,
  DateField,
  DescriptionField,
  TitleField,
  TypeField
} from './transaction-form-fields'

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

  const { form, isPending, isUpdate, filteredCategories, handleSubmit } =
    useTransactionForm({
      categories,
      currentTransaction,
      onSuccess: () => setOpen(false)
    })

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

        <form className="pt-4" onSubmit={handleSubmit}>
          <FieldGroup className="gap-2">
            <TitleField control={form.control} />
            <TypeField control={form.control} />
            <AmountField control={form.control} />
            <CategoryField
              control={form.control}
              categories={filteredCategories}
            />
            <DateField control={form.control} />
            <DescriptionField control={form.control} />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" className="flex-1" disabled={isPending}>
                {isUpdate ? 'Atualizar' : 'Adicionar'}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
