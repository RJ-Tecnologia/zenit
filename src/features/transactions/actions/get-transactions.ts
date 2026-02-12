'use server'

import { prisma } from '@/lib/prisma'

export async function getTransactions(clerkUserId: string) {
  const transactions = await prisma.transaction.findMany({
    where: {
      user: {
        clerkUserId
      }
    },
    include: {
      category: {
        select: {
          name: true
        }
      }
    }
  })

  return transactions.map((t) => ({ ...t, amount: t.amount.toString() }))
}
