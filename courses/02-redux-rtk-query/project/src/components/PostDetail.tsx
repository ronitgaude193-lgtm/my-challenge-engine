import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../api/apiSlice'

interface PostDetailProps {
  postId?: number
}

function PostDetail({ postId: propPostId }: PostDetailProps) {
  const { postId: routePostId } = useParams<{
    postId: string
  }>()

  const id = propPostId ?? (
    routePostId ? Number(routePostId) : undefined
  )

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
    return (
      <div data-testid="post-detail">
        <p>No post found.</p>
      </div>
    )
  }

  return (
    <article data-testid="post-detail">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </article>
  )
}

export default PostDetail