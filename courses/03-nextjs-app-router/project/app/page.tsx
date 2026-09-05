import Image from 'next/image'
import Link from 'next/link'
import Counter from './components/Counter'

export default function HomePage() {
  return (
    <main>
      <h1>Home Page</h1>

      <p>Welcome to the Next.js App Router challenge.</p>

      <Link href="/about">About</Link>

      <Counter />

      <Image
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
      />
    </main>
  )
}