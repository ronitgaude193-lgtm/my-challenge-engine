import {
  createContext,
  useContext,
  type ReactNode,
} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  setTheme: (
    theme: Theme
  ) => void
  toggleTheme: () => void
}

export const ThemeContext =
  createContext<
    ThemeContextValue | undefined
  >(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [
    theme,
    setTheme,
  ] = useLocalStorage<Theme>(
    'task-app-theme',
    'light'
  )

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === 'light'
        ? 'dark'
        : 'light'
    )
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context =
    useContext(ThemeContext)

  if (!context) {
    throw new Error(
      'useTheme must be used inside ThemeProvider'
    )
  }

  return context
}