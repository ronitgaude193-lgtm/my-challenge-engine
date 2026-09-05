import AddPostForm from '../components/AddPostForm'

interface Post {
  id: number
  title: string
  body: string
}

export default async function PostsPage() {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts',
      {
        next: {
          revalidate: 60,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }

    const posts: Post[] = await response.json()

    return (
      <main>
        <h1>Posts</h1>

        <AddPostForm />

        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
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