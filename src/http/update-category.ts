import type { CategoryScope } from '@/features/categories/types'
import { api } from '@/lib/api'

interface UpdateCategoryRequest {
  categoryId: string
  name: string
  scope: CategoryScope
}

export async function updateCategoryRequest({
  categoryId,
  name,
  scope
}: UpdateCategoryRequest) {
  await api.put(`/categories/${categoryId}`, {
    name,
    scope
  })
}
