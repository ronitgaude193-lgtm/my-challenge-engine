import { configureStore, Middleware } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import uiReducer from './slices/uiSlice'

const loggerMiddleware: Middleware =
  (store) => (next) => (action) => {
    void store
    return next(action)
  }

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    ui: uiReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch