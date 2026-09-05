'use server'

import { revalidatePath } from 'next/cache'

export async function addPost(formData: FormData) {
  const title = formData.get('title')

  if (typeof title !== 'string' || title.trim() === '') {
    return {
      success: false,
      message: 'Title is required.',
    }
  }

  // Simulated mutation
  // Replace this with a database/API mutation when available.
  const newPost = {
    title: title.trim(),
  }

  if (!newPost.title) {
    return {
      success: false,
      message: 'Unable to create post.',
    }
  }

  revalidatePath('/posts')

  return {
    success: true,
    message: 'Post added successfully.',
  }
}