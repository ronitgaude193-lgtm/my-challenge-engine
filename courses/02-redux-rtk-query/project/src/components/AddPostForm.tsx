import { useState } from 'react'
import { useAddPostMutation } from '../api/apiSlice'

const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [userId, setUserId] = useState('1')

  const [
    addPost,
    {
      isLoading,
      isSuccess,
      isError,
    },
  ] = useAddPostMutation()

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (!title.trim() || !body.trim()) {
      return
    }

    try {
      await addPost({
        userId: Number(userId),
        title: title.trim(),
        body: body.trim(),
      }).unwrap()

      setTitle('')
      setBody('')
    } catch {
      // Error state is handled by isError.
    }
  }

  return (
    <section>
      <h2>Add Post</h2>

      <form
        id="add-post-form"
        data-testid="add-post-form"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="post-user-id">
            User ID
          </label>

          <input
            id="post-user-id"
            type="number"
            min="1"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="post-title">
            Title
          </label>

          <input
            id="post-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="post-body">
            Body
          </label>

          <textarea
            id="post-body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          data-testid="add-post-submit"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Post'}
        </button>
      </form>

      {isSuccess && (
        <p data-testid="add-post-success">
          Post added successfully!
        </p>
      )}

      {isError && (
        <p data-testid="add-post-error">
          Failed to add post
        </p>
      )}
    </section>
  )
}

export default AddPostForm