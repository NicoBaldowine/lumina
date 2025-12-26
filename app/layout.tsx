import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'
import ThemeProvider from './components/ThemeProvider'
import LayoutWrapper from './components/layout/LayoutWrapper'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Lumina Studio',
  description: 'Design Agency specializing in innovative digital solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased tracking-tight">
        <ThemeProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
