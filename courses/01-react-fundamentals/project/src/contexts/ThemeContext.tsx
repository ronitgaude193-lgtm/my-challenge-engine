import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type Theme = 'light' | 'dark'

export interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const ThemeContext =
  createContext<ThemeContextValue | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

const THEME_STORAGE_KEY = 'task-app-theme'

function getInitialTheme(): Theme {
  const storedTheme = localStorage.getItem(
    THEME_STORAGE_KEY
  )

  if (
    storedTheme === 'light' ||
    storedTheme === 'dark'
  ) {
    return storedTheme
  }

  return 'light'
}

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [theme, setTheme] =
    useState<Theme>(getInitialTheme)

  useEffect(() => {
    localStorage.setItem(
      THEME_STORAGE_KEY,
      theme
    )

    document.documentElement.setAttribute(
      'data-theme',
      theme
    )
  }, [theme])

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

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error(
      'useTheme must be used inside ThemeProvider'
    )
  }

  return context
}