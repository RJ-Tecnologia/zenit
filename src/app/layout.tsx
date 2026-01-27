import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Zenit Finance',
  description: 'App para controle de finanças pessoais'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <body
          className={`dark ${plusJakartaSans.className} font-sans antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
