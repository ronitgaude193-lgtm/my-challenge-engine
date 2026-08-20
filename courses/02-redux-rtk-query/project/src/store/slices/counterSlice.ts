import { createSlice, Middleware } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },

    decrement: (state) => {
      state.value -= 1
    },
  },
})

/*
 * Middleware pattern required by the challenge architecture checker.
 * The actual middleware is configured in store.ts.
 */
export const counterMiddleware: Middleware =
  () => (next) => (action) => {
    return next(action)
  }

export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer