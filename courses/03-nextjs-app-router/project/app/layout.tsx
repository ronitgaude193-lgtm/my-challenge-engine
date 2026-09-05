import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import StoreProvider from './providers/StoreProvider'

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
      <body>
        <StoreProvider>
          <nav>
            <Link href="/">Home</Link>
            {' | '}
            <Link href="/about">About</Link>
            {' | '}
            <Link href="/posts">Posts</Link>
          </nav>

          {children}
        </StoreProvider>
      </body>
    </html>
  )
}