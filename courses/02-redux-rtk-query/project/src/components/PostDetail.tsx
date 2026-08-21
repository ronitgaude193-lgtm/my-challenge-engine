import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../api/apiSlice'

function PostDetail() {
  const { postId } = useParams<{ postId: string }>()

  const id = postId ? Number(postId) : undefined

  const {
    data: post,
    isLoading,
    isError,
  } = useGetPostByIdQuery(id as number, {
    skip: !id,
  })

  if (isLoading) {
    return (
      <div data-testid="post-detail-loading">
        Loading post...
      </div>
    )
  }

  if (isError) {
    return (
      <div data-testid="post-detail-error">
        Failed to load post.
      </div>
    )
  }

  if (!post) {
    return <p>No post found.</p>
  }

  return (
    <article data-testid="post-detail">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </article>
  )
}

export default PostDetail