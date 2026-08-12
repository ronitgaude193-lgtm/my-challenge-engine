import { useCallback, useState } from 'react'

type SetValue<T> =
  | T
  | ((previousValue: T) => T)

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [
  T,
  (value: SetValue<T>) => void
] {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue =
        localStorage.getItem(key)

      if (storedValue === null) {
        return initialValue
      }

      return JSON.parse(storedValue) as T
    } catch {
      return initialValue
    }
  })

  const setStoredValue = useCallback(
    (newValue: SetValue<T>) => {
      setValue((previousValue) => {
        const nextValue =
          typeof newValue === 'function'
            ? (
                newValue as (
                  previousValue: T
                ) => T
              )(previousValue)
            : newValue

        try {
          localStorage.setItem(
            key,
            JSON.stringify(nextValue)
          )
        } catch {
          // Keep the state update even if localStorage fails.
        }

        return nextValue
      })
    },
    [key]
  )

  return [value, setStoredValue]
}

export default useLocalStorage