import { SharedLib, SharedService, SharedUi } from '@shared'
import type { ProjectEntity } from 'entities'

type Props = {
  project: ProjectEntity.Model.Types.Project
}

export function FeaturedProjectCard(props: Props) {
  const { project } = props
  const { locale } = SharedService.Locale.useLocale()
  const copy =
    locale === 'en'
      ? {
        commercial: 'Commercial project',
        personal: 'Personal project',
        case: 'View case',
        demo: 'Live demo',
      }
      : { commercial: 'Коммерческий проект', personal: 'Личный проект', case: 'Смотреть кейс', demo: 'Демо' }
  const technologies = SharedLib.Constants.PROJECT_TECHNOLOGIES.filter((technology) =>
    technology.projectIds.includes(project.id),
  ).slice(0, 4)

  return (
    <article className="group border-border/70 bg-background/60 overflow-hidden rounded-3xl border backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1">
      <div className="bg-muted relative overflow-hidden">
        <SharedUi.Image
          src={project.preview ?? project.images[0]?.src}
          alt={locale === 'en' ? `${project.title} project preview` : `Превью проекта ${project.title}`}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs text-white backdrop-blur-md">
          {project.category === 'pet-project' ? copy.personal : copy.commercial}
        </span>
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
          <span className="text-muted-foreground font-mono text-xs">{project.id.toUpperCase()}</span>
        </div>
        <p className="text-muted-foreground mt-3 line-clamp-3 text-sm leading-6">
          {project.description[locale]}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <li
              key={technology.id}
              className="bg-muted text-muted-foreground rounded-full px-3 py-1.5 text-xs"
            >
              {technology.name}
            </li>
          ))}
        </ul>
        <div className="border-border/70 mt-6 flex items-center justify-between border-t pt-4">
          <SharedUi.Link
            to="/projects"
            className="hover:text-muted-foreground text-sm font-medium transition-colors"
          >
            {copy.case} <span aria-hidden="true">↗</span>
          </SharedUi.Link>
          {project.linkToDeployProject && (
            <a
              href={project.linkToDeployProject}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground text-xs transition-colors"
            >
              {copy.demo} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
