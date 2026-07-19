# Adamix — монорепозиторий

Видеоплатформа: **backend** (NestJS 11 + Prisma 7 + PostgreSQL) и **frontend**
(Next.js 16 + React 19 + Tailwind 4). Управляется через **Turborepo** поверх
**bun workspaces**.

```
.
├── apps/
│   ├── backend/    # NestJS API (порт 4200)
│   └── frontend/   # Next.js (порт 3000)
├── docker-compose.dev.yml   # dev: только PostgreSQL
├── docker-compose.yml       # prod: db + backend + frontend (для Dokploy)
├── turbo.json
└── package.json             # bun workspaces + turbo
```

## Требования

- [Bun](https://bun.sh) ≥ 1.2.8
- Docker (для БД и прод-стека)

## Установка

```bash
bun install
```

## Разработка (dev)

В dev в Docker крутится **только база данных**, приложения запускаются локально.

```bash
# 1. Поднять PostgreSQL
bun run db:dev          # docker compose -f docker-compose.dev.yml up -d

# 2. Создать .env в каждом приложении из примеров
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env

# 3. Применить схему к БД и (опционально) засидить
cd apps/backend && bun run db:reset && bun run seed:run && cd ../..

# 4. Запустить backend + frontend параллельно через turbo
bun run dev
```

Остановить БД: `bun run db:dev:down`.

> ⚠️ Если пароль БД содержит спецсимволы (`@ : / ? #`), их нужно
> URL-кодировать в `DATABASE_URL`.

## Сборка / линт

```bash
bun run build    # turbo: собирает оба приложения
bun run lint     # turbo: линтит оба приложения
```

## Production (Docker Compose / Dokploy)

Весь стек поднимается из корня одним `docker-compose.yml` с единым `.env`.

```bash
cp .env.example .env     # заполнить значения
docker compose up -d --build
```

Сервисы:

| Сервис   | Описание                              | Порт |
|----------|---------------------------------------|------|
| db       | PostgreSQL 17 (том `pgdata`)          | —    |
| backend  | NestJS, том `uploads`, `prisma db push` на старте | 4200 (внутри сети) |
| frontend | Next.js standalone, публикуется наружу | 3000 |

Внутри сети контейнеры общаются по именам сервисов (`db`, `backend`).
`NEXT_PUBLIC_*` инлайнятся в клиентский бандл на этапе сборки образа.

## Стек версий (ключевое)

- NestJS 11, Prisma 7 (driver adapter `@prisma/adapter-pg`)
- Next.js 16, React 19.2, Tailwind CSS 4 (CSS-first, без JS-конфига)
- TypeScript 5.9, ESLint 9 (flat config)
