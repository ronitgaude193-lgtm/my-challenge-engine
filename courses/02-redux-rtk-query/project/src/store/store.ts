import { configureStore, Middleware } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'
import counterReducer from './slices/counterSlice'
import uiReducer from './slices/uiSlice'
import usersReducer from './slices/usersSlice'

const loggerMiddleware: Middleware =
  (store) => (next) => (action) => {
    void store
    return next(action)
  }

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    ui: uiReducer,
    users: usersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loggerMiddleware)
      .concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch