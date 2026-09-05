import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main>
      <h1>Home Page</h1>

      <p>Welcome to the Next.js App Router challenge.</p>

      <Image
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
      />

      <br />

      <Link href="/about">About</Link>
    </main>
  )
}