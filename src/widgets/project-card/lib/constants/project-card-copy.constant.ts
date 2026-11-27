import type { SharedTypes } from '@shared'

export const PROJECT_CARD_COPY = {
  en: {
    projectLabel: 'Project',
    category: {
      commercial: 'Commercial',
      'pet-project': 'Personal project',
      personal: 'Personal',
      'open-source': 'Open source',
    },
    caseStudy: 'CASE STUDY',
    previewUnavailable: 'PREVIEW UNAVAILABLE',
    viewDetails: 'VIEW DETAILS',
    liveDemo: 'Live demo',
    openDemo: 'Open live demo',
    more: 'More',
    close: 'Close',
    technicalOverview: 'PROJECT / TECHNICAL OVERVIEW',
    frontend: 'Frontend',
    backend: 'Backend',
    frontendTechnologies: 'Frontend technologies',
    backendTechnologies: 'Backend technologies',
    unavailableCode: 'Code examples are not available for this project yet.',
  },
  ru: {
    projectLabel: 'Проект',
    category: {
      commercial: 'Коммерческий',
      'pet-project': 'Личный проект',
      personal: 'Личный',
      'open-source': 'Открытый код',
    },
    caseStudy: 'КЕЙС',
    previewUnavailable: 'ПРЕВЬЮ НЕДОСТУПНО',
    viewDetails: 'ПОДРОБНОСТИ',
    liveDemo: 'Демо',
    openDemo: 'Открыть демо проекта',
    more: 'Подробнее',
    close: 'Закрыть',
    technicalOverview: 'ПРОЕКТ / ТЕХНИЧЕСКИЙ ОБЗОР',
    frontend: 'Frontend',
    backend: 'Backend',
    frontendTechnologies: 'Frontend-технологии',
    backendTechnologies: 'Backend-технологии',
    unavailableCode: 'Примеры кода для этого проекта пока не добавлены.',
  },
} satisfies Record<
  SharedTypes.Locale,
  {
    projectLabel: string
    category: Record<'commercial' | 'pet-project' | 'personal' | 'open-source', string>
    caseStudy: string
    previewUnavailable: string
    viewDetails: string
    liveDemo: string
    openDemo: string
    more: string
    close: string
    technicalOverview: string
    frontend: string
    backend: string
    frontendTechnologies: string
    backendTechnologies: string
    unavailableCode: string
  }
>
