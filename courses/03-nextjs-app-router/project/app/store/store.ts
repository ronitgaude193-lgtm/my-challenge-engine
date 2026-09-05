import {
  configureStore,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { api } from './apiSlice'

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
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const {
  increment,
  decrement,
  incrementByAmount,
} = counterSlice.actions

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,

    // RTK Query reducer
    [api.reducerPath]: api.reducer,
  },

  // RTK Query middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch