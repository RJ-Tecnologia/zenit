import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createCategoryRequest } from '@/http/create-category'
import { updateCategoryRequest } from '@/http/update-category'
import {
  type SaveCategorySchema,
  saveCategorySchema
} from '../schemas/save-category-schema'
import type { Category } from '../types'

interface UseCategoryFormProps {
  category?: Category
  onSuccess?: (category: Category) => void
}

export function useCategoryForm({ category, onSuccess }: UseCategoryFormProps) {
  const isEditing = !!category
  const queryClient = useQueryClient()

  const form = useForm<SaveCategorySchema>({
    resolver: zodResolver(saveCategorySchema),
    defaultValues: {
      name: category?.name ?? '',
      scope: category?.scope ?? 'BOTH'
    }
  })

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        scope: category.scope
      })
    }
  }, [category, form])

  const { mutateAsync: createCategory, isPending: isCreating } = useMutation({
    mutationFn: createCategoryRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-categories'] })
    }
  })

  const { mutateAsync: updateCategory, isPending: isUpdating } = useMutation({
    mutationFn: updateCategoryRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-categories'] })
    }
  })

  async function handleSubmit(data: SaveCategorySchema) {
    try {
      if (isEditing && category) {
        await updateCategory({
          categoryId: category.id,
          name: data.name,
          scope: data.scope
        })
        toast.success('Categoria atualizada com sucesso!')
      } else {
        const response = await createCategory({
          name: data.name,
          scope: data.scope
        })
        toast.success('Categoria criada com sucesso!')
        onSuccess?.(response.category)
        return
      }

      onSuccess?.({ id: category?.id || 'new', ...data })
    } catch (error) {
      toast.error('Erro ao salvar categoria.')
      console.error(error)
    }
  }

  return {
    form,
    isPending: isCreating || isUpdating,
    isEditing,
    handleSubmit: form.handleSubmit(handleSubmit)
  }
}
