import { useNavigate } from '@tanstack/react-router'
import { addMonths, format, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
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
    <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/8 p-1.5 rounded-2xl shadow-lg">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          className="size-9 rounded-xl text-muted-foreground hover:bg-white/10 hover:text-on-surface"
        >
          <ChevronLeft className="size-5 stroke-[2px]" />
        </Button>

        <div className="min-w-40 flex flex-col items-center">
          <span className="text-sm font-bold capitalize text-on-surface">
            {label.split(' de ')[0]}
          </span>
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
            {label.split(' de ')[1]}
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          disabled={isCurrentMonth}
          className="size-9 rounded-xl text-muted-foreground hover:bg-white/10 hover:text-on-surface"
        >
          <ChevronRight className="size-5 stroke-[2px]" />
        </Button>
      </div>

      {!isCurrentMonth && <div className="h-6 w-px bg-white/8 mx-1" />}

      {!isCurrentMonth && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCurrentMonth}
          className="h-9 px-4 rounded-xl text-primary font-bold hover:bg-primary/10 hover:text-primary transition-all"
        >
          <Calendar className="mr-2 size-4 stroke-[2px]" />
          Hoje
        </Button>
      )}
    </div>
  )
}
