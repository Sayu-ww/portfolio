import type { ProjectEntity } from 'entities'
import { PROJECT_IDS } from './project-ids.constant'

export const PROJECTS: ProjectEntity.Model.Types.Project[] = [
  {
    id: PROJECT_IDS.NYST,
    title: 'NYST',
    category: 'commercial',
    description: {
      ru: 'Fullstack-платформа автоклуба: публичная часть с календарём мероприятий, авторизацией и членством, а также admin-панель для управления событиями, таблицами и данными пользователей. Стек: React, NestJS, TanStack Query, Zustand, JWT и Stripe.',
      en: 'A full-stack platform for a car club, featuring a public events calendar, authentication and memberships, plus an admin panel for managing events, tables and user data. Stack: React, NestJS, TanStack Query, Zustand, JWT and Stripe.',
    },
    preview: '/images/projects/commercial/nyst/banner.webp',
    images: [
      {
        src: '/images/projects/commercial/nyst/calendar.webp',
        description: {
          ru: 'UI календаря событий: навигация по месяцам, сетка дат и маркеры заездов. Выбор события открывает detail-панель с датой, временем, изображением и условиями участия; в интерфейсе также отображаются ограничения и скидки для участников клуба.',
          en: 'The event calendar UI includes month navigation, a date grid and race markers. Selecting an event opens a details panel with its date, time, image and participation terms. The interface also shows member restrictions and discounts.',
        },
      },
      {
        src: '/images/projects/commercial/nyst/login.webp',
        description: {
          ru: 'Сценарий авторизации в модальном окне поверх текущей страницы: поля email и password, toggle видимости пароля, remember-me checkbox, а также переходы к восстановлению пароля и регистрации.',
          en: 'An authentication flow in a modal over the current page: email and password fields, a password visibility toggle, a remember-me checkbox, and links to password recovery and registration.',
        },
      },
      {
        src: '/images/projects/commercial/nyst/membership.webp',
        description: {
          ru: 'Секция тарифов с сопоставлением trial- и basic-планов: стоимость, набор преимуществ и условия участия вынесены в отдельные блоки. CTA покупки расположен рядом с соответствующим тарифом, что связывает выбор плана с целевым действием.',
          en: 'A pricing section comparing trial and basic plans. Pricing, benefits and membership terms are presented in separate blocks, with a purchase CTA alongside each plan.',
        },
      },
      {
        src: '/images/projects/commercial/nyst/mobile-login&date.webp',
        description: {
          ru: 'Адаптация ключевых сценариев под узкий viewport: календарная сетка перестраивается в вертикальный список event-карточек, форма авторизации занимает мобильный экран, а контент JetRiders отображается в одноколоночной компоновке.',
          en: 'Key flows adapted for narrow viewports: the calendar becomes a vertical list of event cards, the authentication form fills the mobile screen, and JetRiders content switches to a single-column layout.',
        },
      },
      {
        src: '/images/projects/commercial/nyst/mobile-nav-bar&footer.webp',
        description: {
          ru: 'Мобильный паттерн навигации: меню открывается поверх страницы и предоставляет ссылки на основные разделы. В адаптивном footer сгруппированы навигационные ссылки, контактные данные и ссылки на социальные сети.',
          en: 'Mobile navigation opens as an overlay with links to the main sections. The responsive footer groups navigation, contact details and social links.',
        },
      },
      {
        src: '/images/projects/commercial/nyst/admin-events.webp',
        description: {
          ru: 'Admin-панель со списком мероприятий: таблица для просмотра записей и их статусов, рядом доступны действия управления событиями. Скриншот показывает отдельный административный сценарий, не смешанный с публичным календарём.',
          en: 'The admin events panel shows a table of records and statuses with event-management actions. This is a separate administrative workflow, distinct from the public calendar.',
        },
      },
      {
        src: '/images/projects/commercial/nyst/admin-table-edit.webp',
        description: {
          ru: 'Экран редактирования табличных данных в admin-панели. Формы и действия вынесены в отдельный рабочий интерфейс для изменения записей без перехода в публичную часть сайта.',
          en: 'A screen for editing tabular data in the admin panel. Forms and actions are grouped into a dedicated workspace for updating records without switching to the public site.',
        },
      },
      {
        src: '/images/projects/commercial/nyst/admin-user-info.png',
        description: {
          ru: 'Карточка пользователя в административной панели: сводные данные аккаунта и связанные показатели собраны в одном представлении для проверки и управления профилем.',
          en: 'An admin user card brings account details and related metrics together in one view for reviewing and managing the profile.',
        },
      },
    ],
    backendCodeSnippets: [
      {
        title: {
          ru: 'Пример того как выглядит RoleGuard на NYST',
          en: 'Example of the NYST RoleGuard',
        },
        language: 'typescript',
        code: `import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../enums/role.enum';
import { IS_PUBLIC_KEY } from '../decorators/roles/public.decorator';
import { ROLES_KEY } from '../decorators/roles/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}`,
      },
    ],
    linkToDeployProject: 'https://nyst.ubc.one/',
  },
  {
    id: PROJECT_IDS.GETTBOT,
    title: 'GETTBOT.IO',
    category: 'commercial',
    description: {
      ru: 'SaaS-платформа: бесконечная лента, cursor pagination, фильтрация, поиск в URL и мультиязычность.',
      en: 'A SaaS platform with an infinite feed, cursor pagination, filtering, URL-based search and multilingual support.',
    },
    preview: '/images/projects/commercial/gettbot/preview.webp',
    images: [
      {
        src: '/images/projects/commercial/gettbot/gettbot-preview.webp',
        description: { ru: '', en: '' },
      },
      {
        src: '/images/projects/commercial/gettbot/gettbot-sorts.webp',
        description: {
          ru: 'Реализация адаптивной сетки карточек маркетплейса с серверной фильтрацией (биржа, валюта, мин. инвестиции, поиск по ID) и кастомной сортировкой по множеству метрик. Состояние всех фильтров, сортировки и пагинации синхронизировано с URL (query string), что позволяет делиться ссылкой на конкретную выборку и сохранять состояние при перезагрузке.',
          en: 'A responsive marketplace grid with server-side filtering (exchange, currency, minimum investment and ID search) and custom sorting across multiple metrics. Filters, sorting and pagination stay in sync with the URL, so a specific result set can be shared and restored after a reload.',
        },
      },
      {
        src: '/images/projects/commercial/gettbot/gettbot-card-loaders-s-mode.webp',
        description: { ru: '', en: '' },
      },
      {
        src: '/images/projects/commercial/gettbot/gettbot-card-loaders.webp',
        description: {
          ru: 'Демонстрация ленивой загрузки (lazy loading) и скелетон-состояний для сеточного и альтернативного табличного (списочного) видов отображения стратегий. Вкладка Network подтверждает асинхронную подгрузку данных API, а также кэширование статических ресурсов (иконок, макетов) для оптимизации времени до первого рендера.',
          en: 'Demonstrates lazy loading and skeleton states for both grid and table/list strategy views. The Network panel shows asynchronous API requests and cached static assets, such as icons and layouts, to improve the initial render.',
        },
      },
      {
        src: '/images/projects/commercial/gettbot/mobile.webp',
        description: {
          ru: 'Адаптивная мобильная версия страницы с полной переработкой UI под тач-управление. Демонстрирует корректную работу React-компонентов при смене viewport, включая вынос фильтров в отдельный интерфейс и вертикальный стек карточек.',
          en: 'A mobile layout redesigned for touch interaction. It shows responsive React components, filters moved into a dedicated interface, and cards arranged in a vertical stack.',
        },
      },
      {
        src: '/images/projects/commercial/gettbot/gettbot-en-translate.webp',
        description: { ru: '', en: '' },
      },

      {
        src: '/images/projects/commercial/gettbot/gettbot-zh-translate.webp',
        description: {
          ru: 'Страница принципов платформы с модульной компонентной версткой и кастомной 3D-графикой. Подтверждает реализацию мультиязычности (i18n) на уровне всего приложения: переключение локалей (EN, RU, ZH) происходит без перезагрузки страницы и без дублирования кода компонентов.',
          en: 'A platform principles page built from modular components with custom 3D graphics. It demonstrates app-wide localization: switching between EN, RU and ZH without reloading or duplicating components.',
        },
      },
    ],
    linkToDeployProject: 'https://gettbot.io/',
  },
  {
    id: PROJECT_IDS.AVA_SECURITY,
    title: 'AVA Security',
    category: 'commercial',
    description: {
      ru: 'Двуязычный лендинг AI-видеонаблюдения (RU/EN) с hero-секцией, CTA и блоками Security и Autonomy. Отдельный экран демонстрирует сценарии видеоаналитики: детекцию людей и животных, выезд из зоны и дорожные столкновения. Реализована адаптивная и кроссбраузерная вёрстка.',
      en: 'A bilingual (RU/EN) landing page for AI video surveillance, with a hero, CTAs and Security and Autonomy sections. A separate screen presents video analytics scenarios such as person and animal detection, zone exits and road collisions. Responsive, cross-browser layouts are implemented.',
    },
    preview: '/images/projects/commercial/ava-security-services/main-ru.webp',
    images: [
      {
        src: '/images/projects/commercial/ava-security-services/main-en.webp',
        description: {
          ru: 'Англоязычная версия главной страницы. Помимо hero-блока видны секции Security и Autonomy: локальная обработка событий, снижение нагрузки на операторов, автоматическое формирование фрагментов инцидентов и доставка уведомлений в приложение.',
          en: 'The English homepage with a hero and Security and Autonomy sections. It presents on-device event processing, reduced operator workload, automatic incident clips and notifications delivered to the app.',
        },
      },
      {
        src: '/images/projects/commercial/ava-security-services/main-ru.webp',
        description: {
          ru: 'Русскоязычная версия главной страницы с теми же блоками Security и Autonomy. Скриншот показывает локальный анализ событий, защиту данных, автоматическую запись фрагментов инцидентов и уведомления в приложении.',
          en: 'The Russian homepage with the same Security and Autonomy sections. It shows on-device event analysis, data protection, automatic incident recording and in-app notifications.',
        },
      },
      {
        src: '/images/projects/commercial/ava-security-services/video.webp',
        description: {
          ru: 'Секция видеоаналитики с переключаемыми типами детекции: людей, животных, выезда из зоны и дорожных столкновений. Основная область оформлена как видеоплеер с LIVE-индикатором и кнопкой запуска; внизу указаны технологии проекта.',
          en: 'A video analytics section with selectable detection types: people, animals, zone exits and road collisions. The main area is a video player with a LIVE indicator and play button, with the project technologies listed below.',
        },
      },
    ],
    linkToDeployProject: 'https://ava-security.services/',
  },
  {
    id: PROJECT_IDS.A_BIRDS_CHAT,
    title: 'A Birds Chat',
    category: 'commercial',
    description: {
      ru: 'Приложение для создания временных приватных чатов без регистрации.',
      en: 'An app for creating temporary private chats without signing up.',
    },
    preview: '/images/projects/commercial/a-birds-chat/preview.webp',
    images: [
      {
        src: '/images/projects/commercial/a-birds-chat/a-birds-banner.webp',
        description: {
          ru: 'Промо-лендинг iOS-приложения: адаптивная сетка, мокап iPhone с экраном ввода PIN-кода. Реализованы мультиязычность, фиксированная навигация и прямая интеграция с App Store.',
          en: 'A promotional landing page for an iOS app, featuring a responsive grid and an iPhone mockup with a PIN-entry screen. Includes localization, fixed navigation and a direct App Store integration.',
        },
      },
      {
        src: '/images/projects/commercial/a-birds-chat/a-birds-images.webp',
        description: {
          ru: 'Сверстал сетку карточек с абсолютным позиционированием мокапов iPhone и сов, настроил z-index для наложения графики и overflow: hidden для обрезки. Обеспечил адаптивное перестроение композиции под мобильные.',
          en: 'Built a card grid with absolutely positioned iPhone and owl mockups, layering the artwork with z-index and clipping it with overflow: hidden. The composition adapts to mobile screens.',
        },
      },
    ],
    linkToDeployProject: 'https://abirdschat.uk/',
  },
  {
    id: PROJECT_IDS.UBC,
    title: 'UBC',
    category: 'commercial',
    description: {
      ru: 'Адаптивный сайт проектного офиса: главная с позиционированием и CTA, каталог кейсов с описаниями и стеками технологий, мобильная версия с фиксированной нижней навигацией.',
      en: 'A responsive website for a project studio: a homepage with clear positioning and a CTA, a case-study catalog with descriptions and tech stacks, and a mobile layout with fixed bottom navigation.',
    },
    preview: '/images/projects/commercial/ubc/preview.webp',
    images: [
      {
        src: '/images/projects/commercial/ubc/banner.webp',
        description: {
          ru: 'Первый экран лендинга проектного офиса: бренд, value proposition и CTA «Discuss the project». Текстовый блок и иллюстрация собраны в двухколоночную композицию; декоративный фон поддерживает визуальную тему чертежей.',
          en: 'The project studio landing page hero: brand, value proposition and a “Discuss the project” CTA. Copy and illustration form a two-column layout over a blueprint-inspired decorative background.',
        },
      },
      {
        src: '/images/projects/commercial/ubc/cards.webp',
        description: {
          ru: 'Секция портфолио с карточками кейсов: название проекта, категория, стек технологий и превью продукта. Компонент карточки объединяет метаданные с изображением результата, позволяя быстро сравнивать проекты в общей сетке.',
          en: 'A portfolio section of case-study cards showing each project name, category, technologies and product preview. The cards combine metadata and visuals for quick comparison in a shared grid.',
        },
      },
      {
        src: '/images/projects/commercial/ubc/mobile.webp',
        description: {
          ru: 'Мобильная адаптация портфолио: карточки перестроены в одну колонку, а нижняя навигация закреплена у края viewport. На карточке сохранены превью, описание и тип проекта; фиксированная панель даёт доступ к Cases, Main и Audit.',
          en: 'The portfolio adapts to mobile with a single-column card layout and bottom navigation fixed to the viewport. Cards retain their preview, description and project type, while the bar links to Cases, Main and Audit.',
        },
      },
    ],
    linkToDeployProject: 'https://ubc.one/',
  },
  {
    id: PROJECT_IDS.PIGGY_HODL,
    title: 'PiggyHODL',
    category: 'commercial',
    description: {
      ru: 'Интерфейс показывает позиции игроков, баланс piggies, билеты и количество приглашённых участников.',
      en: 'The interface shows player rankings, piggy balances, tickets and invited-member counts.',
    },
    preview: '/images/projects/commercial/piggy-hodle/preview.webp',
    images: [
      {
        src: '/images/projects/commercial/piggy-hodle/dashboard.webp',
        description: {
          ru: 'Экран игры с лидербордом: ранги и профили участников, количество билетов и рефералов, игровые показатели и CTA для подписки или запуска игры.',
          en: 'A game dashboard with a leaderboard: player ranks and profiles, ticket and referral counts, game stats, and CTAs to subscribe or launch the game.',
        },
      },
    ],
  },
  {
    id: PROJECT_IDS.WATER_METERS,
    title: 'Water Meters',
    category: 'commercial',
    description: {
      ru: 'Веб-интерфейс системы учёта водосчётчиков: вход в административную часть и табличное представление данных абонентов/приборов учёта с действиями над записями.',
      en: 'A web interface for water meter management, with an admin sign-in and a table of subscriber and meter data with record-level actions.',
    },
    preview: '/images/projects/commercial/water-meters/preview.webp',
    images: [
      {
        src: '/images/projects/commercial/water-meters/auth.webp',
        description: {
          ru: 'Экран авторизации в административную часть: компактная форма входа с полями учётных данных и основным submit-действием на фоне тематической иллюстрации.',
          en: 'An admin sign-in screen with a compact credentials form and primary submit action over a themed illustration.',
        },
      },
      {
        src: '/images/projects/commercial/water-meters/table.webp',
        description: {
          ru: 'Табличный экран управления данными водосчётчиков: записи представлены строками с набором атрибутов, а операции доступны из строки таблицы. Интерфейс ориентирован на просмотр и обработку множества записей.',
          en: 'A table-based water meter management screen. Each record displays its attributes and row-level actions, making it easier to review and process many entries.',
        },
      },
    ],
  },
  {
    id: PROJECT_IDS.DEFUTURE,
    title: 'DeFuture',
    category: 'commercial',
    description: {
      ru: 'Telegram Mini App с профилем, заданиями, рейтингом, балансами и реферальной системой; данные приложения загружаются через backend API.',
      en: 'A Telegram Mini App with profiles, tasks, rankings, balances and a referral system, powered by a backend API.',
    },
    preview: '/images/projects/commercial/defuture/preview.webp',
    images: [
      {
        src: '/images/projects/commercial/defuture/defuture.webp',
        description: {
          ru: 'Telegram Mini App с профилем, заданиями, рейтингом, балансами, реферальной системой и интеграцией с backend API.',
          en: 'A Telegram Mini App featuring profiles, tasks, rankings, balances, a referral system and backend API integration.',
        },
      },
    ],
  },
  {
    id: PROJECT_IDS.CASH_FLOW,
    title: 'Cash Flow',
    category: 'pet-project',
    description: {
      ru: 'Fullstack-приложение для личных финансов: доходы и расходы, категории, бюджеты, фильтрация и пагинация транзакций.',
      en: 'A full-stack personal finance app for income and expenses, categories, budgets, and filterable, paginated transactions.',
    },
    preview: '/images/projects/commercial/cash-flow/preview.webp',
    images: [
      {
        src: '/images/projects/commercial/ava-security-services/ava-security-services.png',
        description: {
          ru: 'Баннер',
          en: 'Banner',
        },
      },
    ],
    backendCodeSnippets: [
      {
        title: {
          ru: 'Пример: API транзакций',
          en: 'Example: Transactions API',
        },
        language: 'typescript',
        code: `@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll(@Query() query: TransactionsQueryDto) {
    return this.transactionsService.findAll(query)
  }
}`,
      },
    ],
  },
]
