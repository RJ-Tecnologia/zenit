import type { Transaction } from '@/generated/prisma/client'

export type SerializedTransaction = Omit<Transaction, 'amount'> & {
  amount: string
  category: {
    name: string
  }
}
