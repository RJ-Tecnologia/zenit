'use client'

import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  PencilIcon,
  Trash2Icon
} from 'lucide-react'
import { toast } from 'sonner'
import { deleteTransaction } from '@/actions/delete-transaction'
import type { Category } from '@/generated/prisma/client'
import type { SerializedTransaction } from '@/types/serialized-transaction'
import { formatCurrency } from '@/utils/format-currency'
import { formatDateTime } from '@/utils/format-datetime'
import { Badge } from '../ui/badge'
import { Card } from '../ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import { SaveTransactionDialog } from './save-transaction-dialog'

interface TransactionListProps {
  transactions: SerializedTransaction[]
  categories: Category[]
}

export function TransactionsList({
  transactions,
  categories
}: TransactionListProps) {
  async function handleDelete(transactionId: string) {
    await deleteTransaction(transactionId)

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
                    <Badge>{transaction.category.name}</Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {formatDateTime(transaction.date)}
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
                        onClick={() => handleDelete(transaction.id)}
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
    </Card>
  )
}
