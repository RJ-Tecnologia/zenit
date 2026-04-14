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
    <div className="container mx-auto py-6 px-4 md:py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categorias</h1>
          <p className="mt-2 text-muted-foreground">
            Gerencie as categorias de suas transações
          </p>
        </div>

        <NewCategoryButton />
      </div>

      <CategoryList />
    </div>
  )
}
