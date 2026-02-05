'use client'

import { ArrowDownCircle, ArrowUpCircle, Badge, Table } from 'lucide-react'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import type { Transaction } from '../../../generated/prisma/client'
import { Card } from '../ui/card'
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'

interface TransactionListProps {
  transactions: Transaction[]
}

export function TransactionsList({ transactions }: TransactionListProps) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12.5">Tipo</TableHead>
              <TableHead>Título</TableHead>
              <TableHead className="hidden md:table-cell">Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="hidden sm:table-cell">Data</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {transaction.type === 'INCOME' ? (
                    <ArrowUpCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
                  ) : (
                    <ArrowDownCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {transaction.title}
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {transaction.description || '-'}
                </TableCell>
                <TableCell>
                  <Badge>{transaction.categoryId}</Badge>
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
                  {formatCurrency(transaction.amount.toNumber())}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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
