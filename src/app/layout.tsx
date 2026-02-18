import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { ptBR } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'
import { shadcn } from '@clerk/themes'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'

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
    <ClerkProvider localization={ptBR} appearance={{ theme: shadcn }}>
      <html lang="pt-BR" suppressHydrationWarning>
        <body className={`${plusJakartaSans.className} font-sans antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <Toaster richColors position="top-center" closeButton />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
