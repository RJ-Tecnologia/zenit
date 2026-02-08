'use server'

import { prisma } from '@/lib/prisma'

export async function getUserCategories(clerkUserId: string) {
  const categories = await prisma.category.findMany({
    where: {
      user: {
        clerkUserId
      }
    }
  })

  return categories
}
