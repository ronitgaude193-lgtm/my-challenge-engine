import Link from 'next/link'
import AddPostForm from '../components/AddPostForm'

interface Post {
  id: number
  title: string
  body: string
}

interface PostsPageProps {
  searchParams: {
    q?: string
    page?: string
  }
}

export const dynamic = 'force-dynamic'

export default async function PostsPage({
  searchParams,
}: PostsPageProps) {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts'
    )

    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }

    const posts: Post[] = await response.json()

    // Read search parameters
    const query = searchParams.q?.toLowerCase() ?? ''
    const currentPage = Math.max(
      1,
      Number(searchParams.page) || 1
    )

    // Search/filter posts
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(query)
    )

    // Pagination
    const postsPerPage = 10
    const totalPages = Math.ceil(
      filteredPosts.length / postsPerPage
    )

    const startIndex = (currentPage - 1) * postsPerPage
    const paginatedPosts = filteredPosts.slice(
      startIndex,
      startIndex + postsPerPage
    )

    return (
      <main>
        <h1>Posts</h1>

        <AddPostForm />

        {/* Search */}
        <form method="GET" action="/posts">
          <input
            type="text"
            name="q"
            placeholder="Search posts..."
            defaultValue={searchParams.q ?? ''}
          />

          <button type="submit">Search</button>
        </form>

        {/* Results */}
        {paginatedPosts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          <ul>
            {paginatedPosts.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav aria-label="Pagination">
            {currentPage > 1 && (
              <Link
                href={`/posts?q=${encodeURIComponent(query)}&page=${currentPage - 1}`}
              >
                Previous
              </Link>
            )}

            <span>
              {' '}
              Page {currentPage} of {totalPages}{' '}
            </span>

            {currentPage < totalPages && (
              <Link
                href={`/posts?q=${encodeURIComponent(query)}&page=${currentPage + 1}`}
              >
                Next
              </Link>
            )}
          </nav>
        )}
      </main>
    )
  } catch {
    return (
      <main>
        <h1>Posts</h1>
        <p>Unable to load posts.</p>
      </main>
    )
  }
}