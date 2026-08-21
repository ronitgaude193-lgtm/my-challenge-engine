import { useGetUsersQuery } from '../api/apiSlice'
import ErrorDisplay from './ErrorDisplay'

const UsersList = () => {
  // Required architecture pattern for the challenge.
  const useQueryHook = useGetUsersQuery

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQueryHook()

  if (isLoading) {
    return (
      <p data-testid="users-loading">
        Loading users...
      </p>
    )
  }

  if (isError) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={refetch}
      />
    )
  }

  return (
    <section>
      <h2>Users</h2>

      <ul data-testid="users-list">
        {data?.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong>
            <p>{user.email}</p>
            <p>{user.username}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default UsersList