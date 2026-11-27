import { SharedService, type SharedTypes } from '@shared'
import { SectionHeading } from './section-heading.component'

const COPY = {
  en: {
    eyebrow: 'Expertise',
    title: 'I build products end to end',
    description:
      'I combine interface development, application logic and integrations, always focused on the user’s actual needs.',
    areas: [
      {
        number: '01',
        title: 'Frontend & interfaces',
        description: 'Responsive interfaces, component systems, complex forms and application states.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'React Router'],
      },
      {
        number: '02',
        title: 'Data & product flows',
        description: 'Search, filtering, sorting, pagination and URL-synced state.',
        technologies: ['TanStack Query', 'Zustand', 'i18next'],
      },
      {
        number: '03',
        title: 'Backend & integrations',
        description: 'Server APIs, authentication, databases and payment service integrations.',
        technologies: ['Node.js', 'NestJS', 'PostgreSQL', 'JWT', 'Stripe'],
      },
      {
        number: '04',
        title: 'AI-assisted development',
        description:
          'I use AI in everyday development and create CLI skills for repeatable engineering tasks.',
        technologies: ['AI CLI', 'Claude', 'GitHub Copilot'],
      },
    ],
  },
  ru: {
    eyebrow: 'Чем занимаюсь',
    title: 'Собираю продукт целиком',
    description:
      'Сочетаю интерфейсную разработку, прикладную логику и интеграции — с фокусом на реальную задачу пользователя.',
    areas: [
      {
        number: '01',
        title: 'Frontend и интерфейсы',
        description:
          'Адаптивные интерфейсы, компонентные системы, сложные формы и состояния для веб-продуктов.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'React Router'],
      },
      {
        number: '02',
        title: 'Данные и продуктовые сценарии',
        description: 'Поиск, фильтрация, сортировки, пагинация и синхронизация состояния с URL.',
        technologies: ['TanStack Query', 'Zustand', 'i18next'],
      },
      {
        number: '03',
        title: 'Backend и интеграции',
        description: 'Серверные API, авторизация, работа с базами данных и подключение платёжных сервисов.',
        technologies: ['Node.js', 'NestJS', 'PostgreSQL', 'JWT', 'Stripe'],
      },
      {
        number: '04',
        title: 'Разработка с AI',
        description:
          'Использую AI в повседневной разработке и создаю CLI skills для повторяемых инженерных задач.',
        technologies: ['AI CLI', 'Claude', 'GitHub Copilot'],
      },
    ],
  },
} satisfies Record<
  SharedTypes.Locale,
  {
    eyebrow: string
    title: string
    description: string
    areas: { number: string; title: string; description: string; technologies: string[] }[]
  }
>

export function ExpertiseSection() {
  const { locale } = SharedService.Locale.useLocale()
  const copy = COPY[locale]

  return (
    <section id="expertise" className="scroll-mt-28">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {copy.areas.map((area) => (
          <article
            key={area.number}
            className="border-border/70 bg-background/55 hover:bg-background/80 rounded-3xl border p-6 backdrop-blur-xl transition-colors sm:p-7"
          >
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-mono text-xs">{area.number}</span>
              <span aria-hidden="true" className="text-muted-foreground text-lg">
                ↗
              </span>
            </div>
            <h3 className="mt-6 text-xl font-semibold tracking-tight">{area.title}</h3>
            <p className="text-muted-foreground mt-3 min-h-14 text-sm leading-6">{area.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {area.technologies.map((technology) => (
                <li
                  key={technology}
                  className="border-border/70 bg-background/70 text-muted-foreground rounded-full border px-3 py-1.5 text-xs"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
