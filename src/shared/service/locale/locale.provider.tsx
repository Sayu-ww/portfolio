import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react'
import type { Locale } from '../../types'

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

const LOCALE_STORAGE_KEY = 'portfolio-locale'

export function LocaleProvider(props: PropsWithChildren) {
  const { children } = props
  const [locale, setLocale] = useState<Locale>('ru')
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    const nextLocale: Locale = storedLocale === 'en' ? 'en' : 'ru'

    setLocale(nextLocale)
    document.documentElement.lang = nextLocale
    document.title = nextLocale === 'en' ? "Sayu-ww's Portfolio" : 'Портфолио Sayu-ww'
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (!isInitialized) return

    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    document.documentElement.lang = locale
    document.title = locale === 'en' ? "Sayu-ww's Portfolio" : 'Портфолио Sayu-ww'
  }, [isInitialized, locale])

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }

  return context
}
