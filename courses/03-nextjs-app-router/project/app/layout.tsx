import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

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