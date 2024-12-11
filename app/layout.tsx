import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import MainLayout from '@/components/layout/main-layout'
import { Toaster } from "@/components/ui/toaster"

const roboto = Roboto({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'Qubit Tool',
  description: 'AI Agent Management Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-roboto antialiased`}>
        <MainLayout>
          {children}
        </MainLayout>
        <Toaster />
      </body>
    </html>
  )
}