import type { SharedTypes } from '@shared'

export const PAGE_LOADER_COPY = {
  en: {
    status: ['Preparing the interface', 'Loading projects', 'Almost ready', 'Portfolio ready'],
    label: 'Sayu-ww · Portfolio',
    state: ['Loading', 'Ready'],
    role: 'Full-stack development',
    headline: 'Building',
    headlineAccent: 'your experience online.',
    description: 'Please wait a moment while I load the portfolio.',
  },
  ru: {
    status: ['Подготавливаю интерфейс', 'Загружаю проекты', 'Почти готово', 'Портфолио готово'],
    label: 'Sayu-ww · Портфолио',
    state: ['Загрузка', 'Готово'],
    role: 'Fullstack-разработка',
    headline: 'Собираю',
    headlineAccent: 'ваш опыт в сети.',
    description: 'Подождите немного — загружаю проекты и детали портфолио.',
  },
} satisfies Record<
  SharedTypes.Locale,
  {
    status: [string, string, string, string]
    label: string
    state: [string, string]
    role: string
    headline: string
    headlineAccent: string
    description: string
  }
>

export const getPageLoaderStatus = (progress: number, locale: SharedTypes.Locale) => {
  const statuses = PAGE_LOADER_COPY[locale].status

  if (progress < 35) return statuses[0]
  if (progress < 70) return statuses[1]
  if (progress < 100) return statuses[2]
  return statuses[3]
}
