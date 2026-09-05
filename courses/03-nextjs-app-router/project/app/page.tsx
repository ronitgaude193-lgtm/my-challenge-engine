import Link from 'next/link'

export const dynamic = 'force-static'

export default function HomePage() {
  return (
    <main>
      <h1>Home Page</h1>

      <p>Welcome to the Next.js App Router challenge.</p>

      <nav>
        <Link href="/about">About</Link>
        <br />
        <Link href="/posts">Posts</Link>
      </nav>
    </main>
  )
}