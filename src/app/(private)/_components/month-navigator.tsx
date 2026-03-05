'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Button } from '@/components/ui/button'

export function MonthNavigator() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  const year = Number(searchParams.get('year')) || currentYear
  const month = Number(searchParams.get('month')) || currentMonth

  const selectedDate = new Date(year, month - 1, 1)
  const isCurrentMonth = year === currentYear && month === currentMonth

  const navigate = useCallback(
    (newYear: number, newMonth: number) => {
      const params = new URLSearchParams(searchParams.toString())

      if (newYear === currentYear && newMonth === currentMonth) {
        params.delete('year')
        params.delete('month')
      } else {
        params.set('year', String(newYear))
        params.set('month', String(newMonth))
      }

      const query = params.toString()
      router.push(query ? `?${query}` : '/')
    },
    [searchParams, router, currentYear, currentMonth]
  )

  function handlePrevious() {
    const prev = new Date(year, month - 2, 1)
    navigate(prev.getFullYear(), prev.getMonth() + 1)
  }

  function handleNext() {
    const next = new Date(year, month, 1)
    navigate(next.getFullYear(), next.getMonth() + 1)
  }

  const label = format(selectedDate, "MMMM 'de' yyyy", { locale: ptBR })

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={handlePrevious}>
        <ChevronLeft className="size-4" />
      </Button>

      <span className="min-w-45 text-center text-sm font-medium capitalize">
        {label}
      </span>

      <Button
        variant="outline"
        size="icon"
        onClick={handleNext}
        disabled={isCurrentMonth}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  )
}
