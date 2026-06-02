import type { CategoryScope } from '@/features/categories/types'
import { api } from '@/lib/api'

interface UpdateCategoryRequest {
  categoryId: string
  name: string
  scope: CategoryScope
  icon: string
}

export async function updateCategoryRequest({
  categoryId,
  name,
  scope,
  icon
}: UpdateCategoryRequest) {
  await api.put(`/categories/${categoryId}`, {
    name,
    scope,
    icon
  })
}
