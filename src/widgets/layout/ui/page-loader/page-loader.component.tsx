import { SharedService, SharedUi } from '@shared'
import { clsx } from 'cn'
import { useEffect, useState, type TransitionEvent } from 'react'
import { Constants } from '../../lib'

export function PageLoaderComponent() {
  const { locale } = SharedService.Locale.useLocale()
  const copy = Constants.PAGE_LOADER_COPY[locale]
  const [progress, setProgress] = useState(10)
  const [isVisible, setIsVisible] = useState(true)
  const [isRendered, setIsRendered] = useState(true)

  useEffect(() => {
    let hideTimeout: ReturnType<typeof setTimeout> | undefined

    const handleLoad = () => {
      setProgress(100)

      hideTimeout = setTimeout(() => {
        setIsVisible(false)
      }, 500)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad, { once: true })
    }

    return () => {
      window.removeEventListener('load', handleLoad)

      if (hideTimeout) {
        clearTimeout(hideTimeout)
      }
    }
  }, [])

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && event.propertyName === 'opacity' && !isVisible) {
      setIsRendered(false)
    }
  }

  if (!isRendered) return null

  const status = Constants.getPageLoaderStatus(progress, locale)

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      className={clsx(
        'z-loader fixed inset-0 isolate flex items-center justify-center overflow-hidden p-4',
        'bg-background/90 text-foreground backdrop-blur-2xl transition-opacity duration-500 sm:p-8',
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      role="status"
      aria-label={locale === 'en' ? 'Loading portfolio' : 'Загрузка портфолио'}
      aria-live="polite"
      aria-atomic="true"
    >
      <div aria-hidden="true" className="loader-glow pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div
        aria-hidden="true"
        className="bg-foreground/5 pointer-events-none absolute -top-32 -left-32 -z-10 size-96 rounded-full blur-3xl"
      />
      <div
        aria-hidden="true"
        className="bg-foreground/5 pointer-events-none absolute -right-24 -bottom-40 -z-10 size-96 rounded-full blur-3xl"
      />

      <div className="border-border/70 bg-background/65 shadow-foreground/[0.05] w-full max-w-lg rounded-[2rem] border p-6 shadow-2xl backdrop-blur-2xl sm:p-10">
        <div className="mb-10 flex items-center justify-between gap-4">
          <span className="text-muted-foreground text-xs font-medium tracking-[0.16em] uppercase">
            {copy.label}
          </span>
          <span className="border-border/70 bg-background/70 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs">
            <span
              className={clsx(
                'size-1.5 rounded-full',
                progress === 100 ? 'bg-foreground' : 'bg-muted-foreground motion-safe:animate-pulse',
              )}
            />
            {progress === 100 ? copy.state[1] : copy.state[0]}
          </span>
        </div>

        <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.16em] uppercase">
          {copy.role}
        </p>
        <h1 className="text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
          {copy.headline}
          <br />
          <span className="text-muted-foreground">{copy.headlineAccent}</span>
        </h1>
        <p className="text-muted-foreground mt-4 text-sm leading-6">{copy.description}</p>

        <div className="mt-9">
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-sm font-medium">{status}</p>
            <span className="font-mono text-sm tabular-nums">
              {String(progress).padStart(3, '0')}
              <span className="text-muted-foreground">%</span>
            </span>
          </div>
          <SharedUi.Progress value={progress} className="bg-muted h-2 w-full overflow-hidden rounded-full" />
        </div>

        <div className="border-border/70 mt-8 flex items-center justify-between border-t pt-4">
          <span className="text-muted-foreground text-xs">React · TypeScript · Node.js</span>
          <span className="text-muted-foreground text-xs">Sayu-ww</span>
        </div>
      </div>
    </div>
  )
}
