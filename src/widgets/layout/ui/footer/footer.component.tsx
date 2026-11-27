import { SharedService } from '@shared'

export function Footer() {
  const { locale } = SharedService.Locale.useLocale()

  return (
    <footer className="flex flex-col items-center justify-center gap-2 px-4 py-5 text-center text-xs text-gray-500 sm:text-sm dark:text-gray-400">
      <p>
        © {new Date().getFullYear()} Sayu-ww.{' '}
        {locale === 'en' ? 'All rights reserved.' : 'Все права защищены.'}
      </p>
      <p className="max-w-full">
        {locale === 'en' ? 'Designed & built with care by ' : 'Сделано с вниманием к деталям · '}
        <a href="https://github.com/Sayu-ww" target="_blank" rel="noopener noreferrer">
          Sayu-ww
        </a>
      </p>
    </footer>
  )
}
