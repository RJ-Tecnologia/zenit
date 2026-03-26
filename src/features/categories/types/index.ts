export type CategoryScope = 'OUTCOME' | 'INCOME' | 'BOTH'

export interface Category {
  id: string
  name: string
  scope: CategoryScope
}
