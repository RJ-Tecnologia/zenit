import { useMutation } from '@tanstack/react-query'
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  PencilIcon,
  Trash2Icon
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
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
import { formatCurrency } from '@/utils/format-currency'
import { formatDateTime } from '@/utils/format-datetime'
import type { Transaction } from '../types'
import { SaveTransactionDialog } from './save-transaction-dialog'

interface TransactionListProps {
  transactions: Transaction[]
  categories: Category[]
}

export function TransactionsList({
  transactions,
  categories
}: TransactionListProps) {
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(
    null
  )

  const { mutateAsync: deleteTransaction } = useMutation({
    mutationFn: deleteTransactionRequest
  })

  async function handleDelete() {
    if (!transactionToDelete) return

    await deleteTransaction({ transactionId: transactionToDelete })
    setTransactionToDelete(null)

    toast.success('Movimentação deletada!')
  }

  return (
    <Card>
      {transactions.length > 0 && (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12.5">Tipo</TableHead>
                <TableHead>Título</TableHead>
                <TableHead className="hidden md:table-cell">
                  Descrição
                </TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="hidden sm:table-cell">Data</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="w-24 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {transaction.type === 'INCOME' ? (
                      <ArrowUpCircleIcon className="size-5 text-green-600 dark:text-green-500" />
                    ) : (
                      <ArrowDownCircleIcon className="size-5 text-red-600 dark:text-red-500" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {transaction.title}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {transaction.description ?? '-'}
                  </TableCell>
                  <TableCell>
                    <Badge>{transaction.categoryId}</Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {formatDateTime(new Date(transaction.date))}
                  </TableCell>
                  <TableCell
                    className={`text-right font-semibold ${
                      transaction.type === 'INCOME'
                        ? 'text-green-600 dark:text-green-500'
                        : 'text-red-600 dark:text-red-500'
                    }`}
                  >
                    {transaction.type === 'INCOME' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <SaveTransactionDialog
                        trigger={
                          <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            aria-label="Editar transação"
                          >
                            <PencilIcon className="size-4" />
                          </button>
                        }
                        categories={categories}
                        currentTransaction={transaction}
                      />
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        aria-label="Excluir transação"
                        onClick={() => setTransactionToDelete(transaction.id)}
                      >
                        <Trash2Icon className="size-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {transactions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">Nenhuma transação encontrada</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Comece adicionando sua primeira transação
          </p>
        </div>
      )}

      <AlertDialog
        open={!!transactionToDelete}
        onOpenChange={(open) => {
          if (!open) setTransactionToDelete(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir transação</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta transação? Essa ação não pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
