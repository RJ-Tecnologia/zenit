'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import type { NewTransactionformSchema } from '../schemas/new-transaction-schema'

interface UpdateTransactionProps {
  transactionId: string
  transaction: NewTransactionformSchema
  clerkUserId: string
}

export async function updateTransaction({
  transactionId,
  transaction,
  clerkUserId
}: UpdateTransactionProps) {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkUserId
    }
  })

  await prisma.transaction.update({
    where: {
      id: transactionId
    },
    data: {
      title: transaction.title,
      date: transaction.date,
      amount: transaction.amount,
      categoryId: transaction.categoryId,
      type: transaction.type,
      description: transaction.description,
      userId: user.id
    }
  })

  revalidatePath('/transactions')
}
