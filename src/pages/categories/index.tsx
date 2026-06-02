import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { SearchIcon } from 'lucide-react'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { CategoryList } from '@/features/categories/components/category-list'
import { NewCategoryButton } from '@/features/categories/components/new-category-button'

const categoriesSearchSchema = z.object({
  q: z.string().optional().catch('')
})

export const Route = createFileRoute('/categories/')({
  validateSearch: (search) => categoriesSearchSchema.parse(search),
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
  const { q } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: (old) => ({
        ...old,
        q: e.target.value || undefined
      }),
      replace: true
    })
  }

  return (
    <div className="px-6 md:px-10 py-6">
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 flex-1">
          <div>
            <h1 className="text-3xl md:text-display-lg font-heading text-on-surface">
              Categorias
            </h1>
            <p className="mt-1 md:mt-2 text-body-md md:text-body-lg text-muted-foreground whitespace-nowrap">
              Gerencie suas categorias
            </p>
          </div>

          <div className="relative w-full max-w-md lg:ml-8">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar categoria..."
              value={q ?? ''}
              onChange={handleSearchChange}
              className="pl-11 bg-white/5 border-white/8 rounded-xl h-12 text-on-surface placeholder:text-muted-foreground focus:ring-primary/20"
            />
          </div>
        </div>

        <NewCategoryButton />
      </div>

      <CategoryList />
    </div>
  )
}
