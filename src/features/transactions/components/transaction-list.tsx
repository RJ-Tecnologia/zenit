import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { format } from 'date-fns'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Edit2Icon,
  Trash2Icon
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { DeleteConfirmationDialog } from '@/components/core/delete-confirmation-dialog'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import type { Category } from '@/features/categories/types'
import { deleteTransactionRequest } from '@/http/delete-transaction'
import { cn } from '@/lib/utils'
import { Route } from '@/pages/transactions/index'
import { formatCurrency } from '@/utils/format-currency'
import type { Transaction } from '../types'
import { SaveTransactionDialog } from './save-transaction-dialog'
import { TransactionSkeleton } from './transaction-skeleton'

interface TransactionListProps {
  transactions: Transaction[]
  categories: Category[]
  isLoading?: boolean
  meta?: {
    currentPage: number
    lastPage: number
    perPage: number
    total: number
  }
}

export function TransactionsList({
  transactions,
  categories,
  isLoading,
  meta
}: TransactionListProps) {
  const navigate = useNavigate({ from: Route.fullPath })
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(
    null
  )

  const { mutateAsync: deleteTransaction, isPending: isDeleting } = useMutation(
    {
      mutationFn: deleteTransactionRequest
    }
  )

  const queryClient = useQueryClient()

  async function handleDelete() {
    if (!transactionToDelete) return

    await deleteTransaction({ transactionId: transactionToDelete })
    setTransactionToDelete(null)

    toast.success('Movimentação deletada!')

    queryClient.invalidateQueries({
      queryKey: ['get-transactions']
    })
  }

  function getCategoryNameById(categoryId: string) {
    return (
      categories.find(({ id }) => id === categoryId)?.name || 'Sem Categoria'
    )
  }

  const handlePageChange = (newPage: number) => {
    navigate({
      search: (old) => ({
        ...old,
        page: newPage
      })
    })
  }

  const currentPage = meta?.currentPage ?? 1
  const totalPages = meta?.lastPage ?? 1
  const perPage = meta?.perPage ?? 20
  const totalCount = meta?.total ?? 0

  const from = (currentPage - 1) * perPage + 1
  const to = Math.min(currentPage * perPage, totalCount)

  return (
    <div className="rounded-2xl border border-white/8 bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-white/5 border-b border-white/8">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="text-[10px] md:text-label-sm uppercase tracking-widest text-muted-foreground px-8 py-5 h-auto font-bold">
                Tipo
              </TableHead>
              <TableHead className="text-[10px] md:text-label-sm uppercase tracking-widest text-muted-foreground py-5 h-auto font-bold">
                Título
              </TableHead>
              <TableHead className="hidden lg:table-cell text-[10px] md:text-label-sm uppercase tracking-widest text-muted-foreground py-5 h-auto font-bold">
                Descrição
              </TableHead>
              <TableHead className="hidden md:table-cell text-[10px] md:text-label-sm uppercase tracking-widest text-muted-foreground py-5 h-auto font-bold">
                Categoria
              </TableHead>
              <TableHead className="hidden sm:table-cell text-[10px] md:text-label-sm uppercase tracking-widest text-muted-foreground py-5 h-auto font-bold">
                Data
              </TableHead>
              <TableHead className="text-[10px] md:text-label-sm uppercase tracking-widest text-muted-foreground py-5 h-auto font-bold text-right">
                Valor
              </TableHead>
              <TableHead className="text-[10px] md:text-label-sm uppercase tracking-widest text-muted-foreground px-8 py-5 h-auto font-bold text-right">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TransactionSkeleton />
            ) : transactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-10 text-center text-muted-foreground"
                >
                  Nenhuma transação encontrada.
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => {
                const categoryName = getCategoryNameById(transaction.categoryId)

                return (
                  <TableRow
                    key={transaction.id}
                    className="border-white/8 hover:bg-white/5 transition-colors group"
                  >
                    <TableCell className="px-8 py-5">
                      <div
                        className={cn(
                          'size-10 rounded-xl flex items-center justify-center border border-white/8 shadow-inner',
                          transaction.type === 'INCOME'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-error/10 text-error'
                        )}
                      >
                        {transaction.type === 'INCOME' ? (
                          <ArrowUpIcon className="size-5 stroke-[2.5px]" />
                        ) : (
                          <ArrowDownIcon className="size-5 stroke-[2px]" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-5">
                      <span className="text-body-md font-bold text-on-surface">
                        {transaction.title}
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell py-5">
                      <span className="text-body-md text-muted-foreground">
                        {transaction.description || '-'}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell py-5">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/8 text-xs font-semibold text-muted-foreground">
                        {categoryName}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell py-5">
                      <span className="text-body-md text-muted-foreground">
                        {format(new Date(transaction.date), 'dd/MM/yyyy')}
                      </span>
                    </TableCell>
                    <TableCell className="py-5 text-right">
                      <span
                        className={cn(
                          'text-body-md font-bold tabular-nums',
                          transaction.type === 'INCOME'
                            ? 'text-primary'
                            : 'text-error'
                        )}
                      >
                        {transaction.type === 'INCOME' ? '+ ' : '- '}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 transition-opacity">
                        <SaveTransactionDialog
                          trigger={
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-9 hover:bg-white/10 text-muted-foreground hover:text-on-surface"
                            >
                              <Edit2Icon className="size-4 stroke-[2px]" />
                            </Button>
                          }
                          categories={categories}
                          currentTransaction={transaction}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-9 text-muted-foreground hover:text-error hover:bg-error/10"
                          onClick={() => setTransactionToDelete(transaction.id)}
                          disabled={isDeleting}
                        >
                          <Trash2Icon className="size-4 stroke-[2px]" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className="px-8 py-6 border-t border-white/8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white/5">
        <p className="text-label-sm text-muted-foreground">
          Mostrando{' '}
          <span className="text-on-surface font-semibold">
            {totalCount > 0 ? from : 0} a {to}
          </span>{' '}
          de <span className="text-on-surface font-semibold">{totalCount}</span>{' '}
          transações
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg text-muted-foreground hover:bg-white/5"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1 || isLoading}
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Simple pagination logic for 5 pages around current
              let pageNumber = currentPage
              if (totalPages <= 5) {
                pageNumber = i + 1
              } else if (currentPage <= 3) {
                pageNumber = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i
              } else {
                pageNumber = currentPage - 2 + i
              }

              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handlePageChange(pageNumber)}
                  className={cn(
                    'size-8 rounded-lg font-bold transition-all',
                    currentPage === pageNumber
                      ? 'bg-primary/20 text-primary hover:bg-primary/30 border border-primary/20'
                      : 'text-muted-foreground hover:bg-white/5 font-semibold'
                  )}
                  disabled={isLoading}
                >
                  {pageNumber}
                </Button>
              )
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="text-muted-foreground px-1">...</span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg text-muted-foreground hover:bg-white/5"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || isLoading}
          >
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>
      </div>

      <DeleteConfirmationDialog
        open={!!transactionToDelete}
        onOpenChange={(open) => {
          if (!open) setTransactionToDelete(null)
        }}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Excluir transação"
        description="Tem certeza que deseja excluir esta transação? Essa ação não pode ser desfeita."
      />
    </div>
  )
}
