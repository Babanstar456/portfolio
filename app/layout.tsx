import type { Metadata, Viewport } from 'next'
import { Syne, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tathagata Sengupta | Full-Stack Developer & Startup Founder',
  description: 'Portfolio of Tathagata Sengupta — Full-Stack Developer, SIH 2025 Grand Finalist, CEO & Founder. React.js, Node.js, AI/ML, and IoT engineer based in Kolkata.',
  keywords: ['Full-Stack Developer', 'React.js', 'Node.js', 'SIH 2025', 'Portfolio', 'Tathagata Sengupta'],
}

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
