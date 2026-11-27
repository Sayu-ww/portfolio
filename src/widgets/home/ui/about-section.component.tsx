import { SharedLib, SharedService, SharedUi } from '@shared'
import { Constants } from '../lib'

export function AboutSection() {
  const { locale } = SharedService.Locale.useLocale()
  const copy = Constants.ABOUT_COPY[locale]
  const email = SharedLib.Constants.CONTACTS.find((contact) => contact.group === 'email')

  return (
    <section id="about" className="scroll-mt-28">
      <div className="border-border/70 bg-background/65 shadow-foreground/[0.04] relative isolate overflow-hidden rounded-[2rem] border p-6 shadow-2xl backdrop-blur-2xl sm:p-10 lg:p-14">
        <div
          aria-hidden="true"
          className="bg-foreground/5 pointer-events-none absolute -top-32 -right-24 -z-10 size-96 rounded-full blur-3xl"
        />
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <div className="border-border/70 bg-background/70 text-muted-foreground mb-8 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs backdrop-blur-xl">
              <span className="bg-foreground size-1.5 rounded-full" />
              {copy.role}
            </div>

            <h1 className="max-w-3xl text-4xl leading-[1.08] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              {copy.headline}
              <span className="text-muted-foreground"> {copy.headlineAccent}</span>
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8">
              {copy.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <SharedUi.Link
                to="#projects"
                className="bg-foreground text-background inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
              >
                {copy.projects} <span aria-hidden="true">↘</span>
              </SharedUi.Link>
              {email && (
                <a
                  href={email.link}
                  className="border-border/80 bg-background/60 hover:bg-muted inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors"
                >
                  {copy.contact} <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>

          <aside className="border-border/70 bg-background/55 rounded-3xl border p-5 backdrop-blur-xl sm:p-6">
            <p className="text-muted-foreground text-xs font-medium tracking-[0.16em] uppercase">
              {copy.valuesLabel}
            </p>
            <ul className="mt-5 space-y-4">
              {copy.values.map((value) => (
                <li key={value} className="flex items-start gap-3 text-sm leading-6">
                  <span className="bg-foreground/70 mt-2 size-1.5 shrink-0 rounded-full" />
                  {value}
                </li>
              ))}
            </ul>
            <div className="border-border/70 mt-6 border-t pt-5">
              <p className="text-muted-foreground text-sm leading-6">{copy.projectRange}</p>
            </div>
          </aside>
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="border-border/70 bg-background/55 rounded-3xl border p-6 backdrop-blur-xl sm:p-8">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.16em] uppercase">
            {copy.aboutLabel}
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">{copy.aboutTitle}</h2>
          <p className="text-muted-foreground mt-3 text-sm leading-7">{copy.aboutText}</p>
        </div>
        <div className="border-border/70 bg-foreground/[0.04] rounded-3xl border p-6 backdrop-blur-xl sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="text-muted-foreground text-xs font-medium tracking-[0.16em] uppercase">
              {copy.aiLabel}
            </p>
            <span className="border-border/70 text-muted-foreground rounded-full border px-2.5 py-1 text-[11px]">
              Human-led · AI-assisted
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">{copy.aiTitle}</h2>
          <p className="text-muted-foreground mt-3 text-sm leading-7">{copy.aiText}</p>
        </div>
      </div>
    </section>
  )
}
