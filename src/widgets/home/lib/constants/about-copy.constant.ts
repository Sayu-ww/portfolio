import type { SharedTypes } from '@shared'

type AboutCopy = {
  role: string
  headline: string
  headlineAccent: string
  intro: string
  projects: string
  contact: string
  valuesLabel: string
  values: string[]
  projectRange: string
  aboutLabel: string
  aboutTitle: string
  aboutText: string
  aiLabel: string
  aiTitle: string
  aiText: string
}

export const ABOUT_COPY = {
  en: {
    role: 'Full-stack developer · Sayu-ww',
    headline: 'I build digital products',
    headlineAccent: 'from idea to launch.',
    intro:
      'I build interfaces with React and TypeScript, connecting them to APIs and server-side logic with Node.js. I enjoy turning complex flows into clear, thoughtful user experiences.',
    projects: 'View projects',
    contact: 'Get in touch',
    valuesLabel: 'What I value',
    values: ['Clear architecture', 'Thoughtful interface states', 'Solutions that are easy to extend'],
    projectRange: 'From landing pages and SaaS products to customer portals and admin panels.',
    aboutLabel: 'About me',
    aboutTitle: 'From interface to API',
    aboutText:
      'I work with React, TypeScript, Node.js and NestJS. My projects focus on responsive design, integrations, data flows and the details that make a product useful every day.',
    aiLabel: 'AI in my workflow',
    aiTitle: 'I build skills for AI CLIs',
    aiText:
      'I use AI tools in development and create custom skills for CLI assistants, turning repeatable tasks and context into practical workflows. AI helps with the routine; I stay responsible for technical decisions and the final result.',
  },
  ru: {
    role: 'Fullstack-разработчик · Sayu-ww',
    headline: 'Создаю цифровые продукты',
    headlineAccent: 'от идеи до запуска.',
    intro:
      'Разрабатываю интерфейсы на React и TypeScript, связываю их с API и серверной логикой на Node.js. Люблю превращать сложные сценарии в понятный и аккуратный пользовательский опыт.',
    projects: 'Смотреть проекты',
    contact: 'Связаться',
    valuesLabel: 'В работе ценю',
    values: ['Понятную архитектуру', 'Продуманные состояния интерфейса', 'Решения, которые легко развивать'],
    projectRange: 'От лендингов и SaaS-интерфейсов до личных кабинетов и административных панелей.',
    aboutLabel: 'Обо мне',
    aboutTitle: 'От интерфейса до API',
    aboutText:
      'Работаю с React, TypeScript, Node.js и NestJS. В проектах уделяю внимание адаптивности, интеграциям, управлению данными и тому, как продукт ощущается в ежедневном использовании.',
    aiLabel: 'AI в работе',
    aiTitle: 'Создаю skills для AI CLI',
    aiText:
      'Использую AI-инструменты в разработке и делаю для CLI-ассистентов собственные skills: упаковываю повторяемые задачи и контекст в понятные рабочие сценарии. Нейросеть помогает ускорить рутину, а технические решения и результат остаются под моим контролем.',
  },
} satisfies Record<SharedTypes.Locale, AboutCopy>
