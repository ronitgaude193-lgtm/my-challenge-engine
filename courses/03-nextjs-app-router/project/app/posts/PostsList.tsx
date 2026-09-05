'use client'

import { useGetPostsQuery } from '../store/apiSlice'

export default function PostsList() {
  const {
    data: posts,
    isLoading,
    isError,
  } = useGetPostsQuery()

  if (isLoading) {
    return <p>Loading posts...</p>
  }

  if (isError) {
    return <p>Unable to load posts.</p>
  }

  if (!posts || posts.length === 0) {
    return <p>No posts found.</p>
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  )
}