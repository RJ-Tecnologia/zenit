import { z } from 'zod'

export const saveCategorySchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  scope: z.enum(['INCOME', 'OUTCOME', 'BOTH'])
})

export type SaveCategorySchema = z.infer<typeof saveCategorySchema>
