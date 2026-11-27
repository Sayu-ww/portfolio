import { SharedLib, SharedService, SharedUi } from '@shared'
import { SectionHeading } from './section-heading.component'
import { FeaturedProjectCard } from './featured-project-card.component'

const FEATURED_PROJECT_IDS: string[] = [
  SharedLib.Constants.PROJECT_IDS.NYST,
  SharedLib.Constants.PROJECT_IDS.GETTBOT,
  SharedLib.Constants.PROJECT_IDS.AVA_SECURITY,
]

const FEATURED_PROJECTS = SharedLib.Constants.PROJECTS.filter((project) =>
  FEATURED_PROJECT_IDS.includes(project.id),
)

const COPY = {
  en: {
    eyebrow: 'Selected work',
    title: 'Projects built around real needs',
    description:
      'A few products from my portfolio, from SaaS and admin tools to interfaces for video analytics.',
    allProjects: 'All projects',
  },
  ru: {
    eyebrow: 'Избранные проекты',
    title: 'Работа, за которой стоит задача',
    description:
      'Несколько продуктов из портфолио — от SaaS и административных систем до интерфейсов с видеоаналитикой.',
    allProjects: 'Все проекты',
  },
}

export function FeaturedProjectsSection() {
  const { locale } = SharedService.Locale.useLocale()
  const copy = COPY[locale]

  return (
    <section id="projects" className="scroll-mt-28">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
        <SharedUi.Link
          to="/projects"
          className="border-border/80 bg-background/60 hover:bg-muted inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors"
        >
          {copy.allProjects} <span aria-hidden="true">↗</span>
        </SharedUi.Link>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {FEATURED_PROJECTS.map((project) => (
          <FeaturedProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
