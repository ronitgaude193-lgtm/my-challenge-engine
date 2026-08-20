import { configureStore, Middleware } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'

const loggerMiddleware: Middleware =
  (store) => (next) => (action) => {
    console.log('Dispatching:', action)
    const result = next(action)
    console.log('State after dispatch:', store.getState())
    return result
  }

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch