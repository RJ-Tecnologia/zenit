import { api } from '@/lib/api'

interface UpdateCategoryRequest {
  categoryId: string
}

export async function deleteCategoryRequest({
  categoryId
}: UpdateCategoryRequest) {
  await api.delete(`/categories/${categoryId}`)
}
