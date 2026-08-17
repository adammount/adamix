# Adamix

[Русский](./README.md) · **English**

A video platform with upload and transcoding, channels, playlists and a creator studio — a self-hosted YouTube alternative.

[![Live Demo](https://img.shields.io/badge/Live_Demo-adamics.uk-0A84FF?style=for-the-badge)](https://adamics.uk)
[![Source](https://img.shields.io/badge/Source-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/adammount/adamix)

> **Test account:** `maddixmusic@test.com` / `123456`
> Any seeded channel follows the `<slug>@test.com` pattern with the same password — e.g. `johnsummit@test.com`, `novasessions@test.com`.

![Demo](./assets/demo.gif)

## Stack

**Frontend:** Next.js 16 (App Router, Turbopack), React 19, strict TypeScript, TanStack Query, Redux Toolkit, React Hook Form, Tailwind CSS 4 (CSS-first), SCSS modules, axios, jose, react-hotkeys-hook, PWA (hand-written service worker)

**Backend:** NestJS 11 (modular monolith), PostgreSQL 17 + Prisma 7 (`@prisma/adapter-pg` driver adapter), JWT (access/refresh), Argon2, fluent-ffmpeg, @react-email + Nodemailer (Mailgun), helmet, class-validator + class-transformer

**Infrastructure:** Turborepo + bun workspaces, Docker Compose (db + backend + frontend), Next.js standalone build, deployed via Dokploy

## The problem

A portfolio project built around a domain where the frontend is more than forms and tables, and the backend is more than CRUD. Video hosting brings both kinds of complexity at once: on the server — accepting large files and transcoding them into several resolutions; on the client — a player with quality switching, keyboard shortcuts and sane behaviour on a slow connection.

The constraints were a single VPS, no cloud services and no infrastructure budget, so storage and processing are handled in-house: files live in a Docker volume and are served through ServeStatic rather than S3 behind a CDN. That is a deliberate trade-off at this scale; the migration path to object storage is described below.

## Engineering decisions

- **Multi-resolution transcoding with real-time progress.** On upload the backend probes the source resolution with `ffprobe` and picks only the profiles from the 360p–4K set that do not exceed the original — no upscaling. Each resolution is encoded sequentially through fluent-ffmpeg into its own subdirectory (`uploads/videos/<quality>/<file>`), so the player can switch quality by swapping a URL, with no manifests and no separate streaming server. The upload response is returned as soon as the original is saved and transcoding continues in the background: the client receives the file name and polls `GET /upload-file/status/:fileName`. Progress is computed across all resolutions — the current profile's share is added to the completed ones — so the bar grows monotonically instead of resetting on every pass.

- **Status polling that stops itself.** On the client, transcoding status is a plain `useQuery` with a dynamic `refetchInterval`: the function reads the latest progress value and returns `3000` ms while it is below 100, and `false` once finished. Polling ends without `useEffect` timers or manual cleanup, and the publish form unlocks reactively at 100%. The success toast is loaded through a dynamic `import()` so `react-hot-toast` stays out of the upload page bundle.

- **The player is composed from independent hooks rather than one monolithic component.** Every responsibility is separate: `usePlayPause`, `useVideoProgress`, `useVideoVolume`, `useVideoQuality`, `useFullScreen`, `useSkipTime`, `useVideoHotkeys` — all take a shared `ref` to the `<video>` element and compose in `useVideoPlayer`. Playback position survives quality changes: the hook stores `currentTime`, swaps `src` to another profile and restores the time, so it reads as a bitrate change rather than a restart.

- **Keyboard shortcuts that stay out of text input.** Space is handled by a dedicated `keydown` listener that inspects `target`: if focus sits in an `input`, `textarea` or `contenteditable`, the event is ignored — otherwise typing a comment would pause the video. The rest (`←/→` seek, `↑/↓` volume, `m`, `f`, `t` for theater mode) are declared through `react-hotkeys-hook` with `preventDefault` on arrows so the page does not scroll.

- **Auth: httpOnly cookie for refresh, access checks on the edge before render.** The refresh token lives only in an `httpOnly` cookie and is never reachable from JS; the access token is short-lived, passwords use Argon2, sign-up and sign-in are behind reCAPTCHA, and email is confirmed through a @react-email message. Private sections (`/studio`, `/my`) are guarded in Next.js middleware: the token is verified with `jose` on the edge and unauthorized users are redirected before the page renders — while server-side checks on the API remain the source of truth. Studio resources are ownership-checked: a video can only be edited or deleted by its owning channel, and a foreign `id` returns 403.

- **Server and client state kept apart.** Everything coming from the API (feed, videos, channels, playlists, comments, history) lives in TanStack Query with key-based invalidation after mutations. Redux Toolkit is reserved for the session — user, `isLoggedIn`, access token — that is, for what is not a cached server response. Server entities are never duplicated into the store; the Query cache is the single source of truth.

- **PWA with separate caches and deliberate exclusions.** A hand-written service worker (no workbox) splits traffic across three versioned caches — static, images, runtime — served stale-while-revalidate, dropping old caches on `activate`. Offline navigation falls back to a cached page or `/offline`. `/api/` and `/uploads/` are excluded on purpose: API responses must stay fresh, and caching video files would blow through the storage quota and break the player's range requests.

## Features

- Video upload with automatic transcoding into available resolutions and processing progress
- Player: quality switching that preserves position, seeking, volume, fullscreen and theater modes, keyboard shortcuts
- Creator studio: own videos with search and pagination, create, edit, delete, thumbnails and tags
- Channels: channel page, subscriptions, banner and avatar, subscriber count
- Feed and navigation: home, trending, categories, recommendations excluding already watched, full-text search
- Playlists, likes, watch history and a "Liked" section in the account area
- Comments with ownership checks on edit and delete
- Auth: sign-up and sign-in with reCAPTCHA, email confirmation, profile settings
- PWA: installable, offline page, static asset caching

## Architecture

A Turborepo + bun workspaces monorepo: two applications sharing tooling and a single `.env` for the production stack.

```
apps/
  backend/               # NestJS (modular monolith)
    src/
      auth/              # JWT strategy, guards, refresh tokens
      media/             # uploads, ffmpeg transcoding, validation pipes
      video/             # public videos, studio/ (author CRUD), comment/
      channel/ user/ playlist/ category/ watch-history/ settings/
      email/             # @react-email templates
    prisma/schema/       # schema split by domain
  frontend/              # Next.js App Router
    src/
      app/               # (public) / auth / my / studio / offline
      components/ui/     # video-player (hook composition), video-card, ...
      services/          # API access layer
      server-actions/    # route protection middleware (edge)
      store/             # Redux Toolkit: session only
    public/sw.js         # service worker
docker-compose.yml       # production: db + backend + frontend
docker-compose.dev.yml   # dev: PostgreSQL only
```

On the backend, business logic lives in services and Prisma is used directly without a repository layer. Incoming data is validated through class-validator DTOs; uploaded files pass through pipes checking their type and target folder.

### Known limitations

Transcoding runs inside the Node.js process and progress is kept in memory (a `Map`). That works for a single instance, but the state does not survive a restart and does not scale horizontally. The next step is moving the work into a queue (BullMQ + Redis) with a dedicated worker and status stored in the database; that is also the right moment to switch storage to an S3-compatible service behind a CDN.

## Running locally

Requires [Bun](https://bun.sh) ≥ 1.2.8, Docker and ffmpeg.

```bash
git clone https://github.com/adammount/adamix.git
cd adamix
bun install

# 1. Start PostgreSQL
bun run db:dev

# 2. Create .env files from the examples and fill in the values
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env

# 3. Apply the schema and seed demo data
cd apps/backend && bun run db:reset && bun run seed:run && cd ../..

# 4. Start backend (4200) and frontend (3000)
bun run dev
```

The full production stack runs from the repository root:

```bash
cp .env.example .env     # fill in the values
docker compose up -d --build
```

Required variables: `DATABASE_URL`, `JWT_SECRET`, `CLIENT_URL`, `API_URL`, `RECAPTCHA_SECRET_KEY`, SMTP credentials, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` — see `.env.example` for the full list.

## Design

The layout and visual system are my own: a grid built on a scalable `rem` unit, glass surfaces, and ambient player lighting driven by the video frame.

---

**Author:** Shamil Aydemirov
[Website](https://adammount.org/) · [GitHub](https://github.com/adammount) · [LinkedIn](https://www.linkedin.com/in/shamil-aydemirov-18a761429)
