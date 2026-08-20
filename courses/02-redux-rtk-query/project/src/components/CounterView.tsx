import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  decrement,
  increment,
} from '../store/slices/counterSlice'

function CounterView() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <section>
      <h1>Counter</h1>

      <p data-testid="counter-value">
        {count}
      </p>

      <button
        type="button"
        data-testid="increment-btn"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>

      <button
        type="button"
        data-testid="decrement-btn"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </section>
  )
}

export default CounterView