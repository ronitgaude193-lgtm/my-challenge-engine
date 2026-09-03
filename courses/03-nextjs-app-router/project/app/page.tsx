import Link from 'next/link'
import Counter from './components/Counter'

export default function HomePage() {
  return (
    <main>
      <h1>Home Page</h1>

      <p>Welcome to the Next.js App Router challenge.</p>

      <Link href="/about">About</Link>

      <Counter />
    </main>
  )
}