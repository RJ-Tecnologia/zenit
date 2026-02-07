import type { CategoryScope } from '@/generated/prisma/enums'

interface CategoriesList {
  name: string
  scope: CategoryScope
}

export const DEFAULT_CATEGORIES: CategoriesList[] = [
  {
    name: 'Salário',
    scope: 'INCOME'
  },
  {
    name: 'Freelance',
    scope: 'INCOME'
  },
  {
    name: 'Investimentos',
    scope: 'BOTH'
  },
  {
    name: 'Alimentação',
    scope: 'OUTCOME'
  },
  {
    name: 'Mercado',
    scope: 'OUTCOME'
  },
  {
    name: 'Aluguel',
    scope: 'OUTCOME'
  },
  {
    name: 'Água',
    scope: 'OUTCOME'
  },
  {
    name: 'Luz',
    scope: 'OUTCOME'
  },
  {
    name: 'Internet',
    scope: 'OUTCOME'
  },
  {
    name: 'Lazer',
    scope: 'OUTCOME'
  },
  {
    name: 'Saúde',
    scope: 'OUTCOME'
  },
  {
    name: 'Educação',
    scope: 'OUTCOME'
  }
]
