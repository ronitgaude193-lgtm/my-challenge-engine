'use client'

import { useActionState } from 'react'
import { addPost } from '../actions'

type ActionState = {
  success: boolean
  message: string
}

const initialState: ActionState = {
  success: false,
  message: '',
}

export default function AddPostForm() {
  const [state, formAction, pending] = useActionState(
    async (_previousState: ActionState, formData: FormData) => {
      return addPost(formData)
    },
    initialState
  )

  return (
    <form action={formAction}>
      <label htmlFor="title">Post title</label>

      <input
        id="title"
        name="title"
        type="text"
        placeholder="Enter post title"
        required
      />

      <button type="submit" disabled={pending}>
        {pending ? 'Adding...' : 'Add Post'}
      </button>

      {state.message && <p>{state.message}</p>}
    </form>
  )
}