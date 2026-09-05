import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main>
      <h1>Home Page</h1>

      <p>Welcome to the Next.js App Router challenge.</p>

      <Image
        src="https://placehold.co/600x400"
        alt="Placeholder image"
        width={600}
        height={400}
      />

      <br />

      <Link href="/about">About</Link>
    </main>
  )
}