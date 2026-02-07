'use server'

import { prisma } from '@/lib/prisma'
import { DEFAULT_CATEGORIES } from '@/utils/default-categories'

export async function createDefaultCategories(userId: string) {
  await Promise.all(
    DEFAULT_CATEGORIES.map((category) => {
      return prisma.category.create({
        data: {
          name: category.name,
          userId,
          scope: category.scope
        }
      })
    })
  )
}
