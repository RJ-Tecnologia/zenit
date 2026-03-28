import { z } from 'zod/v3'

export const newTransactionformSchema = z.object({
  title: z.string().min(1, { message: 'Campo obrigatório' }),
  type: z.enum(['INCOME', 'OUTCOME']),
  amount: z.coerce
    .number({ message: 'Campo obrigatório' })
    .gt(0, { message: 'O valor deve ser maior que 0' }),
  description: z.string().optional(),
  categoryId: z.string({ message: 'Campo obrigatório' }).uuid(),
  date: z.date({ message: 'Campo obrigatório' })
})

export type NewTransactionformSchema = z.infer<typeof newTransactionformSchema>
