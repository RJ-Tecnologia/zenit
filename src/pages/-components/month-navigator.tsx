import { useNavigate } from '@tanstack/react-router'
import { addMonths, format, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MonthNavigatorProps {
  year: number
  month: number
}

export function MonthNavigator({ year, month }: MonthNavigatorProps) {
  const navigate = useNavigate()
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  const selectedDate = new Date(year, month - 1, 1)
  const isCurrentMonth = year === currentYear && month === currentMonth

  function handlePrevious() {
    const newDate = subMonths(selectedDate, 1)

    navigate({
      to: '.',
      search: (prev) => ({
        ...prev,
        month: newDate.getMonth() + 1,
        year: newDate.getFullYear()
      })
    })
  }

  function handleNext() {
    const newDate = addMonths(selectedDate, 1)

    navigate({
      to: '.',
      search: (prev) => ({
        ...prev,
        month: newDate.getMonth() + 1,
        year: newDate.getFullYear()
      })
    })
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
