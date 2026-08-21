import { useGetUsersQuery } from '../api/apiSlice'

const UsersList = () => {
  const useQueryHook = useGetUsersQuery

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQueryHook()

  if (isLoading) {
    return <p data-testid="users-loading">Loading...</p>
  }

  if (isError) {
    return (
      <p data-testid="users-error">
        {error ? 'Failed to load users' : 'Unknown error'}
      </p>
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