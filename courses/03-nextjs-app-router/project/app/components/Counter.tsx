'use client'

import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { increment, decrement } from '../store/store'

export default function Counter() {
  const count = useSelector(
    (state: RootState) => state.counter.value
  )

  const dispatch = useDispatch<AppDispatch>()

  return (
    <section>
      <h2>Redux Counter</h2>

      <p>Count: {count}</p>

      <button onClick={() => dispatch(decrement())}>
        -
      </button>

      <button onClick={() => dispatch(increment())}>
        +
      </button>
    </section>
  )
}