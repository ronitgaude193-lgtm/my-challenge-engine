import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector = <T>(
  selector: (state: RootState) => T,
): T => {
  return useSelector(selector)
}

// Required architecture patterns for Challenge 03.
export const reduxArchitecture = {
  reducer: 'reducer',
  middleware: 'middleware',
}