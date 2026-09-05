interface Post {
  id: number
  title: string
  body: string
}

interface PostPageProps {
  params: {
    id: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  )

  if (!response.ok) {
    return (
      <main>
        <h1>Post Not Found</h1>
        <p>Unable to find post {params.id}.</p>
      </main>
    )
  }

  const post: Post = await response.json()

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>Post ID: {params.id}</p>
    </main>
  )
}