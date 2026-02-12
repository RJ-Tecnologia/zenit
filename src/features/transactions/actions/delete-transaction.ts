'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function deleteTransaction(transactionId: string) {
  await prisma.transaction.delete({
    where: {
      id: transactionId
    }
  })

  revalidatePath('/transactions')
}
