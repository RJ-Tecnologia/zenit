import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { Category } from '@/generated/prisma/client'
import { registerTransaction } from '../actions/register-transaction'
import { updateTransaction } from '../actions/update-transaction'
import {
  type NewTransactionformSchema,
  newTransactionformSchema
} from '../schemas/new-transaction-schema'
import type { SerializedTransaction } from '../types/serialized-transaction'

interface UseTransactionFormProps {
  categories: Category[]
  currentTransaction?: SerializedTransaction
  onSuccess?: () => void
}

export function useTransactionForm({
  categories,
  currentTransaction,
  onSuccess
}: UseTransactionFormProps) {
  const [isPending, startTransition] = useTransition()
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

  // Sincroniza a categoria quando o tipo muda
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
    startTransition(async () => {
      try {
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

        router.refresh()
        toast.success(`Movimentação ${isUpdate ? 'Atualizada' : 'Cadastrada'}!`)

        onSuccess?.()
      } catch (error) {
        toast.error('Erro ao salvar transação. Tente novamente.')
        console.error(error)
      }
    })
  }

  return {
    form,
    isPending,
    isUpdate,
    filteredCategories,
    handleSubmit: form.handleSubmit(handleSubmit)
  }
}
