import { useNavigate } from '@tanstack/react-router'
import { addMonths, format, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MonthNavigatorProps {
  year: number
  month: number
  minDate?: Date
}

export function MonthNavigator({ year, month, minDate }: MonthNavigatorProps) {
  const navigate = useNavigate()
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  const selectedDate = new Date(year, month - 1, 1)
  const isCurrentMonth = year === currentYear && month === currentMonth

  const isFirstMonth =
    minDate && year <= minDate.getFullYear() && month <= minDate.getMonth() + 1

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

  function handleCurrentMonth() {
    navigate({
      to: '.',
      search: (prev) => ({
        ...prev,
        month: currentMonth,
        year: currentYear
      })
    })
  }

  const label = format(selectedDate, "MMMM 'de' yyyy", { locale: ptBR })

  return (
    <div className="flex items-center gap-2">
      {!isCurrentMonth && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleCurrentMonth}
          className="h-9 px-3"
        >
          <Calendar className="mr-2 size-4" />
          Hoje
        </Button>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={handlePrevious}
        disabled={isFirstMonth}
      >
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
