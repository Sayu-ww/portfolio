import { SharedLib, SharedService, SharedUi } from '@shared'
import { SectionHeading } from './section-heading.component'

export function ContactSection() {
  const { locale } = SharedService.Locale.useLocale()
  const copy =
    locale === 'en'
      ? {
          eyebrow: 'Contact',
          title: 'Have an idea? Let’s talk.',
          description:
            'Open to interesting projects and collaboration. Reach out and we can discuss the details.',
          labels: { email: 'Email', github: 'GitHub', phone: 'Phone', telegram: 'Telegram' },
          footer: 'Made with care',
        }
      : {
          eyebrow: 'Контакт',
          title: 'Есть идея? Давайте обсудим.',
          description: 'Открыт к интересным задачам и сотрудничеству. Напишите — обсудим детали.',
          labels: { email: 'Почта', github: 'GitHub', phone: 'Телефон', telegram: 'Telegram' },
          footer: 'Сделано с вниманием к деталям',
        }

  return (
    <section
      id="contact"
      className="border-border/70 bg-foreground/[0.04] scroll-mt-28 rounded-[2rem] border p-6 backdrop-blur-2xl sm:p-10 lg:p-12"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
          <div className="mt-7 flex flex-wrap gap-3">
            {SharedLib.Constants.CONTACTS.map((contact) => (
              <a
                key={contact.link}
                href={contact.link}
                target={contact.group === 'email' || contact.group === 'phone' ? undefined : '_blank'}
                rel={
                  contact.group === 'email' || contact.group === 'phone' ? undefined : 'noopener noreferrer'
                }
                aria-label={
                  locale === 'en'
                    ? `Contact via ${copy.labels[contact.group]}`
                    : `Связаться: ${copy.labels[contact.group]}`
                }
                className="border-border/80 bg-background/70 hover:bg-background inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm transition-colors"
              >
                <SharedUi.Icon name={contact.iconName} aria-hidden="true" className="size-4" />
                <span>{copy.labels[contact.group]}</span>
              </a>
            ))}
          </div>
        </div>
        <p className="text-muted-foreground max-w-48 text-xs leading-5 lg:text-right">
          {copy.footer}
          <br />
          Sayu-ww · {new Date().getFullYear()}
        </p>
      </div>
    </section>
  )
}
