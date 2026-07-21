FROM oven/bun:1.2.8-alpine AS deps

WORKDIR /repo

COPY package.json bun.lock ./
COPY apps/backend/package.json apps/backend/package.json
COPY apps/frontend/package.json apps/frontend/package.json
RUN bun install --frozen-lockfile

FROM oven/bun:1.2.8-alpine AS builder

WORKDIR /repo
COPY --from=deps /repo/node_modules ./node_modules
COPY package.json bun.lock ./
COPY apps/frontend ./apps/frontend

ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ARG SERVER_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV SERVER_URL=$SERVER_URL

WORKDIR /repo/apps/frontend
RUN bun run build

FROM node:22-alpine AS runner

ENV NODE_ENV=production
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs \
	&& adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /repo/apps/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /repo/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=builder --chown=nextjs:nodejs /repo/apps/frontend/public ./apps/frontend/public

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "apps/frontend/server.js"]
