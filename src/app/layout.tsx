import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zenit',
  description: 'App para controle de finanças pessoais'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  )
}
