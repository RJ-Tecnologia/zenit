import type { Category } from '@/features/categories/types'
import { api } from '@/lib/api'

interface GetCategoriesResponse {
  categories: Category[]
}

export async function getCategoriesRequest() {
  const response = await api.get<GetCategoriesResponse>('/categories')

  return response.data
}
