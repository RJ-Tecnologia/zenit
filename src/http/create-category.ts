import type { CategoryScope } from '@/features/categories/types'
import { api } from '@/lib/api'

interface CreateCategoryRequest {
  name: string
  scope: CategoryScope
}

export async function createCategoryRequest({
  name,
  scope
}: CreateCategoryRequest) {
  await api.post('/categories', {
    name,
    scope
  })
}
