'use server'

import { endOfMonth, startOfMonth } from 'date-fns'
import { prisma } from '@/lib/prisma'
import type { FinanceSummary } from '../types/finance-summary'

interface GetFinanceSummaryProps {
  clerkUserId: string
  startDate?: Date
  endDate?: Date
}

export async function getFinanceSummary({
  clerkUserId,
  startDate = startOfMonth(new Date()),
  endDate = endOfMonth(new Date())
}: GetFinanceSummaryProps): Promise<FinanceSummary> {
  const transactions = await prisma.transaction.findMany({
    where: {
      user: {
        clerkUserId
      },
      date: {
        gte: startDate,
        lte: endDate
      }
    },
    orderBy: {
      date: 'desc'
    },
    include: {
      category: {
        select: {
          name: true
        }
      }
    }
  })

  const { income, outcome } = transactions.reduce(
    (acc, current) => {
      if (current.type === 'INCOME') {
        return {
          income: acc.income + current.amount.toNumber(),
          outcome: acc.outcome
        }
      }

      return {
        income: acc.income,
        outcome: acc.outcome + current.amount.toNumber()
      }
    },
    { income: 0, outcome: 0 }
  )

  const lastTransactions = transactions.slice(0, 5).map((transaction) => {
    return {
      id: transaction.id,
      title: transaction.title,
      amount: transaction.amount.toNumber(),
      category: transaction.category.name,
      type: transaction.type,
      date: transaction.date
    }
  })

  const outcomeCategoriesSummary = Object.values(
    transactions
      .filter((transaction) => transaction.type === 'OUTCOME')
      .reduce<Record<string, { name: string; amount: number }>>(
        (acc, transaction) => {
          const categoryName = transaction.category.name
          const amount = transaction.amount.toNumber()

          if (acc[categoryName]) {
            acc[categoryName].amount += amount
          } else {
            acc[categoryName] = { name: categoryName, amount }
          }

          return acc
        },
        {}
      )
  )
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3)
    .map((category) => ({
      name: category.name,
      amount: category.amount,
      percentage: outcome > 0 ? (category.amount / outcome) * 100 : 0
    }))

  const incomeCategoriesSummary = Object.values(
    transactions
      .filter((transaction) => transaction.type === 'INCOME')
      .reduce<Record<string, { name: string; amount: number }>>(
        (acc, transaction) => {
          const categoryName = transaction.category.name
          const amount = transaction.amount.toNumber()

          if (acc[categoryName]) {
            acc[categoryName].amount += amount
          } else {
            acc[categoryName] = { name: categoryName, amount }
          }

          return acc
        },
        {}
      )
  )
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3)
    .map((category) => ({
      name: category.name,
      amount: category.amount,
      percentage: income > 0 ? (category.amount / income) * 100 : 0
    }))

  return {
    balance: income - outcome,
    income,
    outcome,
    transactionsCount: transactions.length,
    lastTransactions,
    outcomeCategoriesSummary,
    incomeCategoriesSummary
  }
}
