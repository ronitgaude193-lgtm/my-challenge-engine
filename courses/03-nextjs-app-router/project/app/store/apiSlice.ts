import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

interface Post {
  id: number
  title: string
  body: string
}

export const api = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),

  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'api/posts',
    }),
  }),
})

export const { useGetPostsQuery } = api