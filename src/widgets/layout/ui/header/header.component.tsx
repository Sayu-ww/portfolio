import { SharedService, SharedUi, type SharedTypes } from '@shared'
import { clsx } from 'cn'
import { useTheme } from 'next-themes'
import { NAVIGATION_MENU_ITEMS } from '../../lib/constant'

export function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const { locale, setLocale } = SharedService.Locale.useLocale()

  const handleSwitchTheme = () => {
    const root = document.documentElement

    root.classList.add('theme-transition')

    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')

    setTimeout(() => {
      root.classList.remove('theme-transition')
    }, 300)
  }

  return (
    <header className="border-border/60 bg-background/70 sticky top-0 z-50 border-b backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <SharedUi.Link to="/" className="shrink-0">
          <span className="text-sm font-semibold tracking-tight sm:text-base">Sayu-ww</span>
        </SharedUi.Link>
        <SharedUi.NavigationMenu className="ml-auto">
          <SharedUi.NavigationMenuList className="gap-0.5 sm:gap-2">
            {NAVIGATION_MENU_ITEMS.map((item) => (
              <SharedUi.NavigationMenuItem key={item.href}>
                <SharedUi.NavigationMenuLink
                  className={SharedUi.navigationMenuTriggerStyle()}
                  render={<a href={item.href}>{item.title[locale]}</a>}
                />
              </SharedUi.NavigationMenuItem>
            ))}
            <SharedUi.NavigationMenuItem>
              <div
                role="group"
                aria-label={locale === 'en' ? 'Language' : 'Язык'}
                className="border-border/70 flex items-center rounded-full border p-0.5"
              >
                {(['en', 'ru'] as const satisfies readonly SharedTypes.Locale[]).map((nextLocale) => (
                  <button
                    key={nextLocale}
                    type="button"
                    aria-pressed={locale === nextLocale}
                    onClick={() => setLocale(nextLocale)}
                    className={clsx(
                      'rounded-full px-2 py-1 text-[10px] font-medium transition-colors sm:px-2.5 sm:text-xs',
                      locale === nextLocale
                        ? 'bg-foreground text-background'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {nextLocale.toUpperCase()}
                  </button>
                ))}
              </div>
            </SharedUi.NavigationMenuItem>
            <SharedUi.NavigationMenuItem>
              <SharedUi.Switch
                checked={resolvedTheme === 'dark'}
                onCheckedChange={handleSwitchTheme}
                aria-label={locale === 'en' ? 'Toggle color theme' : 'Переключить тему'}
                size="sm"
              />
            </SharedUi.NavigationMenuItem>
          </SharedUi.NavigationMenuList>
        </SharedUi.NavigationMenu>
      </div>
    </header>
  )
}
