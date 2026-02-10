export function formatCurrency(value: number | string) {
  const numericValue = typeof value === 'string' ? Number(value) : value

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(numericValue)
}

export function parseDecimal(value: string): number {
  return Number(value)
}
