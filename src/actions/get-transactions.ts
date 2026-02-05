'use server'

import { prisma } from '@/lib/prisma'

export async function getTransactions(clerkUserId: string) {
  const transactions = await prisma.transaction.findMany({
    where: {
      user: {
        clerkUserId
      }
    }
  })

  return transactions
}
