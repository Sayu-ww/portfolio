import type * as LayoutTypes from '../../type'

export const NAVIGATION_MENU_ITEMS: LayoutTypes.UiTypes.NavLinkItem[] = [
  {
    title: { en: 'Expertise', ru: 'Навыки' },
    href: '/#expertise',
    description: {
      en: 'My areas of expertise and the technologies I use.',
      ru: 'Направления моей работы и используемые технологии.',
    },
  },
  {
    title: { en: 'Projects', ru: 'Проекты' },
    href: '/#projects',
    description: { en: 'Selected projects and case studies.', ru: 'Избранные проекты и кейсы.' },
  },
  {
    title: { en: 'Contact', ru: 'Контакт' },
    href: '/#contact',
    description: { en: 'Get in touch to discuss working together.', ru: 'Связаться для сотрудничества.' },
  },
]
