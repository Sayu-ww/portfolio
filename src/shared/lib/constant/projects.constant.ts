import type { ProjectEntity } from 'entities'
import { PROJECT_IDS } from './project-ids.constant'

export const PROJECTS: ProjectEntity.Model.Types.Project[] = [
  {
    id: PROJECT_IDS.NYST,
    title: 'NYST',
    category: 'commercial',
    description:
      'Fullstack-платформа автоклуба: публичная часть с календарём мероприятий, авторизацией и членством, а также admin-панель для управления событиями, таблицами и данными пользователей. Стек: React, NestJS, TanStack Query, Zustand, JWT и Stripe.',
    preview: '/images/projects/commercial/nyst/banner.webp',
    images: [
      {
        src: '/images/projects/commercial/nyst/calendar.webp',
        description:
          'UI календаря событий: навигация по месяцам, сетка дат и маркеры заездов. Выбор события открывает detail-панель с датой, временем, изображением и условиями участия; в интерфейсе также отображаются ограничения и скидки для участников клуба.',
      },
      {
        src: '/images/projects/commercial/nyst/login.webp',
        description:
          'Сценарий авторизации в модальном окне поверх текущей страницы: поля email и password, toggle видимости пароля, remember-me checkbox, а также переходы к восстановлению пароля и регистрации.',
      },
      {
        src: '/images/projects/commercial/nyst/membership.webp',
        description:
          'Секция тарифов с сопоставлением trial- и basic-планов: стоимость, набор преимуществ и условия участия вынесены в отдельные блоки. CTA покупки расположен рядом с соответствующим тарифом, что связывает выбор плана с целевым действием.',
      },
      {
        src: '/images/projects/commercial/nyst/mobile-login&date.webp',
        description:
          'Адаптация ключевых сценариев под узкий viewport: календарная сетка перестраивается в вертикальный список event-карточек, форма авторизации занимает мобильный экран, а контент JetRiders отображается в одноколоночной компоновке.',
      },
      {
        src: '/images/projects/commercial/nyst/mobile-nav-bar&footer.webp',
        description:
          'Мобильный паттерн навигации: меню открывается поверх страницы и предоставляет ссылки на основные разделы. В адаптивном footer сгруппированы навигационные ссылки, контактные данные и ссылки на социальные сети.',
      },
      {
        src: '/images/projects/commercial/nyst/admin-events.webp',
        description:
          'Admin-панель со списком мероприятий: таблица для просмотра записей и их статусов, рядом доступны действия управления событиями. Скриншот показывает отдельный административный сценарий, не смешанный с публичным календарём.',
      },
      {
        src: '/images/projects/commercial/nyst/admin-table-edit.webp',
        description:
          'Экран редактирования табличных данных в admin-панели. Формы и действия вынесены в отдельный рабочий интерфейс для изменения записей без перехода в публичную часть сайта.',
      },
      {
        src: '/images/projects/commercial/nyst/admin-user-info.png',
        description:
          'Карточка пользователя в административной панели: сводные данные аккаунта и связанные показатели собраны в одном представлении для проверки и управления профилем.',
      },
    ],
    backendCodeSnippets: [
      {
        title: 'Пример того как выглядит RoleGuard на NYST',
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
      {
        title: 'EventService с MikroORM: пагинация, фильтрация и CRUD операции',
        language: 'typescript',
        code: `import { FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventsRepository: EntityRepository<EventEntity>,
  ) {}

  public async getEventNames(dto: GetEventNamesRequest) {
    const where: FilterQuery<EventEntity> = {};

    if (dto.search != null) {
      where.name = { $like: \`%\${dto.search}%\` };
    }

    const offset = ((dto.page ?? 1) - 1) * dto.limit;

    const [events, totalItems] = await this.eventsRepository.findAndCount(
      where,
      {
        limit: dto.limit,
        offset,
        orderBy: { name: 'ASC' },
      },
    );

    const items = events.map((e) => new EventNameItem(e.id, e.name));

    return new PagingArrayResponse(items, totalItems);
  }

  public async updateEvent(id: number, eventData: UpdateEventRequest) {
    const event = await this.eventsRepository.findOne({ id });

    if (!event) {
      throw new NotFoundException(\`Event with id \${id} not found\`);
    }

    const newEData = {
      ...eventData,
      ...(eventData.date !== undefined && { date: new Date(eventData.date) }),
    };

    wrap(event).assign(newEData);

    await this.eventsRepository.getEntityManager().flush();

    return event;
  }
}`,
      },
      {
        title: 'ApiResponseFormatMiddleware: унифицированный формат ответов API',
        language: 'typescript',
        code: `import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiResponseFormatMiddleware implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<ApiResponse<any>> {
    const http = context.switchToHttp();
    const response = http.getResponse();

    return next.handle().pipe(
      map((responseData) => {
        const mappedResponse: ApiResponse<typeof responseData> = {
          status: response.statusCode,
          data: responseData,
          error: undefined,
        };

        return mappedResponse;
      }),
    );
  }
}`,
      },
      {
        title: 'Custom validator: IsEmailOrPhoneNumber decorator',
        language: 'typescript',
        code: `import {
  registerDecorator,
  ValidationOptions,
  isEmail,
  isPhoneNumber,
} from 'class-validator';

export function IsEmailOrPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isEmailOrPhoneNumber',
      target: object.constructor,
      propertyName,
      options: {
        message: \`\${propertyName} must be a valid email or phone number\`,
        ...validationOptions,
      },
      validator: {
        validate(value: unknown) {
          if (typeof value !== 'string') {
            return false;
          }

          return isEmail(value) || isPhoneNumber(value);
        },
      },
    });
  };
}`,
      },
      {
        title: 'CheckFileExistsInterceptor: проверка существования файла перед загрузкой',
        language: 'typescript',
        code: `import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { existsSync, unlinkSync } from 'fs';
import { join, extname, dirname } from 'path';

@Injectable()
export class CheckFileExistsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const file = request.file as Express.Multer.File;
    const name = request.body.name;

    if (!file || !name) {
      return next.handle();
    }

    const ext = extname(file.originalname);
    const filename = \`\${name}\${ext}\`;

    const uploadDir = dirname(file.path);
    const filePath = join(uploadDir, filename);

    if (existsSync(filePath)) {
      try {
        unlinkSync(file.path);
      } catch (error) {
        console.error('Failed to delete temp file:', error);
      }

      throw new ConflictException(
        \`File with name "\${filename}" already exists\`,
      );
    }

    return next.handle();
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
    description:
      'SaaS-платформа: бесконечная лента, cursor pagination, фильтрация, поиск в URL и мультиязычность.',
    preview: '/images/projects/commercial/gettbot/preview.webp',
    images: [
      {
        src: '/images/projects/commercial/gettbot/gettbot-preview.webp',
        description: '',
      },
      {
        src: '/images/projects/commercial/gettbot/gettbot-sorts.webp',
        description:
          'Реализация адаптивной сетки карточек маркетплейса с серверной фильтрацией (биржа, валюта, мин. инвестиции, поиск по ID) и кастомной сортировкой по множеству метрик. Состояние всех фильтров, сортировки и пагинации синхронизировано с URL (query string), что позволяет делиться ссылкой на конкретную выборку и сохранять состояние при перезагрузке.',
      },
      {
        src: '/images/projects/commercial/gettbot/gettbot-card-loaders-s-mode.webp',
        description: '',
      },
      {
        src: '/images/projects/commercial/gettbot/gettbot-card-loaders.webp',
        description:
          'Демонстрация ленивой загрузки (lazy loading) и скелетон-состояний для сеточного и альтернативного табличного (списочного) видов отображения стратегий. Вкладка Network подтверждает асинхронную подгрузку данных API, а также кэширование статических ресурсов (иконок, макетов) для оптимизации времени до первого рендера.',
      },
      {
        src: '/images/projects/commercial/gettbot/mobile.webp',
        description:
          'Адаптивная мобильная версия страницы с полной переработкой UI под тач-управление. Демонстрирует корректную работу React-компонентов при смене viewport, включая вынос фильтров в отдельный интерфейс и вертикальный стек карточек.',
      },
      {
        src: '/images/projects/commercial/gettbot/gettbot-en-translate.webp',
        description: '',
      },

      {
        src: '/images/projects/commercial/gettbot/gettbot-zh-translate.webp',
        description:
          'Страница принципов платформы с модульной компонентной версткой и кастомной 3D-графикой. Подтверждает реализацию мультиязычности (i18n) на уровне всего приложения: переключение локалей (EN, RU, ZH) происходит без перезагрузки страницы и без дублирования кода компонентов.',
      },
    ],
    linkToDeployProject: 'https://gettbot.io/',
  },
  {
    id: PROJECT_IDS.AVA_SECURITY,
    title: 'AVA Security',
    category: 'commercial',
    description:
      'Двуязычный лендинг AI-видеонаблюдения (RU/EN) с hero-секцией, CTA и блоками Security и Autonomy. Отдельный экран демонстрирует сценарии видеоаналитики: детекцию людей и животных, выезд из зоны и дорожные столкновения. Реализована адаптивная и кроссбраузерная вёрстка.',
    preview: '/images/projects/commercial/ava-security-services/main-ru.webp',
    images: [
      {
        src: '/images/projects/commercial/ava-security-services/main-en.webp',
        description:
          'Англоязычная версия главной страницы. Помимо hero-блока видны секции Security и Autonomy: локальная обработка событий, снижение нагрузки на операторов, автоматическое формирование фрагментов инцидентов и доставка уведомлений в приложение.',
      },
      {
        src: '/images/projects/commercial/ava-security-services/main-ru.webp',
        description:
          'Русскоязычная версия главной страницы с теми же блоками Security и Autonomy. Скриншот показывает локальный анализ событий, защиту данных, автоматическую запись фрагментов инцидентов и уведомления в приложении.',
      },
      {
        src: '/images/projects/commercial/ava-security-services/video.webp',
        description:
          'Секция видеоаналитики с переключаемыми типами детекции: людей, животных, выезда из зоны и дорожных столкновений. Основная область оформлена как видеоплеер с LIVE-индикатором и кнопкой запуска; внизу указаны технологии проекта.',
      },
    ],
    linkToDeployProject: 'https://ava-security.services/',
  },
  {
    id: PROJECT_IDS.A_BIRDS_CHAT,
    title: 'A Birds Chat',
    category: 'commercial',
    description: 'Приложение для создания временных приватных чатов без регистрации.',
    preview: '/images/projects/commercial/a-birds-chat/preview.webp',
    images: [
      {
        src: '/images/projects/commercial/a-birds-chat/a-birds-banner.webp',
        description:
          'Промо-лендинг iOS-приложения: адаптивная сетка, мокап iPhone с экраном ввода PIN-кода. Реализованы мультиязычность, фиксированная навигация и прямая интеграция с App Store.',
      },
      {
        src: '/images/projects/commercial/a-birds-chat/a-birds-images.webp',
        description:
          'Сверстал сетку карточек с абсолютным позиционированием мокапов iPhone и сов, настроил z-index для наложения графики и overflow: hidden для обрезки. Обеспечил адаптивное перестроение композиции под мобильные.',
      },
    ],
    linkToDeployProject: 'https://abirdschat.uk/',
  },
  {
    id: PROJECT_IDS.UBC,
    title: 'UBC',
    category: 'commercial',
    description:
      'Адаптивный сайт проектного офиса: главная с позиционированием и CTA, каталог кейсов с описаниями и стеками технологий, мобильная версия с фиксированной нижней навигацией.',
    preview: '/images/projects/commercial/ubc/preview.webp',
    images: [
      {
        src: '/images/projects/commercial/ubc/banner.webp',
        description:
          'Первый экран лендинга проектного офиса: бренд, value proposition и CTA «Discuss the project». Текстовый блок и иллюстрация собраны в двухколоночную композицию; декоративный фон поддерживает визуальную тему чертежей.',
      },
      {
        src: '/images/projects/commercial/ubc/cards.webp',
        description:
          'Секция портфолио с карточками кейсов: название проекта, категория, стек технологий и превью продукта. Компонент карточки объединяет метаданные с изображением результата, позволяя быстро сравнивать проекты в общей сетке.',
      },
      {
        src: '/images/projects/commercial/ubc/mobile.webp',
        description:
          'Мобильная адаптация портфолио: карточки перестроены в одну колонку, а нижняя навигация закреплена у края viewport. На карточке сохранены превью, описание и тип проекта; фиксированная панель даёт доступ к Cases, Main и Audit.',
      },
    ],
    linkToDeployProject: 'https://ubc.one/',
  },
  {
    id: PROJECT_IDS.PIGGY_HODL,
    title: 'PiggyHODL',
    category: 'commercial',
    description:
      'Интерфейс показывает позиции игроков, баланс piggies, билеты и количество приглашённых участников.',
    preview: '/images/projects/commercial/piggy-hodle/preview.webp',
    images: [
      {
        src: '/images/projects/commercial/piggy-hodle/dashboard.webp',
        description:
          'Экран игры с лидербордом: ранги и профили участников, количество билетов и рефералов, игровые показатели и CTA для подписки или запуска игры.',
      },
    ],
  },
  {
    id: PROJECT_IDS.WATER_METERS,
    title: 'Water Meters',
    category: 'commercial',
    description:
      'Веб-интерфейс системы учёта водосчётчиков: вход в административную часть и табличное представление данных абонентов/приборов учёта с действиями над записями.',
    preview: '/images/projects/commercial/water-meters/preview.webp',
    images: [
      {
        src: '/images/projects/commercial/water-meters/auth.webp',
        description:
          'Экран авторизации в административную часть: компактная форма входа с полями учётных данных и основным submit-действием на фоне тематической иллюстрации.',
      },
      {
        src: '/images/projects/commercial/water-meters/table.webp',
        description:
          'Табличный экран управления данными водосчётчиков: записи представлены строками с набором атрибутов, а операции доступны из строки таблицы. Интерфейс ориентирован на просмотр и обработку множества записей.',
      },
    ],
  },
  {
    id: PROJECT_IDS.DEFUTURE,
    title: 'DeFuture',
    category: 'commercial',
    description:
      'Telegram Mini App с профилем, заданиями, рейтингом, балансами и реферальной системой; данные приложения загружаются через backend API.',
    preview: '/images/projects/commercial/defuture/preview.webp',
    images: [
      {
        src: '/images/projects/commercial/defuture/defuture.webp',
        description:
          'Telegram Mini App с профилем, заданиями, рейтингом, балансами, реферальной системой и интеграцией с backend API.',
      },
    ],
  },
  {
    id: PROJECT_IDS.CASH_FLOW,
    title: 'Cash Flow',
    category: 'pet-project',
    description:
      'Fullstack-приложение для личных финансов: доходы и расходы, категории, бюджеты, фильтрация и пагинация транзакций.',
    preview: '/images/projects/commercial/cash-flow/preview.webp',
    images: [
      {
        src: '/images/projects/commercial/ava-security-services/ava-security-services.png',
        description: 'Banner',
      },
    ],
    backendCodeSnippets: [
      {
        title: 'AuthController: JWT аутентификация с Swagger документацией',
        language: 'typescript',
        code: `import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiOkResponseWrapped(LoginResponse, {
    description: 'JWT tokens returned',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  public async login(@Body() dto: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(dto);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponseWrapped(LoginResponse, {
    description: 'User registered, JWT tokens returned',
  })
  public async register(@Body() dto: RegisterRequest): Promise<LoginResponse> {
    return this.authService.register(dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh JWT tokens' })
  public async refreshToken(
    @Body('refreshToken') refreshToken: string,
  ): Promise<LoginResponse> {
    return this.authService.refreshToken(refreshToken);
  }
}`,
      },
      {
        title: 'TransactionService: сложная фильтрация и пагинация с MikroORM',
        language: 'typescript',
        code: `import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, FilterQuery } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: EntityRepository<TransactionEntity>,
  ) {}

  public async findByUserId(
    userId: number,
    paging: PagingQueryRequest,
    transactionType?: TransactionType,
    startDate?: string,
    endDate?: string,
  ) {
    const createdAtFilter: { $gte?: Date; $lte?: Date } = {};

    if (startDate) {
      createdAtFilter.$gte = toRuMinuteDate(startDate);
    }

    if (endDate) {
      createdAtFilter.$lte = toRuMinuteDate(endDate);
    }

    const where: FilterQuery<TransactionEntity> = {
      user: { id: userId },
      ...(transactionType ? { transactionType } : {}),
      ...(Object.keys(createdAtFilter).length > 0
        ? { createdAt: createdAtFilter }
        : {}),
    };

    const [items, totalItems] = await this.transactionRepository.findAndCount(
      where,
      {
        populate: ['category', 'user'],
        offset: paging.skip,
        limit: paging.take,
        orderBy: { createdAt: 'desc' },
      },
    );

    return new PagingArrayResponse(items, totalItems);
  }

  public async searchTransactions(
    userId: number,
    categoryId: number,
    paging: PagingQueryRequest,
    transactionType?: TransactionType,
  ) {
    const [items, totalItems] = await this.transactionRepository.findAndCount(
      {
        user: { id: userId },
        category: { id: categoryId },
        ...(transactionType ? { transactionType } : {}),
      },
      {
        populate: ['category', 'user'],
        offset: paging.skip,
        limit: paging.take,
        orderBy: { createdAt: 'desc' },
      },
    );

    return new PagingArrayResponse(items, totalItems);
  }
}`,
      },
      {
        title: 'TransactionController: RESTful API с Guards и Custom Decorators',
        language: 'typescript',
        code: `import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../common/middlewares/decorators/user/getUser';
import { JwtAuthGuard } from '../common/middlewares/guards/jwt-auth.guard';

@ApiTags('Transactions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('jwt')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Create transaction' })
  create(
    @GetUser('userId') userId: number,
    @Body() createTransactionRequest: CreateTransactionRequest,
  ) {
    return this.transactionService.createTransaction(
      userId,
      createTransactionRequest,
    );
  }

  @Get('category/:categoryId')
  @ApiOperation({ summary: 'Search transactions' })
  search(
    @GetUser('userId') userId: number,
    @Param('categoryId') categoryId: number,
    @Query() query: SearchTransactionsRequest,
  ) {
    const { transactionType, ...paging } = query;
    return this.transactionService.searchTransactions(
      userId,
      categoryId,
      paging,
      transactionType,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  findAll(
    @GetUser('userId') userId: number,
    @Query() query: FindAllTransactionsRequest,
  ) {
    const { transactionType, startDate, endDate, ...paging } = query;
    return this.transactionService.findAll(
      userId,
      paging,
      transactionType,
      startDate,
      endDate,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update transaction' })
  update(
    @GetUser('userId') userId: number,
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionRequest,
  ) {
    return this.transactionService.updateTransaction(
      +id,
      userId,
      updateTransactionDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete transaction' })
  remove(@GetUser('userId') userId: number, @Param('id') id: string) {
    return this.transactionService.removeTransaction(+id, userId);
  }
}`,
      },
      {
        title: 'CategoryController: детальная Swagger документация с кастомными декораторами',
        language: 'typescript',
        code: `import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Categories')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('jwt')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: 'Create category for user',
    description: 'Creates a new category and assigns it to a specific user',
  })
  @ApiCreatedResponseWrapped(CategoryResponse, {
    description: 'Category successfully created',
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid JWT token',
  })
  @Post()
  public async create(
    @GetUser('userId') userId: number,
    @Body() dto: CreateCategoryRequest,
  ) {
    return this.categoryService.createCategory(dto, userId);
  }

  @ApiOperation({
    summary: 'Get categories for the authenticated user',
    description: 'Returns all categories belonging to the authenticated user',
  })
  @ApiOkResponseWrappedPagingArray(CategoryResponse, 'List of categories')
  @Get()
  public async get(
    @GetUser('userId') userId: number,
    @Query() paging: PagingQueryRequest,
  ) {
    return await this.categoryService.getCategoriesByUserId(userId, paging);
  }

  @ApiOperation({
    summary: 'Update category',
    description: 'Updates category data by ID',
  })
  @Patch(':id')
  public async update(
    @GetUser('userId') userId: number,
    @Param('id') id: number,
    @Body() dto: UpdateCategoryRequest,
  ) {
    return await this.categoryService.updateCategory({ ...dto, id }, userId);
  }

  @ApiOperation({
    summary: 'Delete category',
    description: 'Deletes category by ID',
  })
  @Delete(':id')
  public async remove(
    @GetUser('userId') userId: number,
    @Param('id') id: number,
  ) {
    return await this.categoryService.removeCategory(id, userId);
  }
}`,
      },
    ],
  },
  {
    id: PROJECT_IDS.AI_AGENT_LAB,
    title: 'AI Agent Lab',
    category: 'pet-project',
    description:
      'Локальный coding-агент на TypeScript с использованием Ollama: автоматическое планирование задач, выполнение инструментов, система проверки и восстановления после ошибок. Включает роутер моделей по сложности, tool registry и политики безопасности.',
    preview: '/images/projects/pet-project/ai-agent-lab/preview.webp',
    images: [
      {
        src: '/images/projects/pet-project/ai-agent-lab/banner.webp',
        description:
          'AI Agent Lab - локальный coding-агент с циклом планирования и исполнения задач, автоматическим выбором модели и системой проверки изменений.',
      },
    ],
    backendCodeSnippets: [
      {
        title: 'CodingAgent: основной цикл планирования и исполнения задач',
        language: 'typescript',
        code: `export class CodingAgent implements AgentContract {
  private state: AgentState = "idle";
  private cancelled = false;
  private readonly toolExecutor: AgentToolExecutor;

  constructor(private readonly config: AgentConfig) {
    this.toolExecutor = new AgentToolExecutor(config);
  }

  async run(task: Task): Promise<AgentResult> {
    if (this.state === "planning" || this.state === "executing") {
      throw new Error("Агент уже обрабатывает предыдущую реплику.");
    }

    this.state = "idle";
    this.cancelled = false;
    this.config.context.addMessage({ role: "user", content: task.description });

    let failures = 0;
    let unresolved: { toolName: string; error: string } | undefined;
    let pendingVerification: { toolName: string; filePath?: string } | undefined;

    for (let step = 1; step <= this.config.policies.maxSteps; step += 1) {
      if (this.cancelled) return this.cancelledResult(task, step - 1);

      this.state = "planning";
      let plan: Plan;

      try {
        plan = await this.planWithRetry(task);
      } catch (error) {
        return this.fail(task, step - 1, "planning_failed", error);
      }

      if (plan.isComplete && plan.actions.length === 0) {
        if (unresolved) {
          return this.fail(
            task,
            step,
            "unresolved_tool_error",
            \`Модель завершила задачу, не устранив ошибку \${unresolved.toolName}\`
          );
        }

        this.state = "completed";
        return {
          taskId: task.id,
          status: "completed",
          content: plan.finalResponse ?? "Задача завершена.",
          steps: step,
        };
      }

      this.state = "executing";

      for (const action of plan.actions) {
        const result = await this.toolExecutor.executeAction(action);
        this.toolExecutor.addToolResult(action, result);

        if (!result.success) {
          failures += 1;
          unresolved = { toolName: action.name, error: result.error ?? "unknown" };

          if (failures > this.config.policies.maxRetries) {
            return this.fail(task, step, "retry_limit_reached", result.error);
          }
        } else if (unresolved?.toolName === action.name) {
          unresolved = undefined;
          failures = 0;
        }
      }
    }

    return {
      taskId: task.id,
      status: "max_steps_reached",
      content: "Достигнут лимит шагов",
      steps: this.config.policies.maxSteps,
    };
  }
}`,
      },
      {
        title: 'OllamaPlanner: интеграция с Ollama и автоматический выбор модели',
        language: 'typescript',
        code: `export class OllamaPlanner implements Planner {
  private readonly http = new Agent({ headersTimeout: 0, bodyTimeout: 0 });
  private selectedModel: string | undefined;
  private activeController: AbortController | undefined;

  constructor(private readonly options: OllamaPlannerOptions) {
    this.timeoutMs = options.timeoutMs ?? 15 * 60 * 1000;
  }

  async plan(input: PlanningInput): Promise<Plan> {
    const controller = new AbortController();
    this.activeController = controller;

    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const model = await this.getModel(input, controller.signal);
      const response = await this.fetchImpl(this.options.url, {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          stream: false,
          keep_alive: "30m",
          options: { temperature: 0, num_ctx: 8192, num_predict: 1200 },
          messages: this.toOllamaMessages(input),
          tools: input.availableTools.map(toOllamaTool),
        }),
      });

      if (!response.ok) {
        throw new Error(\`Ollama вернула HTTP \${response.status}\`);
      }

      const body = (await response.json()) as OllamaResponse;
      return this.parseResponse(body);
    } finally {
      clearTimeout(timer);
      this.activeController = undefined;
    }
  }

  private async getModel(input: PlanningInput, signal: AbortSignal): Promise<string> {
    if (this.options.model !== "auto") {
      return this.options.model;
    }

    if (!this.selectedModel) {
      this.selectedModel = await this.classifyTask(input, signal);
    }

    return this.selectedModel;
  }

  private async classifyTask(input: PlanningInput, signal: AbortSignal): Promise<string> {
    const complexity = await this.detectComplexity(input.task.description, signal);
    return complexity === "simple"
      ? this.options.simpleModel ?? DEFAULT_SIMPLE_MODEL
      : this.options.complexModel ?? DEFAULT_COMPLEX_MODEL;
  }
}`,
      },
      {
        title: 'AgentToolExecutor: проверка политик и выполнение инструментов',
        language: 'typescript',
        code: `export class AgentToolExecutor {
  constructor(private readonly config: ExecutorConfig) {}

  allowedTools(): ToolDefinition[] {
    const names = this.config.policies.allowedTools;
    return this.config.tools
      .list()
      .filter(tool => !names || names.includes(tool.name));
  }

  async executeAction(action: ToolCall): Promise<ToolResult> {
    if (!this.allowedTools().some(tool => tool.name === action.name)) {
      return {
        toolCallId: action.id,
        success: false,
        output: "",
        error: \`Инструмент \${action.name} запрещён политикой.\`,
        errorCode: "policy",
      };
    }

    for (const argument of ["filePath", "directory"]) {
      const value = action.arguments[argument];

      if (typeof value === "string" && this.isBlockedPath(value)) {
        return {
          toolCallId: action.id,
          success: false,
          output: "",
          error: \`Путь \${value} запрещён политикой.\`,
          errorCode: "policy",
        };
      }
    }

    return this.config.tools.execute(action);
  }

  async enrichRecovery(action: ToolCall, result: ToolResult): Promise<ToolResult> {
    if (result.success || action.name !== "replaceTextWithConfirmation") {
      return result;
    }

    const error = result.error ?? "";

    if (!/не найден|больше одного раза|oldText/i.test(error)) {
      return result;
    }

    const filePath = action.arguments.filePath;
    if (typeof filePath !== "string") return result;

    const readResult = await this.executeAction({
      id: \`\${action.id}-recovery\`,
      name: "readFile",
      arguments: { filePath },
    });

    if (!readResult.success) return result;

    return {
      ...result,
      error: [
        result.error ?? "Ошибка замены текста.",
        "",
        \`Актуальное содержимое \${filePath}:\`,
        "----- начало файла -----",
        this.clip(readResult.output),
        "----- конец файла -----",
      ].join("\\n"),
    };
  }

  private isBlockedPath(value: string): boolean {
    const blocked = this.config.policies.blockedPaths ?? [];
    const normalized = normalizeAgentPath(value);
    return blocked.some(pattern => normalized.includes(pattern));
  }
}`,
      },
      {
        title: 'InMemoryToolRegistry: система регистрации и выполнения инструментов',
        language: 'typescript',
        code: `export class InMemoryToolRegistry implements ToolRegistry {
  private readonly tools = new Map<string, Tool>();

  register(tool: Tool): void {
    if (this.tools.has(tool.definition.name)) {
      throw new Error(\`Инструмент \${tool.definition.name} уже зарегистрирован.\`);
    }

    this.tools.set(tool.definition.name, tool);
  }

  get(name: string): Tool | undefined {
    return this.tools.get(name);
  }

  list(): ToolDefinition[] {
    return [...this.tools.values()].map(tool => tool.definition);
  }

  cancel(): void {
    for (const tool of this.tools.values()) {
      tool.cancel?.();
    }
  }

  async execute(call: ToolCall): Promise<ToolResult> {
    const tool = this.get(call.name);

    if (!tool) {
      return {
        toolCallId: call.id,
        success: false,
        output: "",
        error: \`Неизвестный инструмент: \${call.name}.\`,
      };
    }

    try {
      const result = await tool.execute(call.arguments);
      return { ...result, toolCallId: call.id };
    } catch (error) {
      return {
        toolCallId: call.id,
        success: false,
        output: "",
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}`,
      },
    ],
  },
]
