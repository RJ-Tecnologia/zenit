import type { Category, CategoryScope } from '@/features/categories/types'
import { api } from '@/lib/api'

interface CreateCategoryRequest {
  name: string
  scope: CategoryScope
  icon: string
}

interface CreateCategoryResponse {
  category: Category
}

export async function createCategoryRequest({
  name,
  scope,
  icon
}: CreateCategoryRequest) {
  const response = await api.post<CreateCategoryResponse>('/categories', {
    name,
    scope,
    icon
  })

  return response.data
}
