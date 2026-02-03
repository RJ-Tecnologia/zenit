'use client'

import { ArrowDownCircle, ArrowUpCircle, Plus } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

type TransactionType = 'INCOME' | 'OUTCOME'

interface Transaction {
  id: string
  title: string
  type: TransactionType
  description?: string
  date: Date
  amount: number
  category: string
}

// Dados mockados para demonstração
const mockTransactions: Transaction[] = [
  {
    id: '1',
    title: 'Salário',
    type: 'INCOME',
    description: 'Pagamento mensal',
    date: new Date('2026-02-01T10:00:00'),
    amount: 5000.0,
    category: 'Trabalho'
  },
  {
    id: '2',
    title: 'Compras do mês',
    type: 'OUTCOME',
    description: 'Supermercado',
    date: new Date('2026-02-01T15:30:00'),
    amount: 450.0,
    category: 'Mercado'
  },
  {
    id: '3',
    title: 'Investimento em ações',
    type: 'OUTCOME',
    date: new Date('2026-01-31T09:00:00'),
    amount: 1000.0,
    category: 'Investimento'
  },
  {
    id: '4',
    title: 'Freelance projeto web',
    type: 'INCOME',
    description: 'Desenvolvimento de landing page',
    date: new Date('2026-01-30T14:20:00'),
    amount: 1500.0,
    category: 'Trabalho'
  },
  {
    id: '5',
    title: 'Restaurante',
    type: 'OUTCOME',
    date: new Date('2026-01-29T20:00:00'),
    amount: 180.0,
    category: 'Alimentação'
  },
  {
    id: '6',
    title: 'Dividendos',
    type: 'INCOME',
    description: 'Rendimento de investimentos',
    date: new Date('2026-01-28T08:00:00'),
    amount: 250.0,
    category: 'Investimento'
  }
]

export default function TransactionsPage() {
  const [open, setOpen] = useState(false)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="container mx-auto py-6 px-4 md:py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transações</h1>
          <p className="mt-2 text-muted-foreground">
            Gerencie suas transações financeiras
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Transação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nova Transação</DialogTitle>
              <DialogDescription>
                Adicione uma nova transação ao seu registro financeiro
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input id="title" placeholder="Ex: Compras do mês" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipo</Label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INCOME">Entrada</SelectItem>
                    <SelectItem value="OUTCOME">Saída</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Valor</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trabalho">Trabalho</SelectItem>
                    <SelectItem value="mercado">Mercado</SelectItem>
                    <SelectItem value="investimento">Investimento</SelectItem>
                    <SelectItem value="alimentacao">Alimentação</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input id="date" type="datetime-local" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição (opcional)</Label>
                <Input id="description" placeholder="Detalhes adicionais" />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  Adicionar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((transaction) => (
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
                    <Badge variant="outline">{transaction.category}</Badge>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {mockTransactions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">
              Nenhuma transação encontrada
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Comece adicionando sua primeira transação
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}
