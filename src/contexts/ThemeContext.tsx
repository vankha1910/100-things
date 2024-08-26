import { createContext, useContext, useEffect, useState } from 'react'

interface ThemeType {
  theme: string
  toggleThem: () => void
}
const defaultTheme: ThemeType = {
  theme: 'light',
  toggleThem: () => {}
}
const ThemeContext = createContext(defaultTheme)

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem('100-things-theme') || 'light'
  )
  const toggleThem = () => setTheme(theme === 'light' ? 'dark' : 'light')
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
    localStorage.setItem('100-things-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleThem }}>
      {children}
    </ThemeContext.Provider>
  )
}
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemProvider')
  }
  return context
}
export default ThemeProvider
