import type { Category, CategoryScope } from '@/features/categories/types'
import { api } from '@/lib/api'

interface CreateCategoryRequest {
  name: string
  scope: CategoryScope
}

interface CreateCategoryResponse {
  category: Category
}

export async function createCategoryRequest({
  name,
  scope
}: CreateCategoryRequest) {
  const response = await api.post<CreateCategoryResponse>('/categories', {
    name,
    scope
  })

  return response.data
}
