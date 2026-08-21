import { useMemo } from 'react'
import { useGetPostsQuery } from '../api/apiSlice'
import {
  setFilterUserId,
  setSortBy,
  type SortBy,
} from '../store/slices/filtersSlice'
import {
  useAppDispatch,
  useAppSelector,
} from '../store/hooks'

const PostsWithFilters = () => {
  const dispatch = useAppDispatch()

  const { sortBy, filterUserId } = useAppSelector(
    (state) => state.filters,
  )

  const {
    data: posts,
    isLoading,
    isError,
  } = useGetPostsQuery()

  const filteredPosts = useMemo(() => {
    if (!posts) {
      return []
    }

    return posts
      .filter((post) =>
        filterUserId === null
          ? true
          : post.userId === filterUserId,
      )
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return b.id - a.id
        }

        if (sortBy === 'oldest') {
          return a.id - b.id
        }

        return a.title.localeCompare(b.title)
      })
  }, [posts, filterUserId, sortBy])

  if (isLoading) {
    return <p>Loading posts...</p>
  }

  if (isError) {
    return <p>Failed to load posts.</p>
  }

  const handleSortChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(
      setSortBy(event.target.value as SortBy),
    )
  }

  const handleUserChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value

    dispatch(
      setFilterUserId(
        value === 'all' ? null : Number(value),
      ),
    )
  }

  return (
    <section data-testid="posts-with-filters">
      <h2>Posts With Filters</h2>

      <div data-testid="filter-controls">
        <label htmlFor="sort-by">
          Sort:
        </label>

        <select
          id="sort-by"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title</option>
        </select>

        <label htmlFor="filter-user">
          User:
        </label>

        <select
          id="filter-user"
          value={
            filterUserId === null
              ? 'all'
              : String(filterUserId)
          }
          onChange={handleUserChange}
        >
          <option value="all">All Users</option>
          <option value="1">User 1</option>
          <option value="2">User 2</option>
          <option value="3">User 3</option>
        </select>
      </div>

      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <small>
              User ID: {post.userId}
            </small>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PostsWithFilters