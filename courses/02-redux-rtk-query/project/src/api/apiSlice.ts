import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

import {
  mockApi,
  type User,
  type Post,
} from './mockServer'

export interface NewPost {
  userId: number
  title: string
  body: string
}

export const apiSlice = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),

  tagTypes: ['User', 'Post'],

  endpoints: (builder) => ({
    // Challenge 07: Get Users
    getUsers: builder.query<User[], void>({
      queryFn: async () => {
        try {
          const users = await mockApi.getUsers()

          return {
            data: users,
          }
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to fetch users',
            },
          }
        }
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'User' as const,
                id,
              })),
              {
                type: 'User' as const,
                id: 'LIST',
              },
            ]
          : [
              {
                type: 'User' as const,
                id: 'LIST',
              },
            ],
    }),

    // Challenge 08: Get Posts
    getPosts: builder.query<Post[], void>({
      queryFn: async () => {
        try {
          const posts = await mockApi.getPosts()

          return {
            data: posts,
          }
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to fetch posts',
            },
          }
        }
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Post' as const,
                id,
              })),
              {
                type: 'Post' as const,
                id: 'LIST',
              },
            ]
          : [
              {
                type: 'Post' as const,
                id: 'LIST',
              },
            ],
    }),

    // Challenge 13: Query with Parameters
    getPostById: builder.query<Post, number>({
      queryFn: async (id) => {
        try {
          const post = await mockApi.getPostById(id)

          return {
            data: post,
          }
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to fetch post',
            },
          }
        }
      },

      providesTags: (_result, _error, id) => [
        {
          type: 'Post',
          id,
        },
      ],
    }),

    // Challenge 09: Add Post
    addPost: builder.mutation<Post, NewPost>({
      queryFn: async (newPost) => {
        try {
          const post = await mockApi.createPost(newPost)

          return {
            data: post,
          }
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to create post',
            },
          }
        }
      },

      invalidatesTags: [
        {
          type: 'Post',
          id: 'LIST',
        },
      ],

      // Challenge 10: Optimistic Update
      async onQueryStarted(
        newPost,
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            'getPosts',
            undefined,
            (draft) => {
              draft.push({
                ...newPost,
                id: Date.now(),
              })
            },
          ),
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),

    // Create User
    createUser: builder.mutation<User, Omit<User, 'id'>>({
      queryFn: async (user) => {
        try {
          const newUser = await mockApi.createUser(user)

          return {
            data: newUser,
          }
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to create user',
            },
          }
        }
      },

      invalidatesTags: [
        {
          type: 'User',
          id: 'LIST',
        },
      ],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useGetPostsQuery,
  useGetPostByIdQuery,
  useAddPostMutation,
  useCreateUserMutation,
} = apiSlice