import { createFileRoute } from '@tanstack/react-router'
import { CategoryList } from '@/features/categories/components/category-list'
import { NewCategoryButton } from '@/features/categories/components/new-category-button'

export const Route = createFileRoute('/categories/')({
  head: () => ({
    meta: [
      {
        title: 'Categorias - Zenit Finance'
      }
    ]
  }),
  component: CategoriesPage
})

function CategoriesPage() {
  return (
    <div className="px-6 md:px-10 py-6">
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl md:text-display-lg font-heading text-on-surface">
            Categorias
          </h1>
          <p className="mt-1 md:mt-2 text-body-md md:text-body-lg text-muted-foreground">
            Gerencie as categorias de suas transações
          </p>
        </div>

        <NewCategoryButton />
      </div>

      <CategoryList />
    </div>
  )
}
