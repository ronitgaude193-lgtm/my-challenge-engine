import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Next.js App Router',
  description: 'Learning Next.js App Router features and concepts.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <Link href="/">Home</Link>
          {' | '}
          <Link href="/about">About</Link>
          {' | '}
          <Link href="/posts">Posts</Link>
        </nav>

        {children}
      </body>
    </html>
  )
}