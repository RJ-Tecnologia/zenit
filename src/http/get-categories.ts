import type { Category } from '@/features/categories/types'
import { api } from '@/lib/api'

interface GetCategoriesResponse {
  categories: Category[]
}

interface GetCategoriesRequest {
  name?: string
}

export async function getCategoriesRequest({
  name
}: GetCategoriesRequest = {}) {
  const response = await api.get<GetCategoriesResponse>('/categories', {
    params: { name }
  })

  return response.data
}
