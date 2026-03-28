import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { Category } from '@/features/categories/types'
import { createTransactionRequest } from '@/http/create-transaction'
import { updateTransactionRequest } from '@/http/update-transaction'
import {
  type NewTransactionformSchema,
  newTransactionformSchema
} from '../schemas/new-transaction-schema'
import type { Transaction } from '../types'

interface UseTransactionFormProps {
  categories: Category[]
  currentTransaction?: Transaction
  onSuccess?: () => void
}

export function useTransactionForm({
  categories,
  currentTransaction,
  onSuccess
}: UseTransactionFormProps) {
  const isUpdate = currentTransaction !== undefined

  const { mutateAsync: createTransaction, isPending: isCreatingTransaction } =
    useMutation({
      mutationFn: createTransactionRequest
    })

  const { mutateAsync: updateTransaction, isPending: isUpdatingTransaction } =
    useMutation({
      mutationFn: updateTransactionRequest
    })

  const queryClient = useQueryClient()

  const form = useForm<NewTransactionformSchema>({
    resolver: zodResolver(newTransactionformSchema),
    defaultValues: {
      title: currentTransaction?.title ?? '',
      description: currentTransaction?.description ?? '',
      type: currentTransaction?.type ?? 'INCOME',
      amount: currentTransaction?.amount,
      categoryId: currentTransaction?.categoryId ?? categories[0]?.id,
      date: currentTransaction?.date
        ? new Date(currentTransaction?.date)
        : new Date()
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

  async function handleSubmit(data: NewTransactionformSchema) {
    try {
      if (isUpdate) {
        await updateTransaction({
          transactionId: currentTransaction.id,
          title: data.title,
          amount: data.amount,
          description: data.description,
          categoryId: data.categoryId,
          type: data.type,
          date: data.date.toISOString()
        })
      } else {
        await createTransaction({
          title: data.title,
          amount: data.amount,
          description: data.description,
          categoryId: data.categoryId,
          type: data.type,
          date: data.date.toISOString()
        })
      }

      toast.success(`Movimentação ${isUpdate ? 'Atualizada' : 'Cadastrada'}!`)

      queryClient.invalidateQueries({
        queryKey: ['get-transactions']
      })

      onSuccess?.()
    } catch (error) {
      toast.error('Erro ao salvar transação. Tente novamente.')
      console.error(error)
    }
  }

  return {
    form,
    isPending: isCreatingTransaction || isUpdatingTransaction,
    isUpdate,
    filteredCategories,
    handleSubmit: form.handleSubmit(handleSubmit)
  }
}
